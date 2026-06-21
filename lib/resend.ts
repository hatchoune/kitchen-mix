/* =============================================================
   Kitchen Mix — Client Resend (emails transactionnels)
   ============================================================= */

import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_FROM = "Kitchen Mix <newsletter@send.kitchen-mix.com>";
