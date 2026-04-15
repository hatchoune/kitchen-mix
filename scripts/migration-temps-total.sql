-- Migration: Ajouter colonne temps_total calculée pour le filtre durée
-- À exécuter dans Supabase SQL Editor

-- Colonne calculée (STORED = indexable)
ALTER TABLE recettes
ADD COLUMN IF NOT EXISTS temps_total integer
  GENERATED ALWAYS AS (COALESCE(temps_preparation, 0) + COALESCE(temps_cuisson, 0)) STORED;

-- Index pour accélérer les filtres par durée
CREATE INDEX IF NOT EXISTS idx_recettes_temps_total ON recettes (temps_total);

-- Vérification
SELECT slug, temps_preparation, temps_cuisson, temps_total
FROM recettes
LIMIT 5;
