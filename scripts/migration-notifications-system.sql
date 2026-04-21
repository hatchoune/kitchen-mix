-- =============================================================
-- Kitchen Mix — Migration : Notifications Système
-- -------------------------------------------------------------
-- Supporte les notifications auto-générées par le système
-- (pas d'acteur utilisateur), utilisées notamment pour :
--   - Rappel de sauvegarde de planning en cours
-- -------------------------------------------------------------
-- À exécuter UNE SEULE FOIS sur Supabase (SQL Editor).
-- Idempotent : peut être relancé sans effet de bord.
-- =============================================================

-- 1) actor_id doit accepter NULL pour les notifications système
ALTER TABLE notifications
  ALTER COLUMN actor_id DROP NOT NULL;

-- 2) Étendre la contrainte CHECK sur le type de notification
--    pour inclure le nouveau type 'planning_unsaved_reminder'.
--    On drop puis recrée proprement.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public.notifications'::regclass
      AND conname = 'notifications_type_check'
  ) THEN
    ALTER TABLE notifications DROP CONSTRAINT notifications_type_check;
  END IF;
END $$;

ALTER TABLE notifications
  ADD CONSTRAINT notifications_type_check
  CHECK (type IN (
    'comment_like',
    'comment_reply',
    'recipe_comment',
    'recipe_favorite',
    'recipe_rating',
    'planning_unsaved_reminder'
  ));

-- 3) (Optionnel) Index utile pour le anti-spam 24h
--    Le filtre se fait sur user_id + type + created_at, l'index
--    accélère le SELECT COUNT dans notifyUnsavedPlanning.
CREATE INDEX IF NOT EXISTS notifications_user_type_created_idx
  ON notifications (user_id, type, created_at DESC);

-- 4) Vérification rapide (à exécuter manuellement si tu veux confirmer)
-- SELECT column_name, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'notifications' AND column_name = 'actor_id';
-- → doit retourner 'YES'

-- SELECT conname, pg_get_constraintdef(oid)
-- FROM pg_constraint
-- WHERE conrelid = 'public.notifications'::regclass
--   AND conname = 'notifications_type_check';
-- → doit lister les 6 types dont 'planning_unsaved_reminder'
