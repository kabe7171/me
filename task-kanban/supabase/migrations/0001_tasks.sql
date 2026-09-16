-- タスク自走カンバン Phase 1: tasks テーブルと許可ユーザー制御
-- Supabase Dashboard の SQL Editor か `supabase db push` で適用する。

-- ---------------------------------------------------------------
-- 1. 許可メールアドレス（実質シングルユーザー）
--    ここに載っているメールアドレスだけが tasks を読み書きできる。
-- ---------------------------------------------------------------
create table public.allowed_emails (
  email text primary key,
  created_at timestamptz not null default now()
);

alter table public.allowed_emails enable row level security;

-- 自分のアドレスが載っているかどうかだけ確認できる（他人の行は見えない）
create policy "allowed_emails: read own row"
  on public.allowed_emails
  for select
  to authenticated
  using (email = (select auth.jwt() ->> 'email'));

-- ログイン中のユーザーが許可リストに載っているか
create or replace function public.is_allowed_user()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.allowed_emails
    where email = (select auth.jwt() ->> 'email')
  );
$$;

revoke execute on function public.is_allowed_user() from public, anon;
grant execute on function public.is_allowed_user() to authenticated;

-- ---------------------------------------------------------------
-- 2. tasks テーブル
--    status は Phase 2 以降でオーケストレーション側が更新する前提。
-- ---------------------------------------------------------------
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 200),
  description text not null default '',
  status text not null default 'todo'
    check (status in ('todo', 'designing', 'implementing', 'review', 'done', 'needs_check')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tasks_status_created_at_idx on public.tasks (status, created_at);

alter table public.tasks enable row level security;

create policy "tasks: allowed user has full access"
  on public.tasks
  for all
  to authenticated
  using (public.is_allowed_user())
  with check (public.is_allowed_user());

-- updated_at を自動更新
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger tasks_set_updated_at
  before update on public.tasks
  for each row
  execute function public.set_updated_at();

-- ---------------------------------------------------------------
-- 3. 許可するメールアドレスを登録する（自分のアドレスに書き換えて実行）
-- ---------------------------------------------------------------
-- insert into public.allowed_emails (email) values ('you@example.com');
