"use server";

import { createServerSupabase } from "@/lib/supabase/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeToNewsletter(
  email: string,
  source: string = "website",
) {
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
    throw new Error("Adresse email invalide.");
  }

  const supabase = await createServerSupabase();

  // Upsert : si l'email existe déjà, on ne fait rien de visible
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert(
      { email: trimmedEmail, source, confirmed: false },
      { onConflict: "email", ignoreDuplicates: true },
    );

  if (error) {
    console.error("Newsletter subscribe error:", error.message);
    throw new Error("Une erreur est survenue. Réessayez.");
  }

  return { success: true, message: "Inscription réussie !" };
}
