import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ChocoMint Sweets Guide",
  description:
    "チョコミント商品の網羅的なデータベース。味のレーダーチャートで各商品の特徴を可視化し、自分好みの商品を見つけよう。",
  openGraph: {
    title: "ChocoMint Sweets Guide",
    description:
      "チョコミント商品の網羅的なデータベース。味のレーダーチャートで各商品の特徴を可視化し、自分好みの商品を見つけよう。",
  },
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-20 text-center">
      <span className="text-6xl mb-6">🍫🌿</span>
      <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-4 sm:text-5xl">
        ChocoMint Sweets Guide
      </h1>
      <p className="max-w-xl text-lg text-zinc-600 mb-8 leading-relaxed">
        チョコミント商品の網羅的なデータベース。
        <br className="hidden sm:block" />
        味のレーダーチャートで各商品の特徴を可視化し、
        自分好みの商品を最短で見つけよう。
      </p>
      <Link
        href="/products"
        className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors"
      >
        商品一覧を見る →
      </Link>
    </div>
  );
}
