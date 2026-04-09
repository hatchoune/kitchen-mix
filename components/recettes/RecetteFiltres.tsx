"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { CATEGORIES, REGIMES, DIFFICULTES, TRI_OPTIONS } from "@/lib/constants";
import { APPLIANCES } from "@/lib/appliance-specs";
import { cn } from "@/lib/utils";

export default function RecetteFiltres() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategorie = searchParams.get("categorie") || "";
  const currentModele = searchParams.get("modele") || "";
  const currentDifficulte = searchParams.get("difficulte") || "";
  const currentRegime = searchParams.get("regime") || "";
  const currentTri = searchParams.get("tri") || "recent";

  const hasFilters =
    currentCategorie || currentModele || currentDifficulte || currentRegime;

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page"); // Reset pagination on filter change
      router.push(`?${params.toString()}`);
    },
    [router, searchParams],
  );

  const clearFilters = () => {
    router.push("?");
  };

  return (
    <div className="space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Filtres</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-accent hover:underline"
          >
            <X className="w-3 h-3" /> Réinitialiser
          </button>
        )}
      </div>

      {/* Filter sections */}
      <div className="flex flex-wrap gap-6">
        {/* Catégorie */}
        <FilterSelect
          label="Catégorie"
          value={currentCategorie}
          onChange={(v) => updateFilter("categorie", v)}
          options={CATEGORIES.map((c) => ({ value: c.value, label: c.label }))}
        />

        {/* Modèle */}
        <FilterSelect
          label="Modèle"
          value={currentModele}
          onChange={(v) => updateFilter("modele", v)}
          options={APPLIANCES.map((a) => ({ value: a.id, label: a.label }))}
        />

        {/* Difficulté */}
        <FilterSelect
          label="Difficulté"
          value={currentDifficulte}
          onChange={(v) => updateFilter("difficulte", v)}
          options={DIFFICULTES.map((d) => ({
            value: d.value,
            label: `${d.emoji} ${d.label}`,
          }))}
        />

        {/* Régime */}
        <FilterSelect
          label="Régime"
          value={currentRegime}
          onChange={(v) => updateFilter("regime", v)}
          options={REGIMES.map((r) => ({ value: r.value, label: r.label }))}
        />

        {/* Tri */}
        <FilterSelect
          label="Trier par"
          value={currentTri}
          onChange={(v) => updateFilter("tri", v)}
          options={TRI_OPTIONS.map((t) => ({ value: t.value, label: t.label }))}
          showAll={false}
        />
      </div>
    </div>
  );
}

// ─── Sub-component ───────────────────────────────────────────

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  showAll?: boolean;
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  showAll = true,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-muted-foreground font-medium">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "bg-card border border-border rounded-lg px-3 py-2 text-sm",
          "text-foreground appearance-none cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-accent/50",
          "min-w-[140px]",
        )}
      >
        {showAll && <option value="">Tous</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
