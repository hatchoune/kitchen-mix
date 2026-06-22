"use server";

import {
  createAdminSupabase,
  createServerSupabase,
} from "@/lib/supabase/server";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { isAdmin } from "@/lib/supabase/queries";

async function requireAdmin() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non autorisé");
  const admin = await isAdmin(user.id);
  if (!admin) throw new Error("Accès refusé");
}

export async function sendNewsletter({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  await requireAdmin();

  const supabase = createAdminSupabase();

  const { data: subscribers, error } = await supabase
    .from("newsletter_subscribers")
    .select("email")
    .eq("confirmed", true)
    .is("unsubscribed_at", null);

  if (error) throw new Error("Impossible de récupérer les abonnés.");
  if (!subscribers || subscribers.length === 0) {
    return { sent: 0, errors: 0, total: 0 };
  }

  // Envoi en parallèle — OK jusqu'à ~100 abonnés sur Vercel Hobby
  const results = await Promise.allSettled(
    subscribers.map(({ email }) =>
      resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject,
        html,
      }),
    ),
  );

  let sent = 0;
  let errors = 0;

  for (const result of results) {
    if (result.status === "fulfilled" && !result.value.error) {
      sent++;
    } else {
      errors++;
      if (result.status === "rejected") {
        console.error("[NEWSLETTER] Erreur envoi:", result.reason);
      } else if (result.status === "fulfilled" && result.value.error) {
        console.error("[NEWSLETTER] Erreur Resend:", result.value.error);
      }
    }
  }

  return { sent, errors, total: subscribers.length };
}

export async function getNewsletterStats() {
  await requireAdmin();

  const supabase = createAdminSupabase();

  const { count: total } = await supabase
    .from("newsletter_subscribers")
    .select("*", { count: "exact", head: true });

  const { count: confirmed } = await supabase
    .from("newsletter_subscribers")
    .select("*", { count: "exact", head: true })
    .eq("confirmed", true)
    .is("unsubscribed_at", null);

  const { count: pending } = await supabase
    .from("newsletter_subscribers")
    .select("*", { count: "exact", head: true })
    .eq("confirmed", false);

  return {
    total: total ?? 0,
    confirmed: confirmed ?? 0,
    pending: pending ?? 0,
  };
}
