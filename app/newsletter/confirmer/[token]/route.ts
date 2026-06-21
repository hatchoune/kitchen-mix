import { NextResponse } from "next/server";
import { createAdminSupabase } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/constants";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  const supabase = createAdminSupabase();

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .update({ confirmed: true })
    .eq("confirm_token", token)
    .select("email")
    .single();

  if (error || !data) {
    return NextResponse.redirect(`${SITE_URL}/?newsletter=erreur`);
  }

  return NextResponse.redirect(`${SITE_URL}/?newsletter=confirme`);
}
