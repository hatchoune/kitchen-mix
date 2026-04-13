-- ============================================================
-- Kitchen Mix — Migration : Plannings publics
-- À exécuter dans Supabase SQL Editor
-- ============================================================

-- 1. Table des plannings sauvegardés
CREATE TABLE IF NOT EXISTS user_plannings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  week_start DATE NOT NULL,
  data JSONB NOT NULL, -- { "0": ["recette_id_1", null, "recette_id_2"], "1": [...], ... }
  likes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_plannings_user_id ON user_plannings (user_id);
CREATE INDEX IF NOT EXISTS idx_user_plannings_public ON user_plannings (is_public) WHERE is_public = true;

-- 2. Likes sur les plannings
CREATE TABLE IF NOT EXISTS planning_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  planning_id UUID REFERENCES user_plannings ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, planning_id)
);

CREATE INDEX IF NOT EXISTS idx_planning_likes_planning ON planning_likes (planning_id);

-- 3. Favoris de plannings
CREATE TABLE IF NOT EXISTS planning_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  planning_id UUID REFERENCES user_plannings ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, planning_id)
);

-- 4. RLS
ALTER TABLE user_plannings ENABLE ROW LEVEL SECURITY;
ALTER TABLE planning_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE planning_favorites ENABLE ROW LEVEL SECURITY;

-- user_plannings : lecture publique si is_public, sinon propriétaire uniquement
CREATE POLICY "Public plannings readable by all"
  ON user_plannings FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Owner can insert plannings"
  ON user_plannings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner can update plannings"
  ON user_plannings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Owner can delete plannings"
  ON user_plannings FOR DELETE
  USING (auth.uid() = user_id);

-- planning_likes
CREATE POLICY "Likes readable by all"
  ON planning_likes FOR SELECT USING (true);

CREATE POLICY "User can insert own like"
  ON planning_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can delete own like"
  ON planning_likes FOR DELETE
  USING (auth.uid() = user_id);

-- planning_favorites
CREATE POLICY "User can read own favorites"
  ON planning_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "User can insert own favorite"
  ON planning_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can delete own favorite"
  ON planning_favorites FOR DELETE
  USING (auth.uid() = user_id);

-- 5. Fonction pour incrémenter/décrémenter likes_count
CREATE OR REPLACE FUNCTION update_planning_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE user_plannings SET likes_count = likes_count + 1 WHERE id = NEW.planning_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE user_plannings SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.planning_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_planning_likes_count ON planning_likes;
CREATE TRIGGER trigger_planning_likes_count
  AFTER INSERT OR DELETE ON planning_likes
  FOR EACH ROW EXECUTE FUNCTION update_planning_likes_count();
