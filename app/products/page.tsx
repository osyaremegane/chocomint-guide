import type { Metadata } from "next";
import { Suspense } from "react";
import { getCategories, getProducts, type SortOrder } from "@/lib/microcms";
import ProductCard from "@/app/components/ProductCard";
import ProductFilters from "@/app/components/ProductFilters";

export const metadata: Metadata = {
  title: "商品一覧",
  description:
    "チョコミントスイーツの一覧。アイス・チョコレート・ドリンク・ケーキなどカテゴリ別に絞り込んで探せます。",
};

type SearchParams = Promise<{
  category?: string;
  sort?: string;
}>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category: categorySlug, sort } = await searchParams;

  const categories = await getCategories();

  const matchedCategory = categorySlug
    ? categories.find((c) => c.slug === categorySlug)
    : undefined;

  const products = await getProducts({
    categoryId: matchedCategory?.id,
    sort: sort as SortOrder | undefined,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">商品一覧</h1>
      <Suspense>
        <ProductFilters categories={categories} />
      </Suspense>
      <div className="mt-6">
        {products.length === 0 ? (
          <p className="py-20 text-center text-zinc-500">
            商品が登録されていません
          </p>
        ) : (
          <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
