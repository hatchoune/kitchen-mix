"use client";

import { useState, useEffect } from "react";
import {
  Send,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import {
  sendNewsletter,
  getNewsletterStats,
} from "@/app/actions/newsletter-send";

// ─── HTML de la newsletter sorbet citron vert & basilic ──────────────────────
// Tu peux remplacer ce HTML par n'importe quelle autre newsletter
const NEWSLETTER_HTML = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#F5F0E8;font-family:Georgia,'Times New Roman',serif;">
<div style="display:none;max-height:0;overflow:hidden;">🍋 Le sorbet d'été qui twiste le citron vert au basilic frais</div>
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F5F0E8;">
<tr><td align="center" style="padding:32px 16px 0;">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
<tr><td align="center" style="padding-bottom:28px;">
<a href="https://kitchen-mix.com" style="text-decoration:none;">
<span style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#1A1A1A;letter-spacing:2px;text-transform:uppercase;">Kitchen Mix</span>
</a>
<div style="width:40px;height:2px;background-color:#F5A623;margin:10px auto 0;"></div>
</td></tr>
<tr><td style="background:linear-gradient(135deg,#1A1A1A 0%,#2D2D2D 100%);border-radius:16px 16px 0 0;padding:48px 40px 36px;text-align:center;">
<div style="display:inline-block;background-color:#F5A623;color:#1A1A1A;font-family:Arial,sans-serif;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:6px 16px;border-radius:50px;margin-bottom:24px;">☀️ Spécial été</div>
<h1 style="margin:0 0 12px;font-family:Georgia,serif;font-size:38px;font-weight:bold;color:#FAFAF7;line-height:1.15;">Le sorbet qui twiste<br/><span style="color:#F5A623;">le citron vert</span></h1>
<p style="margin:0 0 28px;font-family:Arial,sans-serif;font-size:16px;color:#BBBBBB;line-height:1.6;">Citron vert acidulé, basilic frais infusé.<br/>Un sorbet sans crème ni lactose, 100% fraîcheur.</p>
<a href="https://kitchen-mix.com/recettes/sorbet-citron-vert-basilic-sorbetiere" style="display:inline-block;background-color:#F5A623;color:#1A1A1A;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:16px 36px;border-radius:50px;letter-spacing:0.5px;">Voir la recette complète →</a>
</td></tr>
<tr><td style="background-color:#FFFFFF;padding:0;">
<!-- TODO: remplace par l'URL réelle (Supabase Storage) de l'image de la recette -->
<img src="REMPLACE_PAR_URL_IMAGE_SUPABASE" alt="Sorbet citron vert et basilic" width="600" style="display:block;width:100%;max-width:600px;height:auto;" />
</td></tr>
<tr><td style="background-color:#FFFFFF;padding:0 40px;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid #F0EDE5;">
<tr>
<td align="center" style="padding:20px 8px;border-right:1px solid #F0EDE5;"><div style="font-size:22px;margin-bottom:4px;">⏱️</div><div style="font-family:Arial,sans-serif;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Prépa</div><div style="font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#1A1A1A;">15 min</div></td>
<td align="center" style="padding:20px 8px;border-right:1px solid #F0EDE5;"><div style="font-size:22px;margin-bottom:4px;">👥</div><div style="font-family:Arial,sans-serif;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Portions</div><div style="font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#1A1A1A;">4 pers.</div></td>
<td align="center" style="padding:20px 8px;border-right:1px solid #F0EDE5;"><div style="font-size:22px;margin-bottom:4px;">📊</div><div style="font-family:Arial,sans-serif;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Niveau</div><div style="font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#1A1A1A;">Facile</div></td>
<td align="center" style="padding:20px 8px;"><div style="font-size:22px;margin-bottom:4px;">🔥</div><div style="font-family:Arial,sans-serif;font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;">Calories</div><div style="font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#1A1A1A;">~110/p</div></td>
</tr>
</table>
</td></tr>
<tr><td style="background-color:#FFFFFF;padding:36px 40px 28px;">
<p style="margin:0 0 16px;font-family:Georgia,serif;font-size:18px;color:#1A1A1A;line-height:1.7;">L'été, le citron vert, tout le monde connaît déjà.</p>
<p style="margin:0 0 16px;font-family:Georgia,serif;font-size:16px;color:#444;line-height:1.75;">Mais glissé dans un sirop infusé au <strong>basilic frais</strong>, il prend une tout autre dimension : plus végétal, plus parfumé, presque surprenant dès la première cuillère. Et comme il ne contient ni crème ni lait, c'est aussi le dessert glacé le plus léger à servir après un repas d'été.</p>
<p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#444;line-height:1.75;">Le <strong>sorbet citron vert et basilic</strong>, c'est simple : un sirop au basilic qu'on laisse infuser, qu'on glace 4h, puis qu'on turbine en sorbetière. Un blanc d'œuf ajouté à mi-turbinage, et la texture devient nettement plus aérienne.</p>
</td></tr>
<tr><td style="background-color:#FFFFFF;padding:0 40px 36px;">
<div style="background-color:#FAFAF7;border-left:4px solid #F5A623;border-radius:0 8px 8px 0;padding:24px;">
<p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:12px;font-weight:bold;color:#F5A623;text-transform:uppercase;letter-spacing:2px;">Les 5 ingrédients</p>
<table width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td width="50%" style="padding:4px 0;font-family:Arial,sans-serif;font-size:14px;color:#333;">🍋 Citrons verts (jus + zeste) — <strong>6</strong></td><td width="50%" style="padding:4px 0;font-family:Arial,sans-serif;font-size:14px;color:#333;">🍬 Sucre — <strong>150 g</strong></td></tr>
<tr><td style="padding:4px 0;font-family:Arial,sans-serif;font-size:14px;color:#333;">💧 Eau — <strong>400 ml</strong></td><td style="padding:4px 0;font-family:Arial,sans-serif;font-size:14px;color:#333;">🌿 Basilic frais — <strong>15 g</strong></td></tr>
<tr><td style="padding:4px 0;font-family:Arial,sans-serif;font-size:14px;color:#333;">🥚 Blanc d'œuf (optionnel) — <strong>1</strong></td><td style="padding:4px 0;"></td></tr>
</table>
</div>
</td></tr>
<tr><td style="background-color:#1A1A1A;padding:28px 40px;text-align:center;">
<p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;color:#F5A623;text-transform:uppercase;letter-spacing:2px;font-weight:bold;">💡 Le truc de chef</p>
<p style="margin:0;font-family:Georgia,serif;font-size:16px;color:#FAFAF7;line-height:1.65;font-style:italic;">"Ajoute le blanc d'œuf à mi-turbinage, jamais avant. Il aère le sorbet sans le rendre mousseux : la texture reste fondante, pas spongieuse."</p>
</td></tr>
<tr><td style="background:linear-gradient(135deg,#F5A623 0%,#E8941A 100%);border-radius:0 0 16px 16px;padding:40px;text-align:center;">
<p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:13px;color:#1A1A1A;text-transform:uppercase;letter-spacing:1.5px;font-weight:bold;">La recette guidée t'attend</p>
<p style="margin:0 0 24px;font-family:Georgia,serif;font-size:20px;color:#1A1A1A;line-height:1.4;font-weight:bold;">Étapes détaillées, minuteurs intégrés,<br/>portions ajustables.</p>
<a href="https://kitchen-mix.com/recettes/sorbet-citron-vert-basilic-sorbetiere" style="display:inline-block;background-color:#1A1A1A;color:#FAFAF7;font-family:Arial,sans-serif;font-size:15px;font-weight:bold;text-decoration:none;padding:16px 40px;border-radius:50px;letter-spacing:0.5px;">Je lance la recette ✦</a>
</td></tr>
<tr><td style="height:32px;"></td></tr>
<tr><td style="padding:0 20px 32px;text-align:center;">
<p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:13px;color:#999;line-height:1.6;">Tu reçois cet email parce que tu es abonné(e) à la newsletter Kitchen Mix.<br/>Recettes pour robot cuiseur multifonction — Thermomix, Companion, Cook Expert.</p>
<p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#BBBBBB;">
<a href="https://kitchen-mix.com" style="color:#888;text-decoration:underline;">kitchen-mix.com</a>
&nbsp;·&nbsp;
<a href="https://kitchen-mix.com/confidentialite" style="color:#888;text-decoration:underline;">Confidentialité</a>
</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

const NEWSLETTER_SUBJECT = "🍋 Le sorbet d'été qui twiste le citron vert";

type Stats = { total: number; confirmed: number; pending: number } | null;
type Result = { sent: number; errors: number; total: number } | null;

export default function NewsletterAdminTab() {
  const [stats, setStats] = useState<Stats>(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    getNewsletterStats()
      .then(setStats)
      .finally(() => setLoadingStats(false));
  }, []);

  const handleSend = async () => {
    if (!confirmed) return;
    setSending(true);
    setResult(null);
    try {
      const res = await sendNewsletter({
        subject: NEWSLETTER_SUBJECT,
        html: NEWSLETTER_HTML,
      });
      setResult(res);
    } catch (err: any) {
      alert("Erreur : " + err.message);
    } finally {
      setSending(false);
      setConfirmed(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {loadingStats ? (
          <div className="col-span-3 flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="bg-muted rounded-xl p-4 text-center">
              <Users className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats?.total ?? 0}</div>
              <div className="text-xs text-muted-foreground">
                Total inscrits
              </div>
            </div>
            <div className="bg-accent/10 rounded-xl p-4 text-center">
              <CheckCircle className="w-5 h-5 mx-auto mb-1 text-accent" />
              <div className="text-2xl font-bold text-accent">
                {stats?.confirmed ?? 0}
              </div>
              <div className="text-xs text-muted-foreground">Confirmés</div>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
              <div className="text-2xl font-bold">{stats?.pending ?? 0}</div>
              <div className="text-xs text-muted-foreground">En attente</div>
            </div>
          </>
        )}
      </div>

      {/* Newsletter à envoyer */}
      <div className="border border-border rounded-xl p-5 space-y-3">
        <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Newsletter prête à envoyer
        </div>
        <div className="font-bold text-foreground">{NEWSLETTER_SUBJECT}</div>
        <div className="text-sm text-muted-foreground">
          Sorbet citron vert & basilic — recette spécial été
        </div>
      </div>

      {/* Résultat */}
      {result && (
        <div
          className={`rounded-xl p-4 flex items-center gap-3 ${result.errors === 0 ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"}`}
        >
          {result.errors === 0 ? (
            <CheckCircle className="w-5 h-5 shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 shrink-0" />
          )}
          <div className="text-sm">
            <span className="font-bold">{result.sent} emails envoyés</span>
            {result.errors > 0 && ` · ${result.errors} erreurs`} sur{" "}
            {result.total} abonnés confirmés.
          </div>
        </div>
      )}

      {/* Confirmation + bouton envoi */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="w-4 h-4 accent-accent"
          />
          <span className="text-sm text-muted-foreground">
            Je confirme vouloir envoyer cette newsletter à{" "}
            <strong>{stats?.confirmed ?? "..."} abonnés</strong>
          </span>
        </label>

        <button
          onClick={handleSend}
          disabled={!confirmed || sending || (stats?.confirmed ?? 0) === 0}
          className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold py-3 px-6 rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
        >
          {sending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Envoyer la newsletter
            </>
          )}
        </button>
      </div>
    </div>
  );
}
