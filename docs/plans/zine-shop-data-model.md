# 計画: アンティーク家具サイトを「日本の写真ZINE・作品の海外販売サイト」に作り替える（データ層 + ページ配線）

> メモ（2026-09-29）: その後、扱う作品をフォトZINEと写真集に絞った。`print` は `photobook` に置き換え、`ZineItem` / `PrintItem` は `Item` + `BookSpec` に1本化済み。この計画は当時の記録として残す。

## 役割
あなたは実装担当。設計は完了済み。設計意図は疑わず、**現行コードは自分で読んで**正確に反映する。
現行コードが前提と食い違う、または判断できない場合は推測せず STOP して「何が食い違ったか・選択肢・推奨案」を報告する。

## 読み込むファイル（すべて自分で読むこと）
- CLAUDE.md, README.md
- src/types/product.ts, src/data/products.ts, src/lib/format.ts
- src/context/CartContext.tsx
- src/components/Header.tsx, Footer.tsx, ProductCard.tsx
- src/app/layout.tsx, page.tsx, cart/page.tsx, contact/page.tsx
- src/app/products/[id]/page.tsx, products/[id]/AddToCartButton.tsx

## タスク
商品モデルを「アンティーク家具」から「作家（写真家）と作品（ZINE／プリント）」に置き換え、
海外の個人購入者向けの小売と、海外の小売店向けの卸の両方を前提にしたデータ層を作る。
UIの見た目（配色・レイアウト）は今回変えない。文言は英語にする（海外購入者向けサイトのため）。

## 前提（設計で決めた仮定。コード内コメントに「仮」と明記する）
- 価格は日本円の整数で持つ。表示は「¥3,200 (≈ $21)」のように円 + 米ドル参考額。為替は定数（参考値）。
- 卸は「サイト上で決済しない」。卸価格と最低数量をデータに持ち、卸ページから問い合わせフォームで受ける。
- 作家名・作品はすべて架空のサンプルデータ。実在の人物を書かない。
- サイト名は仮。1か所（src/lib/site.ts）で変えられるようにする。

## 変更詳細

### 1. 型定義 `src/types/catalog.ts`（新規） — `src/types/product.ts` は削除
```ts
export const ITEM_KINDS = ["zine", "print"] as const;
export type ItemKind = (typeof ITEM_KINDS)[number];
export const ITEM_KIND_LABEL: Record<ItemKind, string> = { zine: "Zine", print: "Print" };

export interface Artist {
  id: string;            // URL用スラッグ（例: "aoi-kurata"）
  name: string;          // ローマ字表記
  nameJa?: string;       // 日本語表記
  basedIn: string;       // 拠点（例: "Tokyo"）
  bio: string;           // 英語、2〜3文
  website?: string;
  instagram?: string;    // ハンドルのみ（@なし）
  portrait?: string;     // /public 配下の画像パス
}

/** 単位: mm */
export interface Size { width: number; height: number; }

export interface Edition {
  size?: number;         // 部数。undefined = 限定なし（オープンエディション）
  signed: boolean;
  numbered: boolean;
}

/** 卸条件。undefined = 卸対応なし */
export interface WholesaleTerms {
  priceJpy: number;      // 1点あたりの卸価格
  minQuantity: number;   // 最低注文数
}

interface ItemBase {
  id: string;            // URL用スラッグ
  artistId: Artist["id"];
  title: string;
  titleJa?: string;
  description: string;   // 英語、2〜3文
  priceJpy: number;      // 小売価格（円、整数）
  wholesale?: WholesaleTerms;
  edition: Edition;
  stock: number;         // 在庫数。0 = Sold out
  year: number;          // 制作・発行年
  weightGrams: number;   // 海外送料の見積もりに使う
  images: string[];      // 先頭が表紙／メイン画像。/public 配下のパス
  tags: string[];        // 例: "street", "black and white", "landscape"
}

export interface ZineItem extends ItemBase {
  kind: "zine";
  spec: {
    pages: number;
    size: Size;
    binding: "saddle-stitch" | "perfect-bound" | "thread-sewn" | "other";
    printing: string;    // 例: "Risograph, 2 colors" / "Offset, 4C"
    language?: string;   // 例: "Japanese / English"
  };
}

export interface PrintItem extends ItemBase {
  kind: "print";
  spec: {
    paper: string;       // 例: "Hahnemühle Photo Rag 308gsm"
    process: string;     // 例: "Archival pigment print" / "Gelatin silver print"
    size: Size;          // 用紙サイズ
    imageSize?: Size;    // 画像部分のサイズ
  };
}

export type Item = ZineItem | PrintItem;
```
各フィールドに上記程度の JSDoc を付ける。

### 2. 表示整形 `src/lib/format.ts`（書き換え）
- `formatJpy(priceJpy)` → `"¥3,200"`（locale "en-US" 固定。海外向けサイトなので）
- `formatUsdApprox(priceJpy)` → `"≈ $21"`（`src/lib/currency.ts` の `USD_PER_JPY` 定数で換算。小数なし、四捨五入）
- `formatPrice(priceJpy)` → `"¥3,200 (≈ $21)"`（上2つを結合）
- `formatSize(size: Size)` → `"148 × 210 mm"`
- `formatEdition(edition)` → `"Edition of 100, signed & numbered"` / `"Open edition"` / `"Edition of 50, signed"` など、条件で組み立てる
- 既存の `formatDimensions` は削除

### 3. 為替定数 `src/lib/currency.ts`（新規）
```ts
/** 参考表示用の為替（仮）。決済は円建て。定期的に手で更新する */
export const USD_PER_JPY = 1 / 150;
```

### 4. サイト定数 `src/lib/site.ts`（新規）
```ts
export const SITE_NAME = "Photo Zines from Japan"; // 仮のサイト名
export const SITE_TAGLINE = "Self-published photo zines and prints by independent photographers in Japan. Shipped worldwide.";
```

### 5. データ `src/data/artists.ts`（新規）と `src/data/items.ts`（新規） — `src/data/products.ts` は削除
- artists: 架空の作家3人。id は "aoi-kurata", "ren-hoshino", "mio-takase"。拠点は Tokyo / Osaka / Fukuoka。bio は英語で2〜3文。ファイル先頭に「サンプルデータ。実在の人物ではない」とコメント。
- items: 8点（zine 6点、print 2点）。作家ごとに2〜3点。価格の目安（仮）: zine ¥1,800〜¥4,500、print ¥18,000〜¥38,000。
  - zine のうち2点に `wholesale: { priceJpy: 小売の60%を切り捨てて100円単位, minQuantity: 5 }` を付ける。残りは wholesale なし。
  - 1点は `stock: 0`（Sold out の表示確認用）。
  - edition は限定あり／なし、signed／numbered を混ぜる。
  - images は `/images/<item-id>-1.jpg` 形式のパス（実ファイルは置かない。現状どおりプレースホルダー表示）。
- ヘルパー（`src/data/items.ts` 内）:
  - `getItemById(id)`, `getItemsByArtist(artistId)`, `getItemsByKind(kind)`
  - `getArtistById(id)`（artists.ts）
  - `isWholesaleAvailable(item)` → `item.wholesale !== undefined`

### 6. カート `src/context/CartContext.tsx`
- `Product` → `Item`、`productId` → `itemId`、`getProductById` → `getItemById` に置き換え。
- `addToCart(item)` は `stock` を超えて数量を増やさない（上限に達したら何もしない）。
- `items` の解決ロジック（データ側に無い商品は出さない）は維持。

### 7. ページ・部品
- `src/components/ProductCard.tsx` → `src/components/ItemCard.tsx` にリネーム。表示: 画像枠（プレースホルダー文字は kind ラベル）、作家名（小さく）、タイトル、`formatEdition`、価格。`stock === 0` なら価格の代わりに "Sold out"。リンク先 `/items/[id]`。
- `src/app/page.tsx`: 見出しは `SITE_NAME`、副文は `SITE_TAGLINE`。カテゴリチップは kind（"All / Zines / Prints"）にする。チップは表示のみでよい（絞り込みは今回やらない）。全 items をグリッド表示。
- `src/app/products/[id]/` → `src/app/items/[id]/` に移動。詳細ページの仕様欄は kind で分岐:
  - zine: Artist（作家ページへのリンク）/ Year / Pages / Size / Binding / Printing / Language(あれば) / Edition / Weight
  - print: Artist / Year / Process / Paper / Paper size / Image size(あれば) / Edition / Weight
  - `wholesale` があれば "Wholesale available — min. N copies" と `/wholesale` へのリンクを出す。
  - `stock === 0` なら AddToCartButton の代わりに "Sold out" を出す。
  - `generateStaticParams` は items から生成。
- `src/app/artists/[id]/page.tsx`（新規）: 作家名・拠点・bio・website/instagram リンク、その作家の作品グリッド（ItemCard 再利用）。`generateStaticParams` は artists から。存在しなければ `notFound()`。
- `src/app/wholesale/page.tsx`（新規、client component）: 卸の説明（英語、3〜4文。対象は海外の書店・セレクトショップ、最低数量は作品ごと、送料は実費、支払い条件は要相談、と仮で書く）+ 問い合わせフォーム（Shop name / Country / Email / Website or Instagram / Which titles & quantities / Message）。送信は contact と同じくクライアント側で「送信完了」表示のみ。
- `src/app/cart/page.tsx`, `src/app/contact/page.tsx`, `src/components/Header.tsx`, `Footer.tsx`, `src/app/layout.tsx`: 文言を英語にする。Header のナビは "Zines & Prints / Artists（今回は `/` へのリンクでよい）/ Wholesale / Contact / Cart"。`layout.tsx` の `lang` は "en"、metadata は `SITE_NAME` と `SITE_TAGLINE` を使う。
- カート行には作家名とタイトルを出す。数量表示は維持。

### 8. ドキュメント
- CLAUDE.md: プロジェクト概要・ディレクトリ構成・「データ構造のルール」を新モデルに合わせて書き換える（アンティークの記述は全部消す）。「今後の拡張ポイント」は次に置き換える: 決済（Stripe、円建て）/ 卸アカウント（承認制ログイン）/ 海外送料の自動計算（weightGrams を使う）/ 商品画像 / 絞り込み（作家・種類・タグ）/ DB連携。
- README.md: 同様に書き換え。「商品データの編集」の例は items.ts の ZineItem 1件分にする。

## 制約
- 見た目（Tailwind のクラス、配色、レイアウト）は既存のものを流用する。新規ページも既存ページと同じ雰囲気で組む。デザイン変更は別タスク。
- 指示外のリファクタはしない。
- `npm run lint` と `npx tsc --noEmit` と `npm run build` を通す。

## エッジケース
- カートに入れた後に stock を超える数量にならないこと。
- 存在しない item / artist の URL は 404。
- `wholesale` 未設定の商品では卸の表示が一切出ない。
- `edition.size` 未設定のときは "Open edition"。

## 完了条件
- `npm run lint`、`npx tsc --noEmit`、`npm run build` がすべて成功する。
- `/`、`/items/<各id>`、`/artists/<各id>`、`/wholesale`、`/cart`、`/contact` がビルドされる。
- src/types/product.ts と src/data/products.ts と src/app/products/ が残っていない。
- リポジトリ内に「アンティーク」「Antique」「家具」の文字列が残っていない（`git grep` で確認。docs/plans/ 配下は除く）。

## 出力方法
ファイルを直接編集する。最後に「変更したファイル一覧」と「完了条件のチェック結果」を短く報告する。
