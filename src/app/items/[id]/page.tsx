import Link from "next/link";
import { notFound } from "next/navigation";
import { items, getItemById } from "@/data/items";
import { getArtistById } from "@/data/artists";
import { BINDING_LABEL, ITEM_KIND_LABEL } from "@/types/catalog";
import { formatEdition, formatPrice, formatSize } from "@/lib/format";
import AddToCartButton from "./AddToCartButton";

export function generateStaticParams() {
  return items.map((item) => ({ id: item.id }));
}

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = getItemById(id);
  if (!item) notFound();

  const artist = getArtistById(item.artistId);

  const specs: { label: string; value: React.ReactNode }[] = [
    {
      label: "Artist",
      value: artist ? (
        <Link href={`/artists/${artist.id}`} className="hover:text-amber-800 underline">
          {artist.name}
        </Link>
      ) : (
        "Unknown"
      ),
    },
    { label: "Year", value: item.year },
    ...(item.kind === "zine"
      ? [
          { label: "Pages", value: item.spec.pages },
          { label: "Size", value: formatSize(item.spec.size) },
          { label: "Binding", value: BINDING_LABEL[item.spec.binding] },
          { label: "Printing", value: item.spec.printing },
          ...(item.spec.language ? [{ label: "Language", value: item.spec.language }] : []),
        ]
      : [
          { label: "Process", value: item.spec.process },
          { label: "Paper", value: item.spec.paper },
          { label: "Paper size", value: formatSize(item.spec.size) },
          ...(item.spec.imageSize
            ? [{ label: "Image size", value: formatSize(item.spec.imageSize) }]
            : []),
        ]),
    { label: "Edition", value: formatEdition(item.edition) },
    { label: "Weight", value: `${item.weightGrams} g` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-stone-200 rounded-lg flex items-center justify-center text-stone-400">
          <span className="font-serif text-lg">{ITEM_KIND_LABEL[item.kind]}</span>
        </div>
        <div>
          {artist && <p className="text-sm text-amber-700 mb-1">{artist.name}</p>}
          <h1 className="font-serif text-2xl md:text-3xl text-stone-800 mb-4">
            {item.title}
          </h1>
          <p className="text-stone-600 mb-6">{item.description}</p>
          {item.stock === 0 ? (
            <p className="text-2xl font-semibold text-stone-400 mb-6">Sold out</p>
          ) : (
            <p className="text-2xl font-semibold text-stone-800 mb-6">
              {formatPrice(item.priceJpy)}
            </p>
          )}
          {item.stock === 0 ? (
            <button
              disabled
              className="w-full py-3 bg-stone-300 text-stone-500 rounded-lg font-medium cursor-not-allowed"
            >
              Sold out
            </button>
          ) : (
            <AddToCartButton item={item} />
          )}
          {item.wholesale && (
            <p className="text-sm text-stone-500 mt-3">
              Wholesale available — min. {item.wholesale.minQuantity} copies.{" "}
              <Link href="/wholesale" className="text-amber-700 hover:text-amber-800 underline">
                Learn more
              </Link>
            </p>
          )}
          <div className="mt-8 border-t pt-6">
            <h2 className="font-serif text-lg text-stone-800 mb-3">Details</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm mb-6">
              {specs.map((s) => (
                <div key={s.label} className="contents">
                  <dt className="text-stone-500">{s.label}</dt>
                  <dd className="text-stone-700">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
