-- Katalog członkiń: tabela + polityki RLS + bucket na zdjęcia.
-- Ta migracja została już zastosowana w projekcie Supabase "mamai-final" (30.07.2026).
-- Plik trzymamy w repo jako dokumentację schematu.

CREATE TABLE public.members_directory (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  bio text NOT NULL CHECK (char_length(bio) <= 250),
  business_name text,
  business_url text,
  avatar_url text NOT NULL,
  consent_gdpr boolean NOT NULL CHECK (consent_gdpr = true),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected'))
);

ALTER TABLE public.members_directory ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON public.members_directory TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.members_directory TO authenticated;
GRANT ALL ON public.members_directory TO service_role;

-- Publicznie widoczne tylko zatwierdzone profile; administratorka widzi wszystko
CREATE POLICY "Public can view approved members"
  ON public.members_directory FOR SELECT
  TO anon, authenticated
  USING (status = 'approved' OR (auth.jwt() ->> 'email') = 'zuzannamazurek1@gmail.com');

-- Każdy może wysłać zgłoszenie, ale tylko ze zgodą RODO i statusem pending
CREATE POLICY "Anyone can submit pending application"
  ON public.members_directory FOR INSERT
  TO anon, authenticated
  WITH CHECK (consent_gdpr = true AND status = 'pending');

-- Tylko administratorka może zmieniać status i usuwać profile
CREATE POLICY "Admin can update members"
  ON public.members_directory FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'zuzannamazurek1@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'zuzannamazurek1@gmail.com');

CREATE POLICY "Admin can delete members"
  ON public.members_directory FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'zuzannamazurek1@gmail.com');

-- Publiczny bucket na zdjęcia profilowe (limit 500 KB, tylko obrazy)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 512000, ARRAY['image/webp','image/jpeg','image/png'])
ON CONFLICT (id) DO NOTHING;

-- Upload dozwolony dla każdej (formularz jest anonimowy), usuwanie tylko dla administratorki.
-- Celowo BEZ polityki SELECT: publiczny bucket serwuje pliki po URL-u,
-- a brak polityki uniemożliwia listowanie wszystkich plików.
CREATE POLICY "Anyone can upload avatars"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Admin can delete avatars"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars' AND (auth.jwt() ->> 'email') = 'zuzannamazurek1@gmail.com');
