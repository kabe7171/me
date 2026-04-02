export default function Footer() {
  return (
    <footer className="bg-stone-800 text-stone-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm">
        <p className="font-serif text-stone-300 mb-2">Antique Gallery</p>
        <p>&copy; {new Date().getFullYear()} Antique Gallery. All rights reserved.</p>
      </div>
    </footer>
  );
}
