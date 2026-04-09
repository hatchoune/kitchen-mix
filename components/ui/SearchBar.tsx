"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
  size?: "default" | "large";
}

export default function SearchBar({
  placeholder = "Rechercher une recette...",
  defaultValue = "",
  onSearch,
  className,
  autoFocus = false,
  size = "default",
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = value.trim();
      if (!trimmed) return;

      if (onSearch) {
        onSearch(trimmed);
      } else {
        router.push(`/recherche?q=${encodeURIComponent(trimmed)}`);
      }
    },
    [value, onSearch, router]
  );

  const handleClear = () => {
    setValue("");
    if (onSearch) onSearch("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full group",
        className
      )}
    >
      <Search
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors",
          size === "large" ? "w-5 h-5" : "w-4 h-4"
        )}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          "w-full bg-card border border-border rounded-xl pl-11 pr-10 font-body",
          "placeholder:text-muted-foreground text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
          "transition-all duration-200",
          size === "large" ? "py-4 text-base" : "py-2.5 text-sm"
        )}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Effacer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </form>
  );
}
