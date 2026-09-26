// サンプルデータ。実在の作品・作家ではない。
import type { Item, ItemKind } from "@/types/catalog";

export const items: Item[] = [
  {
    id: "quiet-tokyo",
    artistId: "aoi-kurata",
    kind: "zine",
    title: "Quiet Tokyo",
    description:
      "A collection of black and white street photographs taken in Tokyo's quieter back streets. Self-published in a small run.",
    priceJpy: 3200,
    wholesale: { priceJpy: 1900, minQuantity: 5 },
    edition: { signed: true, numbered: false },
    stock: 12,
    year: 2023,
    weightGrams: 180,
    images: ["/images/quiet-tokyo-1.jpg"],
    tags: ["street", "black and white", "tokyo"],
    spec: {
      pages: 64,
      size: { width: 148, height: 210 },
      binding: "saddle-stitch",
      printing: "Risograph, 2 colors",
      language: "Japanese / English",
    },
  },
  {
    id: "still-life-in-transit",
    artistId: "aoi-kurata",
    kind: "zine",
    title: "Still Life in Transit",
    description:
      "Color photographs of small, temporary arrangements found while traveling. Printed in a limited, numbered edition.",
    priceJpy: 2400,
    edition: { size: 150, signed: true, numbered: true },
    stock: 20,
    year: 2022,
    weightGrams: 160,
    images: ["/images/still-life-in-transit-1.jpg"],
    tags: ["still life", "color", "travel"],
    spec: {
      pages: 48,
      size: { width: 148, height: 210 },
      binding: "saddle-stitch",
      printing: "Offset, 4C",
    },
  },
  {
    id: "silver-hour",
    artistId: "aoi-kurata",
    kind: "print",
    title: "Silver Hour",
    description:
      "An archival pigment print capturing Tokyo Bay just after sunset. Printed on fine art paper in a limited edition.",
    priceJpy: 24000,
    edition: { size: 20, signed: true, numbered: true },
    stock: 5,
    year: 2023,
    weightGrams: 450,
    images: ["/images/silver-hour-1.jpg"],
    tags: ["landscape", "color"],
    spec: {
      paper: "Hahnemühle Photo Rag 308gsm",
      process: "Archival pigment print",
      size: { width: 305, height: 406 },
      imageSize: { width: 254, height: 305 },
    },
  },
  {
    id: "harbor-light",
    artistId: "ren-hoshino",
    kind: "zine",
    title: "Harbor Light",
    description:
      "Black and white photographs of Osaka's working harbor at night. Hoshino's longest-running zine, now in its third printing.",
    priceJpy: 4500,
    wholesale: { priceJpy: 2700, minQuantity: 5 },
    edition: { signed: false, numbered: false },
    stock: 30,
    year: 2021,
    weightGrams: 220,
    images: ["/images/harbor-light-1.jpg"],
    tags: ["harbor", "night", "black and white"],
    spec: {
      pages: 80,
      size: { width: 148, height: 210 },
      binding: "perfect-bound",
      printing: "Offset, 1 color",
      language: "Japanese",
    },
  },
  {
    id: "night-bus",
    artistId: "ren-hoshino",
    kind: "zine",
    title: "Night Bus",
    description:
      "A photo essay following an overnight bus route between Osaka and Fukuoka. This edition is currently sold out.",
    priceJpy: 1800,
    edition: { size: 300, signed: false, numbered: false },
    stock: 0,
    year: 2020,
    weightGrams: 140,
    images: ["/images/night-bus-1.jpg"],
    tags: ["night", "street", "black and white"],
    spec: {
      pages: 36,
      size: { width: 148, height: 210 },
      binding: "saddle-stitch",
      printing: "Risograph, 1 color",
    },
  },
  {
    id: "coastline",
    artistId: "ren-hoshino",
    kind: "print",
    title: "Coastline",
    description:
      "A gelatin silver print of the Seto Inland Sea coastline, hand-printed in a small darkroom edition.",
    priceJpy: 32000,
    edition: { size: 15, signed: true, numbered: true },
    stock: 3,
    year: 2019,
    weightGrams: 500,
    images: ["/images/coastline-1.jpg"],
    tags: ["coastline", "landscape", "black and white"],
    spec: {
      paper: "Ilford Galerie Prestige Gold Fibre Silk",
      process: "Gelatin silver print",
      size: { width: 280, height: 356 },
      imageSize: { width: 203, height: 254 },
    },
  },
  {
    id: "everyday-fukuoka",
    artistId: "mio-takase",
    kind: "zine",
    title: "Everyday Fukuoka",
    description:
      "Warm, candid color photographs of daily life in Fukuoka. An open edition, hand-assembled in small batches.",
    priceJpy: 2200,
    edition: { signed: false, numbered: false },
    stock: 18,
    year: 2024,
    weightGrams: 170,
    images: ["/images/everyday-fukuoka-1.jpg"],
    tags: ["everyday", "color", "fukuoka"],
    spec: {
      pages: 52,
      size: { width: 148, height: 210 },
      binding: "saddle-stitch",
      printing: "Offset, 2 colors",
      language: "Japanese / English",
    },
  },
  {
    id: "paper-trail",
    artistId: "mio-takase",
    kind: "zine",
    title: "Paper Trail",
    description:
      "A portrait series following the same subjects over several years. Thread-sewn binding in a signed, limited edition.",
    priceJpy: 3800,
    edition: { size: 80, signed: true, numbered: false },
    stock: 10,
    year: 2022,
    weightGrams: 190,
    images: ["/images/paper-trail-1.jpg"],
    tags: ["portrait", "color"],
    spec: {
      pages: 60,
      size: { width: 148, height: 210 },
      binding: "thread-sewn",
      printing: "Offset, 4C",
    },
  },
];

export function getItemById(id: string): Item | undefined {
  return items.find((i) => i.id === id);
}

export function getItemsByArtist(artistId: string): Item[] {
  return items.filter((i) => i.artistId === artistId);
}

export function getItemsByKind(kind: ItemKind): Item[] {
  return items.filter((i) => i.kind === kind);
}

export function isWholesaleAvailable(item: Item): boolean {
  return item.wholesale !== undefined;
}
