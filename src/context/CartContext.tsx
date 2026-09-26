"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { getProductById } from "@/data/products";
import type { Product } from "@/types/product";

/** 内部状態。商品IDだけ持ち、商品情報は表示時に引く（価格改定や保存への対応が楽になる） */
interface CartEntry {
  productId: string;
  quantity: number;
}

/** 画面側に渡す形。商品情報を解決済み */
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CartEntry[]>([]);

  const addToCart = (product: Product) => {
    setEntries((prev) => {
      const existing = prev.find((e) => e.productId === product.id);
      if (existing) {
        return prev.map((e) =>
          e.productId === product.id ? { ...e, quantity: e.quantity + 1 } : e
        );
      }
      return [...prev, { productId: product.id, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setEntries((prev) => prev.filter((e) => e.productId !== productId));
  };

  const clearCart = () => setEntries([]);

  // 商品データ側から消えた商品はカートに出さない
  const items = useMemo<CartItem[]>(
    () =>
      entries.flatMap((e) => {
        const product = getProductById(e.productId);
        return product ? [{ product, quantity: e.quantity }] : [];
      }),
    [entries]
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
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
