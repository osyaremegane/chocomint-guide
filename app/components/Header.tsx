import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          🍫🌿 ChocoMint Sweets Guide
        </Link>
        <nav>
          <Link
            href="/products"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
          >
            商品一覧
          </Link>
        </nav>
      </div>
    </header>
  );
}
