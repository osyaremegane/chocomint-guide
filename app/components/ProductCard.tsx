import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/microcms";
import StarRating from "./StarRating";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-4/3 bg-zinc-100">
        <Image
          src={product.image.url}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full self-start">
          {product.category.name}
        </span>
        <h2 className="font-semibold text-zinc-900 line-clamp-2 leading-snug">
          {product.title}
        </h2>
        <StarRating rating={product.overall_rating} />
      </div>
    </Link>
  );
}
