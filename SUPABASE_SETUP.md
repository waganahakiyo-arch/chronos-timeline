# Supabase セットアップ手順

## 1. プロジェクト作成

1. [supabase.com](https://supabase.com) でアカウントを作成・ログイン
2. 「New project」でプロジェクトを作成
3. Settings → API からURLとanon keyをコピー
4. `.env.local` に貼り付ける

## 2. SQL を実行する

Supabase ダッシュボードの **SQL Editor** を開き、以下のSQLを実行してください。

```sql
-- ─── テーブル作成 ────────────────────────────────────────────────

-- ユーザーの年表
create table timelines (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  is_public boolean default false,
  created_at timestamptz default now()
);

-- 年表に追加した事件
create table timeline_events (
  id uuid default gen_random_uuid() primary key,
  timeline_id uuid references timelines(id) on delete cascade,
  year integer not null,
  title text not null,
  description text,
  category text,
  era text,
  created_at timestamptz default now()
);

-- ─── RLS（行レベルセキュリティ）────────────────────────────────

alter table timelines enable row level security;
alter table timeline_events enable row level security;

-- 自分の年表は読み書き可能
create policy "自分の年表のみ読み書き可能" on timelines
  for all using (auth.uid() = user_id);

-- 公開年表は誰でも閲覧可能
create policy "公開年表は誰でも閲覧可能" on timelines
  for select using (is_public = true);

-- 年表オーナーのみ events を操作可能
create policy "年表オーナーのみ events を操作可能" on timeline_events
  for all using (
    exists (select 1 from timelines where id = timeline_id and user_id = auth.uid())
  );

-- 公開年表のイベントは誰でも閲覧可能
create policy "公開年表のイベントは閲覧可能" on timeline_events
  for select using (
    exists (select 1 from timelines where id = timeline_id and is_public = true)
  );
```

## 3. 認証設定

Supabase ダッシュボードの **Authentication → Providers** で「Email」が有効になっていることを確認してください（デフォルトで有効）。

開発中は **Authentication → Settings** で「Confirm email」をオフにすると、確認メールなしで登録できます。
