import { menuCatalog } from "@/data/menu-catalog";
import { MenuItem } from "@/types/menu";

const DEFAULT_STORE_ID = "c5q9ze32D4TbLoaPHpG2mFOXuOo2";

type SedifexProduct = {
  id?: string;
  storeId?: string;
  name?: string;
  price?: number | string;
  stockCount?: number;
  itemType?: string;
  imageUrl?: string;
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
  if (!item.id || !item.name) {
    return null;
  }

  const numericPrice = typeof item.price === "number" ? item.price : Number(item.price ?? 0);
  const category = item.itemType?.trim() || "Uncategorized";
  const stockCount = Math.max(item.stockCount ?? 0, 0);

  return {
    id: item.id,
    storeId: item.storeId ?? storeId,
    name: item.name,
    price: Number.isFinite(numericPrice) ? numericPrice : 0,
    stockCount,
    itemType: item.itemType,
    category,
    image: item.imageUrl || "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
    imageAlt: item.imageAlt || item.name,
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
  } catch {
    return menuCatalog;
  }
}
