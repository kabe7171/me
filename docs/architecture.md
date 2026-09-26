# アーキテクチャ設計メモ

## ページ構成

| ページ | パス | レンダリング | 説明 |
|--------|------|-------------|------|
| トップ | `/` | Static (SSG) | 作品一覧をグリッド表示 |
| 作品詳細 | `/items/[id]` | SSG (generateStaticParams) | 作品の詳細情報・カート追加 |
| 作家詳細 | `/artists/[id]` | SSG (generateStaticParams) | 作家情報・その作家の作品一覧 |
| 卸のご案内 | `/wholesale` | Client | 卸の説明・問い合わせフォーム送信 |
| カート | `/cart` | Client | カート内容の表示・削除 |
| お問い合わせ | `/contact` | Client | フォーム送信 |

## データフロー

```
artists.ts / items.ts (静的データ)
  ├── page.tsx (トップ) → ItemCard → Link → 詳細ページ
  ├── items/[id]/page.tsx (詳細) → AddToCartButton → CartContext
  ├── artists/[id]/page.tsx (作家詳細) → ItemCard
  └── cart/page.tsx → CartContext (表示・削除)
```

## 設計判断
- **SSG優先**: 作品データが静的なため、トップ・詳細はSSGで高速表示
- **Context for Cart**: 小規模なのでRedux等は不要、React Contextで十分
- **Server/Client分離**: AddToCartButton のみ "use client" で分離し、作品詳細ページ本体はServer Component

## カラースキーム
- `stone-800` / `stone-50`: 落ち着いた紙・写真集のイメージ
- `amber-700`: アクセント（CTA、作家名表示）
