import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-4">
          Antique Gallery
        </h1>
        <p className="text-stone-500 max-w-xl mx-auto">
          ヨーロッパや日本のアンティーク家具を厳選。
          歴史と職人技が宿る一点ものの家具をお届けします。
        </p>
      </section>

      <section className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-stone-200 text-stone-600 rounded-full text-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}
