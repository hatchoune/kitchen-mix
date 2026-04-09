"use client";

import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { subscribeToNewsletter } from "@/app/actions/newsletter";

interface NewsletterFormProps {
  source?: string;
  compact?: boolean;
  className?: string;
}

export default function NewsletterForm({
  source = "website",
  compact = false,
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) return;

    setStatus("loading");
    setMessage("");

    try {
      await subscribeToNewsletter(trimmed, source);
      setStatus("success");
      setMessage("Merci ! Vous recevrez bientôt nos meilleures recettes.");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Une erreur est survenue.");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-sage/10 text-sage",
          className,
        )}
      >
        <Check className="w-5 h-5" />
        <span className="text-sm font-medium">{message}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex gap-2",
        compact ? "flex-row" : "flex-col sm:flex-row",
        className,
      )}
    >
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="votre@email.com"
          required
          className={cn(
            "w-full bg-card border rounded-xl pl-10 pr-4 py-3 text-sm",
            "placeholder:text-muted-foreground text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
            "transition-all",
            status === "error"
              ? "border-error focus:ring-error/50"
              : "border-border",
          )}
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "flex items-center justify-center gap-2 px-6 py-3 rounded-xl",
          "bg-accent text-black font-display font-bold text-sm",
          "hover:bg-accent-hover disabled:opacity-60",
          "transition-colors whitespace-nowrap",
          compact && "px-4",
        )}
      >
        {status === "loading" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Mail className="w-4 h-4" />
            {compact ? "OK" : "S'inscrire"}
          </>
        )}
      </button>

      {status === "error" && message && (
        <p className="text-xs text-error mt-1 sm:mt-0 sm:absolute">{message}</p>
      )}
    </form>
  );
}
