"use server";

import { createAdminSupabase } from "@/lib/supabase/server";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { SITE_URL } from "@/lib/constants";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(
  email: string,
  source: string = "website",
) {
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
    throw new Error("Adresse email invalide.");
  }

  // Client admin requis : on doit relire le token juste après l'upsert,
  // et la policy RLS bloque toute lecture publique sur cette table.
  const supabase = createAdminSupabase();

  const { error: upsertError } = await supabase
    .from("newsletter_subscribers")
    .upsert(
      { email: trimmedEmail, source, confirmed: false },
      { onConflict: "email", ignoreDuplicates: true },
    );

  if (upsertError) {
    console.error("Newsletter subscribe error:", upsertError.message);
    throw new Error("Une erreur est survenue. Réessayez.");
  }

  const { data: subscriber, error: fetchError } = await supabase
    .from("newsletter_subscribers")
    .select("confirm_token, confirmed")
    .eq("email", trimmedEmail)
    .single();

  if (fetchError || !subscriber) {
    console.error("Newsletter fetch error:", fetchError?.message);
    return { success: true, message: "Inscription réussie !" };
  }

  // Déjà confirmé → rien à renvoyer.
  if (subscriber.confirmed) {
    return { success: true, message: "Inscription réussie !" };
  }

  const confirmUrl = `${SITE_URL}/newsletter/confirmer/${subscriber.confirm_token}`;

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: trimmedEmail,
      subject: "Confirmez votre inscription à la newsletter Kitchen Mix",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>Plus qu'une étape !</h2>
          <p>Cliquez sur le bouton ci-dessous pour confirmer votre inscription à la newsletter Kitchen Mix et recevoir nos meilleures recettes.</p>
          <p style="text-align: center; margin: 32px 0;">
            <a href="${confirmUrl}" style="background:#F5A623; color:#141414; padding:12px 24px; border-radius:8px; text-decoration:none; font-weight:bold;">
              Confirmer mon inscription
            </a>
          </p>
          <p style="color:#888; font-size:13px;">Si vous n'êtes pas à l'origine de cette inscription, ignorez simplement cet email.</p>
        </div>
      `,
    });
  } catch (err) {
    // On ne bloque pas l'inscription si l'envoi échoue — l'email est déjà en base.
    console.error("Newsletter confirmation email error:", err);
  }

  return { success: true, message: "Inscription réussie !" };
}
