"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category, SortOrder } from "@/lib/microcms";

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: "publishedAt", label: "新着順" },
  { value: "overall_rating", label: "おすすめ度順" },
];

export default function ProductFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") ?? "";
  const currentSort = (searchParams.get("sort") as SortOrder) ?? "publishedAt";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParam("category", "")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            currentCategory === ""
              ? "bg-zinc-900 text-white"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
          }`}
        >
          すべて
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateParam("category", cat.slug)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              currentCategory === cat.slug
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
      <select
        value={currentSort}
        onChange={(e) => updateParam("sort", e.target.value)}
        className="ml-auto rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
