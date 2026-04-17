"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  BellOff,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
  User,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  buildNotificationDisplay,
  formatRelativeTime,
  NOTIFICATION_TYPE_ICONS,
} from "@/lib/notifications";
import type { NotificationEnriched } from "@/types";
import {
  getAllNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/app/actions/notifications";

/* =============================================================
   Page /notifications — liste paginée complète.
   - Auth requis
   - Pagination (20 par page)
   - Marquer lu individuellement ou tout d'un coup
   ============================================================= */

const PAGE_SIZE = 20;

export default function NotificationsPage() {
  const { user, loading: authLoading } = useAuth();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<NotificationEnriched[]>([]);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [busyIds, setBusyIds] = useState<Set<string>>(new Set());
  const [markingAll, setMarkingAll] = useState(false);

  const load = useCallback(
    async (p: number) => {
      if (!user) return;
      setLoading(true);
      try {
        const res = await getAllNotifications(p, PAGE_SIZE);
        setItems(res.data);
        setCount(res.count);
        setTotalPages(res.totalPages);
        setPage(res.page);
      } finally {
        setLoading(false);
      }
    },
    [user],
  );

  useEffect(() => {
    if (authLoading) return;
    if (user) load(1);
    else setLoading(false);
  }, [user, authLoading, load]);

  // ── Actions ──────────────────────────────────────────────

  const handleMarkOne = async (id: string) => {
    if (busyIds.has(id)) return;
    setBusyIds((prev) => new Set(prev).add(id));
    setItems((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read_at: new Date().toISOString() } : n,
      ),
    );
    try {
      await markNotificationRead(id);
    } finally {
      setBusyIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const handleMarkAll = async () => {
    if (markingAll) return;
    setMarkingAll(true);
    const now = new Date().toISOString();
    setItems((prev) => prev.map((n) => (n.read_at ? n : { ...n, read_at: now })));
    try {
      await markAllNotificationsRead();
    } finally {
      setMarkingAll(false);
    }
  };

  const handlePageChange = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    load(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  // ── Rendu ────────────────────────────────────────────────

  if (authLoading || (loading && items.length === 0)) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20 space-y-4">
        <Bell className="w-12 h-12 text-muted-foreground mx-auto" />
        <h1 className="font-display font-bold text-2xl">Mes notifications</h1>
        <p className="text-muted-foreground">
          Connectez-vous pour consulter vos notifications.
        </p>
        <Link
          href="/connexion"
          className="inline-flex px-6 py-3 rounded-xl bg-accent text-black font-medium hover:bg-accent-hover transition-colors"
        >
          Se connecter
        </Link>
      </div>
    );
  }

  const hasUnread = items.some((n) => !n.read_at);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display font-bold text-3xl flex items-center gap-2">
            <Bell className="w-7 h-7 text-accent" />
            Notifications
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {count} notification{count > 1 ? "s" : ""} au total
          </p>
        </div>

        <button
          onClick={handleMarkAll}
          disabled={!hasUnread || markingAll}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors",
            hasUnread
              ? "border-accent/30 text-accent hover:bg-accent/10"
              : "border-border text-muted-foreground cursor-default",
            markingAll && "opacity-50 cursor-wait",
          )}
        >
          <CheckCheck className="w-4 h-4" />
          Tout marquer comme lu
        </button>
      </div>

      {/* Liste */}
      {items.length === 0 ? (
        <div className="text-center py-20 space-y-3">
          <BellOff className="w-10 h-10 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">
            Aucune notification pour l'instant.
          </p>
          <Link
            href="/recettes"
            className="text-accent hover:underline text-sm"
          >
            Explorer les recettes
          </Link>
        </div>
      ) : (
        <ul className="space-y-2">
          {items.map((notif) => (
            <NotificationCard
              key={notif.id}
              notif={notif}
              isBusy={busyIds.has(notif.id)}
              onMarkRead={handleMarkOne}
            />
          ))}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1 || loading}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-card-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </button>

          <span className="text-sm text-muted-foreground">
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages || loading}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-card-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Suivant
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Carte individuelle ─────────────────────────────────── */

function NotificationCard({
  notif,
  isBusy,
  onMarkRead,
}: {
  notif: NotificationEnriched;
  isBusy: boolean;
  onMarkRead: (id: string) => void;
}) {
  const d = buildNotificationDisplay(notif);
  const unread = !notif.read_at;

  return (
    <li
      className={cn(
        "rounded-xl border transition-all",
        unread
          ? "border-accent/30 bg-accent/5 shadow-sm shadow-accent/5"
          : "border-border bg-transparent",
      )}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          {d.actorAvatar ? (
            <Image
              src={d.actorAvatar}
              alt={d.actorPseudo}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
              <User className="w-5 h-5" />
            </div>
          )}
          <span
            className="absolute -bottom-1 -right-1 text-sm bg-background rounded-full px-1 leading-none py-0.5 border border-border"
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
                "text-xs mt-1",
                d.isDeleted
                  ? "text-muted-foreground italic line-through"
                  : "font-medium text-foreground/90",
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

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <time className="text-[11px] text-muted-foreground/80">
              {formatRelativeTime(notif.created_at)}
            </time>

            {!d.isDeleted && d.href && (
              <Link
                href={d.href}
                onClick={() => {
                  if (unread) onMarkRead(notif.id);
                }}
                className="text-xs font-medium text-accent hover:underline"
              >
                Voir
              </Link>
            )}

            {unread && (
              <button
                type="button"
                onClick={() => onMarkRead(notif.id)}
                disabled={isBusy}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                <Check className="w-3 h-3" />
                Marquer comme lu
              </button>
            )}
          </div>
        </div>

        {unread && (
          <span
            className="shrink-0 mt-2 w-2 h-2 rounded-full bg-accent"
            aria-hidden="true"
          />
        )}
      </div>
    </li>
  );
}
