"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { X, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ───────────────────────────────────────────────── */

type ToastType = "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void;
  toastSuccess: (message: string) => void;
  toastError: (message: string) => void;
  toastWarning: (message: string) => void;
  toastInfo: (message: string) => void;
}

/* ─── Context ─────────────────────────────────────────────── */

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

/* ─── Provider ────────────────────────────────────────────── */

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", duration = 4000) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts((prev) => [...prev, { id, message, type, duration }]);
    },
    [],
  );

  const toast = useCallback(
    (message: string, type?: ToastType, duration?: number) =>
      addToast(message, type, duration),
    [addToast],
  );

  const toastSuccess = useCallback(
    (msg: string) => addToast(msg, "success"),
    [addToast],
  );
  const toastError = useCallback(
    (msg: string) => addToast(msg, "error", 6000),
    [addToast],
  );
  const toastWarning = useCallback(
    (msg: string) => addToast(msg, "warning", 5000),
    [addToast],
  );
  const toastInfo = useCallback(
    (msg: string) => addToast(msg, "info"),
    [addToast],
  );

  return (
    <ToastContext.Provider
      value={{ toast, toastSuccess, toastError, toastWarning, toastInfo }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

/* ─── Container ───────────────────────────────────────────── */

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:right-6 z-[200] flex flex-col gap-2 items-center md:items-end pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}

/* ─── Single toast ────────────────────────────────────────── */

const ICON_MAP = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const STYLE_MAP: Record<ToastType, string> = {
  success:
    "border-sage/30 bg-sage/10 text-sage [&_.toast-icon]:text-sage",
  error:
    "border-error/30 bg-error/10 text-error [&_.toast-icon]:text-error",
  warning:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-500 [&_.toast-icon]:text-yellow-500",
  info: "border-accent/30 bg-accent/10 text-accent [&_.toast-icon]:text-accent",
};

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const Icon = ICON_MAP[toast.type];

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 4000);

    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  return (
    <div
      className={cn(
        "pointer-events-auto w-full md:max-w-sm rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md",
        "flex items-start gap-3 transition-all duration-300 ease-out",
        STYLE_MAP[toast.type],
        visible && !exiting
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3",
      )}
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <Icon className="toast-icon w-5 h-5 shrink-0 mt-0.5" />
      <p className="flex-1 text-sm font-medium text-foreground leading-snug">
        {toast.message}
      </p>
      <button
        onClick={() => {
          setExiting(true);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className="shrink-0 p-0.5 rounded hover:bg-white/10 transition-colors text-muted-foreground"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
