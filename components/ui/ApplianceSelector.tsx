"use client";

import { Plus, X } from "lucide-react";
import {
  APPLIANCES, getAppliancesByCategory, CATEGORY_LABELS,
  type ApplianceCategory,
} from "@/lib/appliance-specs";
import { cn } from "@/lib/utils";

interface Props {
  selected: string[];
  onChange: (ids: string[]) => void;
  max?: number;
}

/**
 * Sélecteur d'appareils propre :
 * - 1 menu déroulant groupé par catégorie
 * - Bouton "Ajouter un appareil" (max 4)
 * - Badges avec bouton × pour retirer
 */
export default function ApplianceSelector({ selected, onChange, max = 4 }: Props) {
  const grouped = getAppliancesByCategory();
  const canAdd = selected.length < max;

  const addAppliance = (id: string) => {
    if (!id || selected.includes(id)) return;
    onChange([...selected, id]);
  };

  const removeAppliance = (id: string) => {
    onChange(selected.filter(x => x !== id));
  };

  // Options encore disponibles
  const availableIds = APPLIANCES.filter(a => !selected.includes(a.id)).map(a => a.id);

  return (
    <div className="space-y-3">
      {/* Badges sélectionnés */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map(id => {
            const app = APPLIANCES.find(a => a.id === id);
            return (
              <span key={id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-black text-xs font-medium">
                {app?.label || id}
                <button onClick={() => removeAppliance(id)} className="hover:opacity-70 transition-opacity">
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Dropdown pour ajouter */}
      {canAdd && availableIds.length > 0 && (
        <div className="flex items-center gap-2">
          <select
            defaultValue=""
            onChange={e => { addAppliance(e.target.value); e.target.value = ""; }}
            className="input-field flex-1 text-sm"
          >
            <option value="" disabled>
              {selected.length === 0 ? "Choisir un appareil..." : "Ajouter un autre appareil..."}
            </option>
            {Object.entries(grouped).map(([cat, apps]) => {
              const available = apps.filter(a => !selected.includes(a.id));
              if (available.length === 0) return null;
              return (
                <optgroup key={cat} label={CATEGORY_LABELS[cat as ApplianceCategory]}>
                  {available.map(a => (
                    <option key={a.id} value={a.id}>{a.label}</option>
                  ))}
                </optgroup>
              );
            })}
          </select>
          <span className="text-xs text-muted-foreground shrink-0">
            {selected.length}/{max}
          </span>
        </div>
      )}

      {/* Message max atteint */}
      {!canAdd && (
        <p className="text-xs text-muted-foreground">Maximum {max} appareils atteint.</p>
      )}
    </div>
  );
}
