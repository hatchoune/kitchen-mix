-- KITCHEN MIX — Newsletter Subscribers
-- Exécuter dans Supabase SQL Editor après le schema principal

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  confirmed BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'website', -- 'website', 'footer', 'homepage'
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ DEFAULT NULL
);

-- Index pour recherche par email
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_confirmed ON newsletter_subscribers(confirmed);

-- RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Personne ne peut lire les emails des autres
-- Seul le service_role peut y accéder
DROP POLICY IF EXISTS "Newsletter: insert public" ON newsletter_subscribers;
CREATE POLICY "Newsletter: insert public"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (TRUE); -- N'importe qui peut s'inscrire

DROP POLICY IF EXISTS "Newsletter: no public read" ON newsletter_subscribers;
CREATE POLICY "Newsletter: no public read"
  ON newsletter_subscribers FOR SELECT
  USING (FALSE); -- Personne ne peut lister les inscrits via le client
