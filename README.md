# Antique Gallery - アンティーク家具販売サイト

ヨーロッパ・日本のアンティーク家具をオンラインで販売するWebサイトです。

## 機能

- 商品一覧表示（カテゴリ分類）
- 商品詳細ページ（年代・サイズ・説明）
- ショッピングカート
- お問い合わせフォーム

## 使い方

### セットアップ

```bash
git clone https://github.com/kabe7171/me.git
cd me
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

`http://localhost:3000` でサイトを確認できます。

### ビルド

```bash
npm run build
npm start
```

### 商品データの編集

`src/data/products.ts` を編集して商品を追加・変更できます。

```typescript
{
  id: "7",
  name: "商品名",
  description: "一覧に出す短い紹介文",
  details: "詳細ページに出す補足説明",
  price: 100000,            // 税込・円
  category: "収納",          // src/types/product.ts の CATEGORIES から選ぶ
  era: "1900年代",
  origin: "イギリス",
  material: "オーク材",
  dimensions: { width: 100, depth: 50, height: 80 }, // cm
  image: "/images/xxx.jpg",
}
```

カテゴリを増やすときは `src/types/product.ts` の `CATEGORIES` に追加してください。

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS

## ドキュメント

- [アーキテクチャ設計](docs/architecture.md)
- [開発スキル・ナレッジ集](docs/skills.md)
