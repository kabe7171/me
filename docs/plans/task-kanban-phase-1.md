# タスク自走カンバン Phase 1 — 実装計画（implementer 向け）

## 役割
あなたは実装担当。設計は完了済み。設計意図は疑わず、**現行コードは自分で読んで**正確に反映する。
指示外のリファクタ・整形・ライブラリ追加はしない。

## 作業ディレクトリ
`task-kanban/`（リポジトリ直下のサブディレクトリ）。コマンドはすべてここで実行する。
`npm run build`（= `tsc -b && vite build`）と `npm run lint`（oxlint）で確認する。

## すでに用意済み（触らない）
- Vite + React + TypeScript の骨格（`vite.config.ts`, `tsconfig*.json`, `@/` エイリアス）
- Tailwind v4（`src/index.css` にテーマ変数あり）
- shadcn/ui コンポーネント：`src/components/ui/{button,input,textarea,dialog,alert-dialog,label,card,sonner,badge}.tsx`、`src/lib/utils.ts`（`cn`）
- 依存：`@supabase/supabase-js`, `@dnd-kit/core`, `@dnd-kit/utilities`, `lucide-react`, `sonner`
- DB：`supabase/migrations/0001_tasks.sql`（tasks / allowed_emails / RLS / `is_allowed_user()` RPC）
- `.env.example`（`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`）

## 読み込むファイル
- `task-kanban/src/main.tsx`, `task-kanban/src/App.tsx`（仮置き。書き換える）
- `task-kanban/src/components/ui/*.tsx`（使い方を把握する。編集しない）
- `task-kanban/supabase/migrations/0001_tasks.sql`（列名・status値・RPC名の正）

## タスク
個人用タスク管理カンバンの Phase 1 を作る。ログイン → ボード表示 → カード作成 → ドラッグで列移動 → 編集 → 削除 が動く状態にする。AI連携は作らない。

## データ仕様（SQLと一致させる）
- テーブル `tasks`: `id uuid`, `title text`, `description text`, `status text`, `created_at`, `updated_at`
- status の値と表示名（この順でカラムを並べる）:

| status | 表示名 |
|---|---|
| `todo` | 未着手 |
| `designing` | 設計中 |
| `implementing` | 実装中 |
| `review` | 検収待ち |
| `done` | 完了 |
| `needs_check` | 要確認 |

- 列内の並びは `created_at` 昇順。列内での並び替えは Phase 1 では不要（列をまたぐ移動だけ）。

## 作成するファイルと内容

### `src/lib/supabase.ts`
- `import.meta.env.VITE_SUPABASE_URL` と `VITE_SUPABASE_PUBLISHABLE_KEY` を読み、`createClient` で `supabase` をexport。
- どちらかが未設定なら `throw new Error(...)` ではなく、`isSupabaseConfigured: boolean` もexportし、App 側で「環境変数が未設定」画面を出せるようにする（クライアントは未設定でも生成してよい。ダミー値で `createClient` するのではなく、未設定時は `null` を返す設計でもよい。可読性優先で選ぶ）。
- 認証トークンの保存は supabase-js のデフォルトに任せる。自前で localStorage に書かない。

### `src/types/task.ts`
- `TaskStatus` 型（上の6値のユニオン）、`TASK_STATUSES: readonly TaskStatus[]`（表示順）、`TASK_STATUS_LABELS: Record<TaskStatus, string>`
- `Task` 型（`id, title, description, status, created_at, updated_at`）

### `src/lib/tasks.ts`（データアクセス層。Phase 2 でオーケストレーション側から呼ぶ想定なので、UI に依存しない純粋な関数にする）
- `listTasks(): Promise<Task[]>` — `created_at` 昇順
- `createTask(input: { title: string; description: string }): Promise<Task>` — status は `'todo'`
- `updateTask(id: string, patch: Partial<Pick<Task, 'title' | 'description' | 'status'>>): Promise<Task>`
- `deleteTask(id: string): Promise<void>`
- Supabase の `error` が返ったら `throw new Error(error.message)`。黙って握りつぶさない。

### `src/hooks/useAuth.ts`
- `supabase.auth.getSession()` で初期化し、`onAuthStateChange` で追従。`{ session, loading }` を返す。アンマウントで unsubscribe。
- `signOut()` も返す。

### `src/hooks/useTasks.ts`
- `{ tasks, loading, error, reload, create, update, move, remove }` を返す。
- `move(id, status)` はドラッグ用。**先にローカル state を更新（楽観更新）→ `updateTask` → 失敗したら元に戻す + `toast.error`**。
- `create` / `update` / `remove` は成功時 `toast.success`、失敗時 `toast.error(message)`。
- 初回読み込み失敗は `error` に入れ、画面に「再読み込み」ボタン付きで表示する。

### `src/components/auth/LoginForm.tsx`
- メールアドレス入力 → `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin, shouldCreateUser: false } })`（マジックリンク方式。新規ユーザーは作らない＝招待制）。
- 送信後は「メールを確認してください」表示に切り替える。エラーは `toast.error` とフォーム下の文言の両方で出す。
- 送信中はボタン disabled。

### `src/components/auth/AuthGate.tsx`
- `useAuth` で `loading` 中はスピナー/「読み込み中」。
- `session` なし → `LoginForm`。
- `session` あり → `supabase.rpc('is_allowed_user')` を1回呼ぶ。`true` なら children を表示。`false` または RPC エラー → 「このアカウントは許可されていません」画面（メールアドレス表示 + ログアウトボタン）。RPC 呼び出しは `session.user.id` が変わったときだけ再実行。

### `src/components/board/Board.tsx`
- `useTasks` を使う。ヘッダー（アプリ名「Task Kanban」、ログイン中メール、「＋ 新規タスク」ボタン、ログアウトボタン）。
- `DndContext` で6カラムを横並び（`overflow-x-auto`、各カラム `min-w-72`）。
- `PointerSensor` に `activationConstraint: { distance: 5 }` を付ける（クリックで編集ダイアログが開けるように）。
- `onDragEnd` で `over.id` がカラム id（= status）なら `move(taskId, status)`。同じ列なら何もしない。
- 新規作成・編集は同じ `TaskDialog` を使う（`mode: 'create' | 'edit'`）。

### `src/components/board/Column.tsx`
- `useDroppable({ id: status })`。ドロップ中（`isOver`）は背景を変える。
- ヘッダーに表示名と件数バッジ。
- カードが0件なら「タスクなし」と薄字で表示する。

### `src/components/board/TaskCard.tsx`
- `useDraggable({ id: task.id })`。`CSS.Translate.toString(transform)` で移動。ドラッグ中は `opacity-50`。
- `Card` にタイトルと説明（`line-clamp-2`）。クリックで編集ダイアログ、右上に削除アイコンボタン（`Trash2`）→ `DeleteTaskDialog`。
- 削除ボタンのクリックはカードの onClick に伝播させない。

### `src/components/board/TaskDialog.tsx`
- `Dialog` + `Input`（タイトル、必須、最大200文字）+ `Textarea`（説明）。
- 編集モードでは `status` も変更できる（`<select>` でよい。shadcn の select は用意していないのでネイティブ `<select>` に Tailwind クラス）。
- 保存中はボタン disabled。タイトル空なら送信しない（フォーム下に文言）。

### `src/components/board/DeleteTaskDialog.tsx`
- `AlertDialog` で「『{title}』を削除しますか？ この操作は取り消せません。」→ 削除。

### `src/App.tsx`
- `isSupabaseConfigured` が false → 「`.env` に VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY を設定してください」画面。
- それ以外は `<AuthGate><Board /></AuthGate>`。

### `src/main.tsx`
- `<Toaster />`（`@/components/ui/sonner`）を `<App />` の隣に置く。

### `README.md`（`task-kanban/README.md` を書き換える）
- セットアップ手順：`npm install` → `.env` 作成 → Supabase で `supabase/migrations/0001_tasks.sql` を実行 → `allowed_emails` に自分のメールを insert → Supabase Dashboard の Auth 設定で「Allow new users to sign up」を OFF、Site URL / Redirect URLs に `http://localhost:5173` を追加 → Authentication > Users で自分のメールを「Invite user」→ `npm run dev`。
- 画面の説明（6カラム、操作）。Phase 2 以降の予定を1行。

## 制約
- 可読性優先。過剰な抽象化をしない（Context や状態管理ライブラリは追加しない）。
- 触ってよい範囲：`task-kanban/src/**`（`components/ui/*` と `lib/utils.ts` は除く）、`task-kanban/README.md`。
- 触ってはいけない：`package.json` の依存追加、`vite.config.ts`、`tsconfig*.json`、`src/index.css`、`supabase/**`、リポジトリ直下の Next.js 側ファイル。
- 認証ロジックは supabase-js の公式 API だけを使う。自前のトークン保存・検証を書かない。
- 文言は日本語。AIっぽい定型句（「〜しましょう！」等）は使わない。

## エッジケース
- カード0件のカラム → 「タスクなし」表示。
- Supabase 呼び出し失敗 → toast で必ず通知。初回読み込み失敗はリロードボタン付きで画面に出す。
- ドラッグ移動失敗 → 元の列に戻す。
- 同じ列にドロップ／カラム外にドロップ → 何もしない。
- 環境変数未設定 → 設定案内画面（クラッシュさせない）。

## 完了条件
- `npm run build` が成功（型エラー0）。`npm run lint` がエラー0（warning は許容）。
- コード上で「ログイン→ボード→作成→ドラッグ移動→編集→削除」の各経路が実装されている。
- `.env` 未設定でも `npm run build` が通り、起動すると設定案内画面が出る。

## 困ったときの規則
前提と食い違う（用意済みコンポーネントの export 名が違う等）場合は、推測で進めず **STOPして「何が食い違ったか・取り得る選択肢・推奨案」を簡潔に報告**する。

## 出力方法
ファイルを直接編集する。最後に変更ファイル一覧と、build / lint の結果を報告する。
