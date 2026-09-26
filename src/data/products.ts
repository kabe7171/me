import { CATEGORIES, type Category, type Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "ヴィクトリアン チェスターフィールド ソファ",
    description: "19世紀英国製の本革チェスターフィールドソファ。深みのあるブラウンレザーとボタン留めが特徴。",
    details: "オリジナルのコイルスプリングを使用。革は経年変化により美しいパティナが出ています。英国バーミンガムの工房にて修復済み。",
    price: 580000,
    category: "ソファ",
    era: "1880年代",
    origin: "イギリス",
    material: "本革（ブラウンレザー）",
    dimensions: { width: 210, depth: 85, height: 75 },
    image: "/images/sofa.jpg",
  },
  {
    id: "2",
    name: "アールデコ ドレッシングテーブル",
    description: "1930年代フランス製のウォールナット材ドレッシングテーブル。三面鏡付き。",
    details: "ウォールナット材の美しい木目。引き出し3杯、オリジナルの真鍮金具。高さは三面鏡を含む寸法です。フランス・パリ近郊で買い付け。",
    price: 320000,
    category: "テーブル",
    era: "1930年代",
    origin: "フランス",
    material: "ウォールナット材",
    dimensions: { width: 120, depth: 50, height: 150 },
    image: "/images/dresser.jpg",
  },
  {
    id: "3",
    name: "明治期 和箪笥",
    description: "明治時代の桐箪笥。繊細な金具装飾と美しい桐の木目が魅力。",
    details: "総桐造り。オリジナルの鉄金具。引き出し5段。状態良好、実用可能。",
    price: 250000,
    category: "収納",
    era: "明治時代",
    origin: "日本",
    material: "桐",
    dimensions: { width: 90, depth: 45, height: 110 },
    image: "/images/tansu.jpg",
  },
  {
    id: "4",
    name: "ジョージアン マホガニー ブックケース",
    description: "18世紀英国のマホガニー製ガラス扉付きブックケース。貴重なアンティーク。",
    details: "上部ガラス扉2枚、下部木製扉2枚。棚板調節可能。英国サフォーク州の邸宅より。",
    price: 750000,
    category: "収納",
    era: "1780年代",
    origin: "イギリス",
    material: "マホガニー無垢材",
    dimensions: { width: 130, depth: 40, height: 220 },
    image: "/images/bookcase.jpg",
  },
  {
    id: "5",
    name: "ミッドセンチュリー チーク ダイニングチェア",
    description: "1960年代デンマーク製のチーク材ダイニングチェア。4脚セット。",
    details: "座面は新しいファブリックに張り替え済み。4脚セットでの販売。寸法は1脚あたり。",
    price: 180000,
    category: "チェア",
    era: "1960年代",
    origin: "デンマーク",
    material: "チーク無垢材",
    dimensions: { width: 48, depth: 52, height: 80, seatHeight: 45 },
    image: "/images/chair.jpg",
  },
  {
    id: "6",
    name: "アンティーク 真鍮シャンデリア",
    description: "19世紀フランス製の真鍮とクリスタルのシャンデリア。8灯。",
    details: "真鍮フレームにカットクリスタルのドロップ。電気配線は日本規格に変換済み。LED電球対応。",
    price: 420000,
    category: "照明",
    era: "1870年代",
    origin: "フランス",
    material: "真鍮・クリスタル",
    dimensions: { diameter: 70, height: 90 },
    image: "/images/chandelier.jpg",
  },
];

/** 商品が1件以上あるカテゴリだけを、CATEGORIES の順で返す */
export function getActiveCategories(): Category[] {
  return CATEGORIES.filter((c) => products.some((p) => p.category === c));
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}
