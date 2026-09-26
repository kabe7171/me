"use client";

import { useCart } from "@/context/CartContext";
import { getArtistById } from "@/data/artists";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="font-serif text-2xl text-stone-800 mb-4">Cart</h1>
        <p className="text-stone-500 mb-6">Your cart is empty.</p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors"
        >
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-serif text-2xl text-stone-800 mb-8">Cart</h1>
      <div className="space-y-4">
        {items.map((entry) => {
          const artist = getArtistById(entry.item.artistId);
          return (
            <div
              key={entry.item.id}
              className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="flex-1">
                {artist && <p className="text-sm text-stone-500">{artist.name}</p>}
                <h3 className="font-serif text-stone-800">{entry.item.title}</h3>
                <p className="text-stone-700 font-medium mt-1">
                  {formatPrice(entry.item.priceJpy)} x {entry.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(entry.item.id)}
                className="text-sm text-red-600 hover:text-red-800 transition-colors ml-4"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <div className="mt-8 border-t pt-6 flex items-center justify-between">
        <p className="text-xl font-semibold text-stone-800">
          Total: {formatPrice(totalPrice)}
        </p>
        <div className="flex gap-3">
          <button
            onClick={clearCart}
            className="px-4 py-2 border border-stone-300 rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
          >
            Clear cart
          </button>
          <button className="px-6 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
