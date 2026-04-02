import Link from "next/link";
import { Product, formatPrice } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="aspect-[4/3] bg-stone-200 flex items-center justify-center text-stone-400 text-sm">
        <span className="font-serif">{product.category}</span>
      </div>
      <div className="p-4">
        <p className="text-xs text-amber-700 mb-1">{product.era}</p>
        <h3 className="font-serif text-stone-800 font-medium group-hover:text-amber-800 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-stone-500 mt-1 line-clamp-2">{product.description}</p>
        <p className="text-lg font-semibold text-stone-800 mt-2">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
