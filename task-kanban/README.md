# Task Kanban

個人用のタスク管理カンバン。Vite + React + TypeScript + Tailwind CSS + shadcn/ui + Supabase で構築。

## セットアップ

1. 依存関係をインストールする。

   ```bash
   npm install
   ```

2. `.env.example` を `.env` にコピーし、Supabase の値を入れる（Supabase Dashboard > Project Settings > API）。

   ```bash
   cp .env.example .env
   ```

3. Supabase Dashboard の SQL Editor（または `supabase db push`）で `supabase/migrations/0001_tasks.sql` を実行する。

4. `allowed_emails` テーブルに自分のメールアドレスを登録する。

   ```sql
   insert into public.allowed_emails (email) values ('you@example.com');
   ```

5. Supabase Dashboard の Authentication 設定で以下を行う。
   - 「Allow new users to sign up」を OFF にする（招待制。新規登録を防ぐ）。
   - Site URL / Redirect URLs に `http://localhost:5173` を追加する。
   - Authentication > Users で自分のメールアドレスを「Invite user」する。

6. 開発サーバーを起動する。

   ```bash
   npm run dev
   ```

`.env` が未設定の場合、ビルドは通るが起動時に環境変数の設定を促す画面が表示される。

## 画面

- ログイン：メールアドレスを入力するとマジックリンクが送られる。新規登録は不可（`allowed_emails` に登録されたアカウントのみ利用可能）。
- ボード：6カラム（未着手 / 設計中 / 実装中 / 検収待ち / 完了 / 要確認）を横並びで表示する。
  - 「＋ 新規タスク」でタスクを作成する。
  - カードをドラッグして列を移動できる。
  - カードをクリックすると編集ダイアログが開く（タイトル・説明・状態を変更できる）。
  - カード右上のゴミ箱アイコンから削除できる（確認ダイアログあり）。

## 今後の予定

- Phase 2 以降でオーケストレーション（AI連携）を追加する予定。`src/lib/tasks.ts` はそのために UI に依存しない純粋なデータアクセス層として作られている。
