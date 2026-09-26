"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { SITE_NAME } from "@/lib/site";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-stone-800 text-stone-100">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-serif tracking-wide hover:text-amber-300 transition-colors">
          {SITE_NAME}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Zines &amp; Prints
          </Link>
          <Link href="/" className="hover:text-amber-300 transition-colors">
            Artists
          </Link>
          <Link href="/wholesale" className="hover:text-amber-300 transition-colors">
            Wholesale
          </Link>
          <Link href="/contact" className="hover:text-amber-300 transition-colors">
            Contact
          </Link>
          <Link href="/cart" className="relative hover:text-amber-300 transition-colors">
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
