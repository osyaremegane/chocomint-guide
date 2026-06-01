import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/microcms";
import RadarChart from "@/app/components/RadarChart";
import StarRating from "@/app/components/StarRating";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return {};

  const previousImages = (await parent).openGraph?.images ?? [];

  return {
    title: product.title,
    description: product.description.replace(/<[^>]*>/g, "").slice(0, 120),
    openGraph: {
      title: product.title,
      images: [product.image.url, ...previousImages],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-1/2">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100">
            <Image
              src={product.image.url}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="md:w-1/2 flex flex-col gap-4">
          <span className="text-sm font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full self-start">
            {product.category.name}
          </span>
          <h1 className="text-2xl font-bold text-zinc-900">{product.title}</h1>
          <div>
            <p className="text-xs text-zinc-500 mb-1">総合おすすめ度</p>
            <StarRating rating={product.overall_rating} />
          </div>
          <div
            className="prose prose-sm text-zinc-700"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4 text-center">
          味の特徴
        </h2>
        <RadarChart
          mint_level={product.mint_level}
          sweet_level={product.sweet_level}
          aroma_level={product.aroma_level}
          choco_level={product.choco_level}
          cool_level={product.cool_level}
        />
      </div>
    </div>
  );
}
