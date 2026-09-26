import type { Edition, Size } from "@/types/catalog";
import { USD_PER_JPY } from "@/lib/currency";

/** 円表示。locale は "en-US" 固定（海外向けサイトのため） */
export function formatJpy(priceJpy: number): string {
  return `¥${priceJpy.toLocaleString("en-US")}`;
}

/** 米ドル参考額。USD_PER_JPY で換算し、小数なしで四捨五入する */
export function formatUsdApprox(priceJpy: number): string {
  const usd = Math.round(priceJpy * USD_PER_JPY);
  return `≈ $${usd.toLocaleString("en-US")}`;
}

/** 例: "¥3,200 (≈ $21)" */
export function formatPrice(priceJpy: number): string {
  return `${formatJpy(priceJpy)} (${formatUsdApprox(priceJpy)})`;
}

/** 例: "148 × 210 mm" */
export function formatSize(size: Size): string {
  return `${size.width} × ${size.height} mm`;
}

/** 例: "Edition of 100, signed & numbered" / "Open edition" / "Edition of 50, signed" */
export function formatEdition(edition: Edition): string {
  const base = edition.size !== undefined ? `Edition of ${edition.size}` : "Open edition";
  const marks: string[] = [];
  if (edition.signed) marks.push("signed");
  if (edition.numbered) marks.push("numbered");
  if (marks.length === 0) return base;
  return `${base}, ${marks.join(" & ")}`;
}
