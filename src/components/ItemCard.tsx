import Link from "next/link";
import type { Item } from "@/types/catalog";
import { ITEM_KIND_LABEL } from "@/types/catalog";
import { getArtistById } from "@/data/artists";
import { formatPrice, formatEdition } from "@/lib/format";

export default function ItemCard({ item }: { item: Item }) {
  const artist = getArtistById(item.artistId);

  return (
    <Link
      href={`/items/${item.id}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="aspect-[4/3] bg-stone-200 flex items-center justify-center text-stone-400 text-sm">
        <span className="font-serif">{ITEM_KIND_LABEL[item.kind]}</span>
      </div>
      <div className="p-4">
        {artist && <p className="text-xs text-amber-700 mb-1">{artist.name}</p>}
        <h3 className="font-serif text-stone-800 font-medium group-hover:text-amber-800 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-stone-500 mt-1 line-clamp-2">{item.description}</p>
        <p className="text-xs text-stone-500 mt-1">{formatEdition(item.edition)}</p>
        {item.stock === 0 ? (
          <p className="text-lg font-semibold text-stone-400 mt-2">Sold out</p>
        ) : (
          <p className="text-lg font-semibold text-stone-800 mt-2">
            {formatPrice(item.priceJpy)}
          </p>
        )}
      </div>
    </Link>
  );
}
