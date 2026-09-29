import ItemCard from "@/components/ItemCard";
import { items } from "@/data/items";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

const KIND_CHIPS = ["All", "Photo zines", "Photobooks"];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-4">
          {SITE_NAME}
        </h1>
        <p className="text-stone-500 max-w-xl mx-auto">{SITE_TAGLINE}</p>
      </section>

      <section className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {KIND_CHIPS.map((chip) => (
            <span
              key={chip}
              className="px-3 py-1 bg-stone-200 text-stone-600 rounded-full text-sm"
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}
