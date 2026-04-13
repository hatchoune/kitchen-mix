-- ============================================================
-- Kitchen Mix — Migration : Système de bannissement
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- 1. Table des emails bannis
CREATE TABLE IF NOT EXISTS banned_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  user_id UUID, -- l'ancien user_id (info, peut être null si supprimé)
  reason TEXT,
  banned_by UUID REFERENCES auth.users,
  banned_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_banned_users_email ON banned_users (email);

-- RLS : seuls les admins lisent/écrivent
ALTER TABLE banned_users ENABLE ROW LEVEL SECURITY;

-- Lecture par les admins uniquement
CREATE POLICY "Admins can read banned_users"
  ON banned_users FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
  );

-- Insert par les admins
CREATE POLICY "Admins can insert banned_users"
  ON banned_users FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
  );

-- Delete par les admins (débannir)
CREATE POLICY "Admins can delete banned_users"
  ON banned_users FOR DELETE
  USING (
    EXISTS (SELECT 1 FROM admins WHERE admins.user_id = auth.uid())
  );

-- 2. Fonction pour vérifier si un email est banni (utilisable côté serveur)
CREATE OR REPLACE FUNCTION is_email_banned(check_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM banned_users WHERE email = LOWER(TRIM(check_email))
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
