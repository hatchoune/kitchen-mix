-- ============================================================
-- Kitchen Mix — Migration : Multi-appareils dans profils
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- Convertir modele_thermomix de TEXT → TEXT[]
-- Les valeurs existantes ("TM6") deviennent ARRAY['TM6']
ALTER TABLE profils
  ALTER COLUMN modele_thermomix TYPE TEXT[]
  USING ARRAY[modele_thermomix];

-- Valeur par défaut pour les nouveaux profils
ALTER TABLE profils
  ALTER COLUMN modele_thermomix SET DEFAULT ARRAY['TM6']::TEXT[];
