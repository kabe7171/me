# Photo Zines & Photobooks from Japan - 日本のフォトZINE・写真集販売サイト

## プロジェクト概要
日本の写真家によるフォトZINE・写真集を海外向けに販売するサイト。扱うのは写真の本だけ（プリント単体や写真以外のZINEは扱わない）。個人向け小売と、海外の書店・セレクトショップ向け卸の両方を想定。
Next.js (App Router) + TypeScript + Tailwind CSS で構築。UI文言は英語（海外購入者向けサイトのため）。

## 技術スタック
- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React Context (カート)

## ディレクトリ構成
```
src/
├── app/                 # ページ (App Router)
│   ├── page.tsx         # トップ（作品一覧）
│   ├── items/[id]/      # 作品詳細
│   ├── artists/[id]/    # 作家詳細
│   ├── wholesale/       # 卸のご案内・問い合わせ
│   ├── cart/            # カートページ
│   └── contact/         # お問い合わせ
├── components/          # 共通コンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ItemCard.tsx
├── context/             # React Context
│   └── CartContext.tsx  # カート状態（作品IDと数量だけ保持）
├── types/               # 型定義
│   └── catalog.ts       # Item / BookSpec / Artist / Edition / ItemKind
├── lib/                 # 純粋な補助関数
│   ├── format.ts        # 価格・サイズ・エディション表記の整形
│   ├── currency.ts      # 米ドル参考表示用の為替定数（仮）
│   └── site.ts          # サイト名・タグライン（仮）
└── data/                # データ層
    ├── artists.ts        # 作家データ（架空のサンプル）・検索ヘルパー
    └── items.ts          # 作品データ（架空のサンプル）・検索ヘルパー
```

## データ構造のルール
- 作品の種類（zine = フォトZINE / photobook = 写真集）は `src/types/catalog.ts` の `ITEM_KINDS` に追加する（自由入力にしない）
- 寸法・仕様は `spec`（`BookSpec`、ZINE・写真集で共通）の専用フィールドに入れる。文章に埋め込まない
- 価格は日本円の整数で持つ（`priceJpy`）。表示は `formatPrice`（円 + 米ドル参考額）を通す。為替は `src/lib/currency.ts` の定数（仮の参考値、決済は円建て）
- 卸価格・最低数量は `wholesale`（`WholesaleTerms`）に持つ。卸はサイト上で決済せず、`/wholesale` の問い合わせフォームで受ける
- カートは作品IDと数量だけを保持し、作品情報は `getItemById` で引く。`addToCart` は在庫数（`stock`）を超えて数量を増やさない
- 作家名・作品はすべて架空のサンプルデータ（`src/data/artists.ts`, `src/data/items.ts` 参照）

## コマンド
- `npm run dev` - 開発サーバー起動
- `npm run build` - 本番ビルド
- `npm run lint` - ESLint 実行

## 開発メモ
- この環境では Google Fonts が取得できないため、システムフォントを使用
- 作品画像はプレースホルダー表示（`/images/` 配下に配置想定）
- カートはクライアントサイドのみ（サーバー永続化なし）
- サイト名は仮。`src/lib/site.ts` の1か所で変更できる

## 今後の拡張ポイント
- [ ] 決済連携（Stripe等、円建て）
- [ ] 卸アカウント（承認制ログイン）
- [ ] 海外送料の自動計算（`weightGrams` を使う）
- [ ] 商品画像の追加
- [ ] 絞り込み（作家・種類・タグ）
- [ ] DB連携（作品データの永続化）
