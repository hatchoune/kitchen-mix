-- ============================================================
-- Kitchen Mix — Migration : Système de trophées (achievements)
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- 1. Table des achievements débloqués par utilisateur
-- Les définitions sont dans le code (lib/achievements.ts) pour éviter le seeding.
-- On stocke juste le code du trophée + la date de déblocage.
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  achievement_code TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  notified BOOLEAN DEFAULT false,
  UNIQUE(user_id, achievement_code)
);

-- Index pour les lookups rapides
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements (user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_unnotified ON user_achievements (user_id, notified) WHERE notified = false;

-- RLS
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- L'utilisateur peut lire ses propres achievements
CREATE POLICY "User can read own achievements"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

-- Tout le monde peut lire les achievements (profil public)
CREATE POLICY "Public can read achievements"
  ON user_achievements FOR SELECT
  USING (true);

-- Seul le serveur (via service role) insère — pas de policy INSERT pour anon/authenticated
-- Les server actions utilisent createAdminSupabase ou le user authentifié
CREATE POLICY "User achievements insert via server"
  ON user_achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Update (pour marquer notified = true)
CREATE POLICY "User can update own achievements"
  ON user_achievements FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 2. Ajouter last_seen dans profils pour le tracking des connexions consécutives
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profils' AND column_name = 'last_seen'
  ) THEN
    ALTER TABLE profils ADD COLUMN last_seen DATE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profils' AND column_name = 'login_streak'
  ) THEN
    ALTER TABLE profils ADD COLUMN login_streak INT DEFAULT 0;
  END IF;
END
$$;
