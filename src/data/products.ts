export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  era: string;
  image: string;
  details: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "ヴィクトリアン チェスターフィールド ソファ",
    description: "19世紀英国製の本革チェスターフィールドソファ。深みのあるブラウンレザーとボタン留めが特徴。",
    price: 580000,
    category: "ソファ",
    era: "1880年代",
    image: "/images/sofa.jpg",
    details: "幅210cm × 奥行85cm × 高さ75cm。オリジナルのコイルスプリングを使用。革は経年変化により美しいパティナが出ています。英国バーミンガムの工房にて修復済み。",
  },
  {
    id: "2",
    name: "アールデコ ドレッシングテーブル",
    description: "1930年代フランス製のウォールナット材ドレッシングテーブル。三面鏡付き。",
    price: 320000,
    category: "テーブル",
    era: "1930年代",
    image: "/images/dresser.jpg",
    details: "幅120cm × 奥行50cm × 高さ150cm（鏡含む）。ウォールナット材の美しい木目。引き出し3杯、オリジナルの真鍮金具。フランス・パリ近郊で買い付け。",
  },
  {
    id: "3",
    name: "明治期 和箪笥",
    description: "明治時代の桐箪笥。繊細な金具装飾と美しい桐の木目が魅力。",
    price: 250000,
    category: "収納",
    era: "明治時代",
    image: "/images/tansu.jpg",
    details: "幅90cm × 奥行45cm × 高さ110cm。総桐造り。オリジナルの鉄金具。引き出し5段。状態良好、実用可能。",
  },
  {
    id: "4",
    name: "ジョージアン マホガニー ブックケース",
    description: "18世紀英国のマホガニー製ガラス扉付きブックケース。貴重なアンティーク。",
    price: 750000,
    category: "収納",
    era: "1780年代",
    image: "/images/bookcase.jpg",
    details: "幅130cm × 奥行40cm × 高さ220cm。上部ガラス扉2枚、下部木製扉2枚。マホガニー無垢材。棚板調節可能。英国サフォーク州の邸宅より。",
  },
  {
    id: "5",
    name: "ミッドセンチュリー チーク ダイニングチェア",
    description: "1960年代デンマーク製のチーク材ダイニングチェア。4脚セット。",
    price: 180000,
    category: "チェア",
    era: "1960年代",
    image: "/images/chair.jpg",
    details: "幅48cm × 奥行52cm × 高さ80cm × 座面高45cm。チーク無垢材。座面は新しいファブリックに張り替え済み。4脚セットでの販売。",
  },
  {
    id: "6",
    name: "アンティーク 真鍮シャンデリア",
    description: "19世紀フランス製の真鍮とクリスタルのシャンデリア。8灯。",
    price: 420000,
    category: "照明",
    era: "1870年代",
    image: "/images/chandelier.jpg",
    details: "直径70cm × 高さ90cm。真鍮フレームにカットクリスタルのドロップ。電気配線は日本規格に変換済み。LED電球対応。",
  },
];

export const categories = [...new Set(products.map((p) => p.category))];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return `¥${price.toLocaleString()}`;
}
