-- Add source column to distinguish newsletter signups from /biznes signups.
-- Existing rows are all from the /biznes landing page (the only form that existed before).
ALTER TABLE public.subscribers
  ADD COLUMN source TEXT NOT NULL DEFAULT 'builderki'
  CHECK (source IN ('newsletter', 'builderki'));

-- Uniqueness was global on email. That breaks a valid scenario: a mama who
-- is both in the biznes community and wants the general newsletter gets
-- rejected on the second signup. Move to per-source uniqueness instead.
ALTER TABLE public.subscribers DROP CONSTRAINT subscribers_email_key;
ALTER TABLE public.subscribers ADD CONSTRAINT subscribers_email_source_key UNIQUE (email, source);
