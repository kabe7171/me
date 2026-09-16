# Antique Gallery - アンティーク家具販売サイト

## プロジェクト概要
アンティーク家具のオンライン販売サイト。Next.js (App Router) + TypeScript + Tailwind CSS で構築。

## 技術スタック
- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Context (カート)

## ディレクトリ構成
```
src/
├── app/             # ページ (App Router)
│   ├── page.tsx     # トップ（商品一覧）
│   ├── products/[id]/  # 商品詳細
│   ├── cart/        # カートページ
│   └── contact/    # お問い合わせ
├── components/      # 共通コンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── context/         # React Context
│   └── CartContext.tsx
└── data/            # データ層
    └── products.ts  # 商品データ・ヘルパー関数
```

## コマンド
- `npm run dev` - 開発サーバー起動
- `npm run build` - 本番ビルド
- `npm run lint` - ESLint 実行

## 開発メモ
- この環境では Google Fonts が取得できないため、システムフォントを使用
- 商品画像はプレースホルダー表示（`/images/` 配下に配置想定）
- カートはクライアントサイドのみ（サーバー永続化なし）

## 今後の拡張ポイント
- [ ] 商品検索・フィルタリング機能
- [ ] 商品画像の追加
- [ ] 決済連携（Stripe等）
- [ ] お気に入り機能
- [ ] 管理画面（商品登録・編集）
- [ ] DB連携（商品データの永続化）

---

# task-kanban/ - タスク自走カンバン（別プロジェクト）

`task-kanban/` はこのリポジトリに同居する独立した Vite + React + TypeScript + Tailwind + shadcn/ui + Supabase アプリ。
Fable→Opus→Sonnet の3層でコーディングタスクを自走させる仕組みの土台で、Phase 1（認証＋タスクCRUD＋カンバンUI）まで実装済み。

- コマンドは `task-kanban/` 内で実行：`npm run dev` / `npm run build` / `npm run lint`
- DB スキーマ：`task-kanban/supabase/migrations/`
- 設計計画：`docs/plans/task-kanban-phase-1.md`
- shadcn/ui の部品は `src/components/ui/` に直接置いてある（CLI が使えない環境向けに手動配置）
