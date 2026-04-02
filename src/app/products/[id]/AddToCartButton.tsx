"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium"
    >
      {added ? "カートに追加しました" : "カートに追加"}
    </button>
  );
}
