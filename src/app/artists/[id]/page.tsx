import { notFound } from "next/navigation";
import { artists, getArtistById } from "@/data/artists";
import { getItemsByArtist } from "@/data/items";
import ItemCard from "@/components/ItemCard";

export function generateStaticParams() {
  return artists.map((artist) => ({ id: artist.id }));
}

export default async function ArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artist = getArtistById(id);
  if (!artist) notFound();

  const artistItems = getItemsByArtist(artist.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="max-w-2xl mb-12">
        <h1 className="font-serif text-3xl text-stone-800 mb-1">{artist.name}</h1>
        <p className="text-sm text-amber-700 mb-4">{artist.basedIn}</p>
        <p className="text-stone-600 mb-4">{artist.bio}</p>
        <div className="flex gap-4 text-sm">
          {artist.website && (
            <a
              href={artist.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 hover:text-amber-800 underline"
            >
              Website
            </a>
          )}
          {artist.instagram && (
            <a
              href={`https://instagram.com/${artist.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 hover:text-amber-800 underline"
            >
              @{artist.instagram}
            </a>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artistItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}
