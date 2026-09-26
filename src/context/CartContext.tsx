"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { getItemById } from "@/data/items";
import type { Item } from "@/types/catalog";

/** 内部状態。作品IDだけ持ち、作品情報は表示時に引く（価格改定や保存への対応が楽になる） */
interface CartEntry {
  itemId: string;
  quantity: number;
}

/** 画面側に渡す形。作品情報を解決済み */
export interface CartItem {
  item: Item;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CartEntry[]>([]);

  const addToCart = (item: Item) => {
    setEntries((prev) => {
      const existing = prev.find((e) => e.itemId === item.id);
      const currentQuantity = existing?.quantity ?? 0;
      // 在庫数を超えて数量を増やさない
      if (currentQuantity >= item.stock) {
        return prev;
      }
      if (existing) {
        return prev.map((e) =>
          e.itemId === item.id ? { ...e, quantity: e.quantity + 1 } : e
        );
      }
      return [...prev, { itemId: item.id, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setEntries((prev) => prev.filter((e) => e.itemId !== itemId));
  };

  const clearCart = () => setEntries([]);

  // 商品データ側から消えた作品はカートに出さない
  const items = useMemo<CartItem[]>(
    () =>
      entries.flatMap((e) => {
        const item = getItemById(e.itemId);
        return item ? [{ item, quantity: e.quantity }] : [];
      }),
    [entries]
  );

  const totalItems = items.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalPrice = items.reduce(
    (sum, entry) => sum + entry.item.priceJpy * entry.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
