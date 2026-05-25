-- ============================================================================
-- פורטל גביש — סכמת אזור קהילתי
-- להרצה ב-Supabase SQL Editor פעם אחת בעת הגדרת הפרויקט.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. PROFILES — מורחב מ-auth.users
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  full_name text not null default '',
  organization text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated" on public.profiles
  for select using (auth.uid() is not null);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- Trigger: מונע מ-user רגיל לשנות את role של עצמו.
-- service_role עוקף RLS ולא מפעיל את ה-trigger ממילא (SECURITY DEFINER).
create or replace function public.prevent_role_self_change()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() = old.id and old.role is distinct from new.role then
    raise exception 'cannot change own role via api';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_prevent_role_self_change on public.profiles;
create trigger profiles_prevent_role_self_change
  before update on public.profiles
  for each row execute function public.prevent_role_self_change();

-- ----------------------------------------------------------------------------
-- 2. TRIGGER — יצירת profile אוטומטית בעת signup
-- ----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, organization)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'organization'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 3. POSTS — פיד עדכונים
-- ----------------------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (length(body) > 0 and length(body) <= 5000),
  image_url text,
  created_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts (created_at desc);

alter table public.posts enable row level security;

drop policy if exists "posts_select_authenticated" on public.posts;
create policy "posts_select_authenticated" on public.posts
  for select using (auth.uid() is not null);

drop policy if exists "posts_insert_admin" on public.posts;
create policy "posts_insert_admin" on public.posts
  for insert with check (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
    and author_id = auth.uid()
  );

drop policy if exists "posts_update_admin" on public.posts;
create policy "posts_update_admin" on public.posts
  for update using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

drop policy if exists "posts_delete_admin" on public.posts;
create policy "posts_delete_admin" on public.posts
  for delete using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- ----------------------------------------------------------------------------
-- 4. STORAGE BUCKET — תמונות לפוסטים
-- ----------------------------------------------------------------------------
-- יצירת bucket ציבורי לקריאה. ההעלאה מוגבלת ל-admins דרך RLS.
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do update set public = true;

drop policy if exists "post_images_admin_insert" on storage.objects;
create policy "post_images_admin_insert" on storage.objects
  for insert with check (
    bucket_id = 'post-images'
    and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

drop policy if exists "post_images_admin_update" on storage.objects;
create policy "post_images_admin_update" on storage.objects
  for update using (
    bucket_id = 'post-images'
    and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

drop policy if exists "post_images_admin_delete" on storage.objects;
create policy "post_images_admin_delete" on storage.objects
  for delete using (
    bucket_id = 'post-images'
    and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

drop policy if exists "post_images_public_read" on storage.objects;
create policy "post_images_public_read" on storage.objects
  for select using (bucket_id = 'post-images');

-- ============================================================================
-- ההגדרה הושלמה.
--
-- כדי לקדם משתמש ל-admin (אחרי שהוא נרשם דרך ה-UI):
--   update public.profiles
--   set role = 'admin'
--   where id = (select id from auth.users where email = 'someone@example.com');
-- ============================================================================
