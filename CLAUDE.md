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
│   └── CartContext.tsx  # カート状態（商品IDと数量だけ保持）
├── types/           # 型定義
│   └── product.ts   # Product / Category / Dimensions、CATEGORIES 定数
├── lib/             # 純粋な補助関数
│   └── format.ts    # 価格・寸法の表示整形
└── data/            # データ層
    └── products.ts  # 商品データ・検索ヘルパー
```

## データ構造のルール
- カテゴリは `src/types/product.ts` の `CATEGORIES` に追加する（自由入力にしない）
- 寸法・産地・素材は `details` の文章に埋めず、専用フィールドに入れる
- 価格は税込の円を整数で持つ。表示は `formatPrice` を通す
- カートは商品IDと数量だけを保持し、商品情報は `getProductById` で引く

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
