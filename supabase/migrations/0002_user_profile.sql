-- ============================================================================
-- פורטל גביש — תוספת פרופיל אישי
-- 1. avatar_url ב-profiles
-- 2. bucket avatars + RLS
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. PROFILES — תמונת פרופיל + תפקיד אישי (כותרת)
-- ----------------------------------------------------------------------------
alter table public.profiles
  add column if not exists avatar_url text;

alter table public.profiles
  add column if not exists title text;

-- ----------------------------------------------------------------------------
-- 2. STORAGE BUCKET — תמונות פרופיל
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;

-- כל משתמש מחובר יכול לקרוא (bucket ציבורי ממילא).
drop policy if exists "avatars_public_read" on storage.objects;
create policy "avatars_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

-- העלאה/עדכון/מחיקה — רק על תיקייה ששמה זהה ל-user.id.
-- מבנה הקובץ: avatars/<user_id>/<filename>
drop policy if exists "avatars_owner_insert" on storage.objects;
create policy "avatars_owner_insert" on storage.objects
  for insert with check (
    bucket_id = 'avatars'
    and auth.uid() is not null
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatars_owner_update" on storage.objects;
create policy "avatars_owner_update" on storage.objects
  for update using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "avatars_owner_delete" on storage.objects;
create policy "avatars_owner_delete" on storage.objects
  for delete using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
