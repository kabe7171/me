-- allowed_emails の RLS（自分の行だけ読める）で足りるので SECURITY DEFINER をやめる。
-- Supabase の security advisor 警告（0029）への対応。
create or replace function public.is_allowed_user()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select exists (
    select 1
    from public.allowed_emails
    where email = (select auth.jwt() ->> 'email')
  );
$$;
