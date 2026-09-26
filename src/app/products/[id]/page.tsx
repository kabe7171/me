import { notFound } from "next/navigation";
import { products, getProductById } from "@/data/products";
import { formatDimensions, formatPrice } from "@/lib/format";
import AddToCartButton from "./AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const specs = [
    { label: "年代", value: product.era },
    { label: "産地", value: product.origin },
    { label: "素材", value: product.material },
    { label: "サイズ", value: formatDimensions(product.dimensions) },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-stone-200 rounded-lg flex items-center justify-center text-stone-400">
          <span className="font-serif text-lg">{product.category}</span>
        </div>
        <div>
          <p className="text-sm text-amber-700 mb-1">{product.era}</p>
          <h1 className="font-serif text-2xl md:text-3xl text-stone-800 mb-4">
            {product.name}
          </h1>
          <p className="text-stone-600 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-stone-800 mb-6">
            {formatPrice(product.price)}
          </p>
          <AddToCartButton product={product} />
          <div className="mt-8 border-t pt-6">
            <h2 className="font-serif text-lg text-stone-800 mb-3">仕様</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm mb-6">
              {specs.map((s) => (
                <div key={s.label} className="contents">
                  <dt className="text-stone-500">{s.label}</dt>
                  <dd className="text-stone-700">{s.value}</dd>
                </div>
              ))}
            </dl>
            <h2 className="font-serif text-lg text-stone-800 mb-2">詳細情報</h2>
            <p className="text-stone-600 text-sm leading-relaxed">{product.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
