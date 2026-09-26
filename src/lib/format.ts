import type { Dimensions } from "@/types/product";

/** 円表示。サーバーとクライアントで結果がずれないよう locale を固定する */
export function formatPrice(price: number): string {
  return `¥${price.toLocaleString("ja-JP")}`;
}

/** 例: "幅210cm × 奥行85cm × 高さ75cm" */
export function formatDimensions(d: Dimensions): string {
  const parts: string[] = [];
  if (d.diameter !== undefined) parts.push(`直径${d.diameter}cm`);
  if (d.width !== undefined) parts.push(`幅${d.width}cm`);
  if (d.depth !== undefined) parts.push(`奥行${d.depth}cm`);
  if (d.height !== undefined) parts.push(`高さ${d.height}cm`);
  if (d.seatHeight !== undefined) parts.push(`座面高${d.seatHeight}cm`);
  return parts.join(" × ");
}
