# Photo Zines from Japan - 日本の写真ZINE・作品販売サイト

日本の写真家によるZINE（写真集）・プリント作品を海外の個人購入者・書店向けにオンラインで販売するWebサイトです。

## 機能

- 作品一覧表示（Zine / Print）
- 作品詳細ページ（作家・仕様・エディション・価格）
- 作家詳細ページ
- 卸のご案内・問い合わせフォーム
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

`src/data/items.ts` を編集して作品を追加・変更できます。

```typescript
{
  id: "quiet-tokyo",
  artistId: "aoi-kurata",   // src/data/artists.ts の作家 id
  kind: "zine",
  title: "Quiet Tokyo",
  description: "A collection of black and white street photographs...",
  priceJpy: 3200,            // 小売価格（円、整数）
  wholesale: { priceJpy: 1900, minQuantity: 5 }, // 卸対応なしなら省略
  edition: { signed: true, numbered: false },     // size省略でオープンエディション
  stock: 12,                 // 0 = Sold out
  year: 2023,
  weightGrams: 180,          // 海外送料の見積もりに使う
  images: ["/images/quiet-tokyo-1.jpg"],
  tags: ["street", "black and white", "tokyo"],
  spec: {
    pages: 64,
    size: { width: 148, height: 210 }, // mm
    binding: "saddle-stitch",
    printing: "Risograph, 2 colors",
    language: "Japanese / English",
  },
}
```

作家を増やすときは `src/data/artists.ts` に、種類を増やすときは `src/types/catalog.ts` の `ITEM_KINDS` に追加してください。

## 技術スタック

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS

## ドキュメント

- [アーキテクチャ設計](docs/architecture.md)
- [開発スキル・ナレッジ集](docs/skills.md)
