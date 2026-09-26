/**
 * 商品カテゴリ。表示順もこの配列の順番に従う。
 * 新しいカテゴリを追加するときはここに足す（自由入力にすると表記ゆれが出るため）。
 */
export const CATEGORIES = ["ソファ", "チェア", "テーブル", "収納", "照明"] as const;

export type Category = (typeof CATEGORIES)[number];

/** 寸法（単位: cm）。家具の形によって使う項目が変わるので全て省略可。 */
export interface Dimensions {
  width?: number;
  depth?: number;
  height?: number;
  /** シャンデリアやラウンドテーブルなど円形のもの */
  diameter?: number;
  /** チェア類の座面高 */
  seatHeight?: number;
}

export interface Product {
  /** URL に使う識別子。`/products/[id]` */
  id: string;
  name: string;
  /** 一覧カードに出す短い紹介文（2行程度） */
  description: string;
  /** 詳細ページに出す補足説明。寸法・産地・素材は専用フィールドに入れる */
  details: string;
  /** 税込価格（円） */
  price: number;
  category: Category;
  /** 表示用の年代。例: "1880年代", "明治時代" */
  era: string;
  /** 産地・国 */
  origin: string;
  /** 主な素材 */
  material: string;
  dimensions: Dimensions;
  /** `/public` 配下の画像パス。現状はプレースホルダー表示 */
  image: string;
}
