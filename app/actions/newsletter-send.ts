"use server";

import { createAdminSupabase, createServerSupabase } from "@/lib/supabase/server";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { isAdmin } from "@/lib/supabase/queries";

const BATCH_SIZE = 50;
const DELAY_MS = 1000;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

async function requireAdmin() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
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

  const batches = chunk(subscribers, BATCH_SIZE);
  let sent = 0;
  let errors = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    const results = await Promise.allSettled(
      batch.map(({ email }) =>
        resend.emails.send({
          from: EMAIL_FROM,
          to: email,
          subject,
          html,
        })
      )
    );

    for (const result of results) {
      if (result.status === "fulfilled") sent++;
      else errors++;
    }

    // Pause entre chaque batch sauf le dernier
    if (i < batches.length - 1) {
      await sleep(DELAY_MS);
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
