import { createClient, type MicroCMSImage, type MicroCMSListContent } from "microcms-js-sdk";

export type TasteProfile = {
  mint_level: number;
  sweet_level: number;
  aroma_level: number;
  choco_level: number;
  cool_level: number;
};

export type Category = MicroCMSListContent & {
  name: string;
  slug: string;
  icon?: MicroCMSImage;
  description?: string;
  sort_order: number;
};

export type Product = MicroCMSListContent &
  TasteProfile & {
    title: string;
    slug: string;
    description: string;
    image: MicroCMSImage;
    category: Category;
    brand: string;
    price?: number;
    overall_rating: number;
    is_seasonal: boolean;
    seasonal_note?: string;
    purchase_url?: string;
  };

export type SortOrder = "overall_rating" | "publishedAt";

export const TASTE_LABELS: Record<keyof TasteProfile, string> = {
  mint_level: "ミント感",
  sweet_level: "甘さ",
  aroma_level: "香り",
  choco_level: "チョコ感",
  cool_level: "清涼感",
};

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

export async function getCategories(): Promise<Category[]> {
  const response = await client.getList<Category>({
    endpoint: "categories",
    queries: { orders: "sort_order", limit: 100 },
  });
  return response.contents;
}

export async function getProducts(params?: {
  categoryId?: string;
  sort?: SortOrder;
}): Promise<Product[]> {
  const filters = params?.categoryId
    ? `category[equals]${params.categoryId}`
    : undefined;
  const orders =
    params?.sort === "overall_rating" ? "-overall_rating" : "-publishedAt";

  const response = await client.getList<Product>({
    endpoint: "products",
    queries: { filters, orders, limit: 100 },
  });
  return response.contents;
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    return await client.getListDetail<Product>({
      endpoint: "products",
      contentId: id,
    });
  } catch {
    return null;
  }
}
