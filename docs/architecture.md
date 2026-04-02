# アーキテクチャ設計メモ

## ページ構成

| ページ | パス | レンダリング | 説明 |
|--------|------|-------------|------|
| トップ | `/` | Static (SSG) | 商品一覧をグリッド表示 |
| 商品詳細 | `/products/[id]` | SSG (generateStaticParams) | 商品の詳細情報・カート追加 |
| カート | `/cart` | Client | カート内容の表示・削除 |
| お問い合わせ | `/contact` | Client | フォーム送信 |

## データフロー

```
products.ts (静的データ)
  ├── page.tsx (トップ) → ProductCard → Link → 詳細ページ
  ├── products/[id]/page.tsx (詳細) → AddToCartButton → CartContext
  └── cart/page.tsx → CartContext (表示・削除)
```

## 設計判断
- **SSG優先**: 商品データが静的なため、トップ・詳細はSSGで高速表示
- **Context for Cart**: 小規模なのでRedux等は不要、React Contextで十分
- **Server/Client分離**: AddToCartButton のみ "use client" で分離し、商品詳細ページ本体はServer Component

## カラースキーム
- `stone-800` / `stone-50`: 落ち着いたアンティーク調
- `amber-700`: アクセント（CTA、年代表示）
- アンティーク家具のイメージに合う、温かみのある配色
