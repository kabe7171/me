"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Item } from "@/types/catalog";

export default function AddToCartButton({ item }: { item: Item }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium"
    >
      {added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
