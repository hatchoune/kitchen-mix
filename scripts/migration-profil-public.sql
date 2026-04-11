-- ============================================================
-- Kitchen Mix — Migration : Profil public
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- 1. Permettre la lecture publique des profils (champs non-sensibles)
-- On drop l'ancienne policy restrictive si elle existe
DROP POLICY IF EXISTS "Profils visibles par le propriétaire" ON profils;
DROP POLICY IF EXISTS "Profils visibles par tous" ON profils;
DROP POLICY IF EXISTS "Users can view own profile" ON profils;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profils;

-- Lecture publique (même non-authentifié pour le SEO)
CREATE POLICY "Profils visibles par tous"
  ON profils FOR SELECT
  USING (true);

-- Garder la policy d'update pour le propriétaire uniquement
-- (elle existe probablement déjà, on la recrée proprement)
DROP POLICY IF EXISTS "Users can update own profile" ON profils;
DROP POLICY IF EXISTS "Profil modifiable par le propriétaire" ON profils;

CREATE POLICY "Profil modifiable par le propriétaire"
  ON profils FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 2. Vue pour les recettes publiques d'un utilisateur (optionnel, on peut aussi requêter directement)
-- On n'en crée pas, on requête directement avec les filtres approuve=true, publie=true.

-- 3. Index pour accélérer les lookups par auteur_id sur recettes
CREATE INDEX IF NOT EXISTS idx_recettes_auteur_id ON recettes (auteur_id);
CREATE INDEX IF NOT EXISTS idx_recipe_comments_user_id ON recipe_comments (user_id);
