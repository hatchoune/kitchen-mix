"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, Check, CheckCheck, Loader2, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  buildNotificationDisplay,
  formatRelativeTime,
  NOTIFICATION_TYPE_ICONS,
} from "@/lib/notifications";
import type { NotificationEnriched } from "@/types";
import {
  getRecentNotifications,
  getUnreadNotificationsCount,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/app/actions/notifications";

/* =============================================================
   Cloche de notifications (Navbar).
   - Badge = nombre de non-lues (poll toutes les 60s).
   - Au clic, le dropdown charge les 10 dernières.
   - Click sur une notif = marquage lu + navigation vers la cible.
   ============================================================= */

const POLL_INTERVAL_MS = 60_000;
const DROPDOWN_LIMIT = 10;

export default function NotificationBell() {
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [items, setItems] = useState<NotificationEnriched[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [markingAll, setMarkingAll] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // ── Poll du compteur ─────────────────────────────────────
  const refreshCount = useCallback(async () => {
    if (!user) return;
    try {
      const count = await getUnreadNotificationsCount();
      setUnreadCount(count);
    } catch {
      // silent fail
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      setItems([]);
      return;
    }
    refreshCount();
    const id = setInterval(refreshCount, POLL_INTERVAL_MS);
    const onFocus = () => refreshCount();
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, [user, refreshCount]);

  // ── Chargement de la liste à l'ouverture ────────────────
  const loadList = useCallback(async () => {
    if (!user) return;
    setListLoading(true);
    try {
      const data = await getRecentNotifications(DROPDOWN_LIMIT);
      setItems(data);
    } finally {
      setListLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (open) loadList();
  }, [open, loadList]);

  // ── Fermer au clic extérieur ─────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // ── Fermer avec Escape ──────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // ── Actions ──────────────────────────────────────────────
  const handleItemClick = async (
    notif: NotificationEnriched,
    href: string | null,
  ) => {
    // Marquage lu optimiste
    if (!notif.read_at) {
      setItems((prev) =>
        prev.map((n) =>
          n.id === notif.id ? { ...n, read_at: new Date().toISOString() } : n,
        ),
      );
      setUnreadCount((c) => Math.max(0, c - 1));
      try {
        await markNotificationRead(notif.id);
      } catch {
        // silent — on rafraîchira au prochain poll
      }
    }
    setOpen(false);
    if (href) router.push(href);
  };

  const handleMarkAll = async () => {
    if (markingAll || unreadCount === 0) return;
    setMarkingAll(true);
    const now = new Date().toISOString();
    setItems((prev) =>
      prev.map((n) => (n.read_at ? n : { ...n, read_at: now })),
    );
    setUnreadCount(0);
    try {
      await markAllNotificationsRead();
    } catch {
      // refresh fallback
      refreshCount();
    } finally {
      setMarkingAll(false);
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={wrapRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative p-2 rounded-lg transition-colors",
          open
            ? "bg-accent/15 text-accent"
            : "text-foreground/70 hover:text-foreground hover:bg-card-hover",
        )}
        aria-label={
          unreadCount > 0
            ? `Notifications (${unreadCount} non lue${unreadCount > 1 ? "s" : ""})`
            : "Notifications"
        }
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-[10px] font-bold text-black flex items-center justify-center shadow-sm"
            aria-hidden="true"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed sm:absolute top-14 sm:top-auto left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 sm:right-0 sm:mt-2 w-[calc(100vw-1.5rem)] max-w-[22rem] sm:w-[22rem] rounded-xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in duration-200"
          style={{ backgroundColor: "var(--color-bg)" }}
          role="dialog"
          aria-label="Notifications"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <h2 className="font-display font-bold text-sm">Notifications</h2>
            <button
              onClick={handleMarkAll}
              disabled={markingAll || unreadCount === 0}
              className={cn(
                "flex items-center gap-1 text-xs font-medium transition-colors",
                unreadCount === 0
                  ? "text-muted-foreground/50 cursor-default"
                  : "text-accent hover:text-accent-hover",
                markingAll && "opacity-50 cursor-wait",
              )}
              title="Tout marquer comme lu"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Tout lire
            </button>
          </div>

          {/* Liste */}
          <div className="max-h-[60vh] overflow-y-auto">
            {listLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="w-5 h-5 animate-spin text-accent" />
              </div>
            ) : items.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                Aucune notification pour le moment.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((notif) => (
                  <NotificationRow
                    key={notif.id}
                    notif={notif}
                    onActivate={handleItemClick}
                  />
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-4 py-2.5 text-center">
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-accent hover:underline"
            >
              Voir toutes les notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Ligne individuelle ─────────────────────────────────── */

function NotificationRow({
  notif,
  onActivate,
}: {
  notif: NotificationEnriched;
  onActivate: (n: NotificationEnriched, href: string | null) => void;
}) {
  const d = buildNotificationDisplay(notif);
  const unread = !notif.read_at;

  const content = (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 transition-colors text-left w-full",
        unread ? "bg-accent/5" : "bg-transparent",
        "hover:bg-card-hover",
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        {d.actorAvatar ? (
          <Image
            src={d.actorAvatar}
            alt={d.actorPseudo}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-accent">
            <User className="w-4 h-4" />
          </div>
        )}
        <span
          className="absolute -bottom-0.5 -right-0.5 text-xs bg-background rounded-full px-1 leading-none py-0.5 border border-border"
          aria-hidden="true"
        >
          {NOTIFICATION_TYPE_ICONS[notif.type]}
        </span>
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <p className="text-sm leading-snug">
          <span className="font-semibold">{d.actorPseudo}</span>{" "}
          <span className="text-foreground/80">{d.actionLabel}</span>
          {d.rating != null && (
            <span className="text-foreground/80"> {d.rating}/5</span>
          )}
        </p>

        {d.contextTitle && (
          <p
            className={cn(
              "text-xs mt-0.5 truncate",
              d.isDeleted
                ? "text-muted-foreground italic line-through"
                : "text-muted-foreground",
            )}
          >
            {d.isDeleted ? "Contenu supprimé" : d.contextTitle}
          </p>
        )}

        {!d.isDeleted && d.commentPreview && (
          <p className="text-xs mt-1 text-muted-foreground italic line-clamp-2">
            « {d.commentPreview} »
          </p>
        )}

        <p className="text-[11px] text-muted-foreground/80 mt-1">
          {formatRelativeTime(notif.created_at)}
        </p>
      </div>

      {/* Pastille non-lu */}
      {unread && (
        <span
          className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-accent"
          aria-hidden="true"
        />
      )}
    </div>
  );

  return (
    <li>
      {d.isDeleted || !d.href ? (
        <button
          type="button"
          onClick={() => onActivate(notif, null)}
          className="w-full block"
          aria-label="Notification (contenu supprimé)"
        >
          {content}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => onActivate(notif, d.href)}
          className="w-full block"
        >
          {content}
        </button>
      )}
    </li>
  );
}

/* ─── Export complémentaire : bouton « marquer lu » isolé ── */
/* (non utilisé ici, mais exporté au cas où on voudrait le réutiliser) */
export function MarkReadButton({
  notifId,
  onDone,
}: {
  notifId: string;
  onDone?: () => void;
}) {
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        try {
          await markNotificationRead(notifId);
          onDone?.();
        } finally {
          setBusy(false);
        }
      }}
      className="inline-flex items-center gap-1 text-xs text-accent hover:underline disabled:opacity-50"
    >
      <Check className="w-3 h-3" /> Marquer comme lu
    </button>
  );
}
