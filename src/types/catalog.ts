/** 作品の種類。 */
export const ITEM_KINDS = ["zine", "photobook"] as const;
export type ItemKind = (typeof ITEM_KINDS)[number];

/** 種類の表示ラベル。 */
export const ITEM_KIND_LABEL: Record<ItemKind, string> = {
  zine: "Photo zine",
  photobook: "Photobook",
};

export interface Artist {
  /** URL用スラッグ（例: "aoi-kurata"）。`/artists/[id]` */
  id: string;
  /** ローマ字表記 */
  name: string;
  /** 日本語表記 */
  nameJa?: string;
  /** 拠点（例: "Tokyo"） */
  basedIn: string;
  /** 英語、2〜3文 */
  bio: string;
  website?: string;
  /** ハンドルのみ（@なし） */
  instagram?: string;
  /** `/public` 配下の画像パス */
  portrait?: string;
}

/** 単位: mm */
export interface Size {
  width: number;
  height: number;
}

export interface Edition {
  /** 部数。undefined = 限定なし（オープンエディション） */
  size?: number;
  signed: boolean;
  numbered: boolean;
}

/** 卸条件。undefined = 卸対応なし */
export interface WholesaleTerms {
  /** 1点あたりの卸価格（円） */
  priceJpy: number;
  /** 最低注文数 */
  minQuantity: number;
}

interface ItemBase {
  /** URL用スラッグ。`/items/[id]` */
  id: string;
  artistId: Artist["id"];
  title: string;
  titleJa?: string;
  /** 英語、2〜3文 */
  description: string;
  /** 小売価格（円、整数） */
  priceJpy: number;
  wholesale?: WholesaleTerms;
  edition: Edition;
  /** 在庫数。0 = Sold out */
  stock: number;
  /** 制作・発行年 */
  year: number;
  /** 海外送料の見積もりに使う */
  weightGrams: number;
  /** 先頭が表紙／メイン画像。`/public` 配下のパス */
  images: string[];
  /** 例: "street", "black and white", "landscape" */
  tags: string[];
}

/** 本の仕様。フォトZINE・写真集で共通 */
export interface BookSpec {
  pages: number;
  size: Size;
  binding: "saddle-stitch" | "perfect-bound" | "thread-sewn" | "hardcover" | "other";
  /** 例: "Risograph, 2 colors" / "Offset, 4C" */
  printing: string;
  /** 例: "Japanese / English" */
  language?: string;
}

export interface Item extends ItemBase {
  kind: ItemKind;
  spec: BookSpec;
}

/** 綴じ方の表示ラベル。 */
export const BINDING_LABEL: Record<BookSpec["binding"], string> = {
  "saddle-stitch": "Saddle stitch",
  "perfect-bound": "Perfect bound",
  "thread-sewn": "Thread sewn",
  hardcover: "Hardcover",
  other: "Other",
};
