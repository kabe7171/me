"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="font-serif text-2xl text-stone-800 mb-4">ショッピングカート</h1>
        <p className="text-stone-500 mb-6">カートに商品がありません。</p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
        >
          商品一覧へ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-serif text-2xl text-stone-800 mb-8">ショッピングカート</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
          >
            <div className="flex-1">
              <h3 className="font-serif text-stone-800">{item.product.name}</h3>
              <p className="text-sm text-stone-500">{item.product.era}</p>
              <p className="text-stone-700 font-medium mt-1">
                {formatPrice(item.product.price)} x {item.quantity}
              </p>
            </div>
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="text-sm text-red-600 hover:text-red-800 transition-colors ml-4"
            >
              削除
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-6 flex items-center justify-between">
        <p className="text-xl font-semibold text-stone-800">
          合計: {formatPrice(totalPrice)}
        </p>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="px-4 py-2 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
          >
            カートを空にする
          </button>
          <button className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors">
            購入手続きへ
          </button>
        </div>
      </div>
    </div>
  );
}
