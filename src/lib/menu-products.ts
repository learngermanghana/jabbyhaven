import "server-only";
import { menuCatalog } from "@/data/menu-catalog";
import { MenuItem } from "@/types/menu";

const DEFAULT_STORE_ID = "c5q9ze32D4TbLoaPHpG2mFOXuOo2";

type SedifexProduct = {
  id?: string;
  _id?: string;
  productId?: string;
  storeId?: string;
  name?: string;
  productName?: string;
  title?: string;
  price?: number | string;
  unitPrice?: number | string;
  stockCount?: number;
  stock?: number;
  quantity?: number;
  itemType?: string;
  category?: string;
  imageUrl?: string;
  image?: string;
  imageURL?: string;
  imageAlt?: string;
  updatedAt?: string;
};

function dedupeProducts(items: MenuItem[]) {
  const unique = new Map<string, MenuItem>();

  for (const item of items) {
    const key = [item.id, item.storeId ?? DEFAULT_STORE_ID, item.name, item.price].join("|");
    if (!unique.has(key)) {
      unique.set(key, item);
    }
  }

  return [...unique.values()];
}

function normalizeProduct(item: SedifexProduct, storeId: string): MenuItem | null {
  const id = item.id ?? item._id ?? item.productId;
  const name = item.name ?? item.productName ?? item.title;

  if (!id || !name) {
    return null;
  }

  const rawPrice = item.price ?? item.unitPrice ?? 0;
  const numericPrice = typeof rawPrice === "number" ? rawPrice : Number(rawPrice);
  const category = item.itemType?.trim() || item.category?.trim() || "Uncategorized";
  const stockCount = Math.max(item.stockCount ?? item.stock ?? item.quantity ?? 0, 0);
  const imageUrl = item.imageUrl ?? item.imageURL ?? item.image;

  return {
    id,
    storeId: item.storeId ?? storeId,
    name,
    price: Number.isFinite(numericPrice) ? numericPrice : 0,
    stockCount,
    itemType: item.itemType,
    category,
    image: imageUrl || "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    imageAlt: item.imageAlt || name,
    description: `${category} item from Jabby's Sedifex catalog`,
    available: stockCount > 0,
    isService: category.toLowerCase() === "service",
    updatedAt: item.updatedAt,
    popularity: 0
  };
}

async function fetchSedifexProducts(storeId: string): Promise<SedifexProduct[]> {
  const directUrl = process.env.SEDIFEX_PRODUCTS_URL;
  const apiBaseUrl = process.env.SEDIFEX_API_BASE_URL;
  const apiKey =
    process.env.SEDIFEX_INTEGRATION_KEY ?? process.env.SEDIFEX_API_KEY ?? process.env.SEDIFEX_FIRE_SECRET;

  const url = directUrl
    ? directUrl
    : apiBaseUrl
      ? `${apiBaseUrl.replace(/\/$/, "")}/integrationProducts?storeId=${encodeURIComponent(storeId)}`
      : null;

  if (!url) {
    return [];
  }

  const response = await fetch(url, {
    headers: {
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      "Content-Type": "application/json"
    },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`Sedifex catalog request failed: ${response.status}`);
  }

  const payload = await response.json();
  if (Array.isArray(payload)) return payload as SedifexProduct[];
  if (Array.isArray(payload?.products)) return payload.products as SedifexProduct[];
  if (Array.isArray(payload?.data)) return payload.data as SedifexProduct[];
  if (Array.isArray(payload?.items)) return payload.items as SedifexProduct[];
  if (Array.isArray(payload?.result)) return payload.result as SedifexProduct[];

  return [];
}

export async function getMenuProducts(storeId = DEFAULT_STORE_ID): Promise<MenuItem[]> {
  try {
    const rawProducts = await fetchSedifexProducts(storeId);
    const normalized = rawProducts
      .map((product) => normalizeProduct(product, storeId))
      .filter((item): item is MenuItem => Boolean(item));

    if (!normalized.length) {
      return menuCatalog;
    }

    return dedupeProducts(normalized);
  } catch (error) {
    console.error("Failed to load Sedifex products. Falling back to local menu catalog.", error);
    return menuCatalog;
  }
}
