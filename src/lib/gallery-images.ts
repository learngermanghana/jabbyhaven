import "server-only";
import { menuCatalog } from "@/data/menu-catalog";

const DEFAULT_STORE_ID = "c5q9ze32D4TbLoaPHpG2mFOXuOo2";

export type GalleryImage = {
  id: string;
  image: string;
  name: string;
  description?: string;
};

type SedifexGalleryItem = {
  id?: string;
  _id?: string;
  image?: string;
  imageUrl?: string;
  imageURL?: string;
  title?: string;
  name?: string;
  caption?: string;
  description?: string;
};

function normalizeGalleryItem(item: SedifexGalleryItem): GalleryImage | null {
  const id = item.id ?? item._id;
  const image = item.imageUrl ?? item.imageURL ?? item.image;

  if (!id || !image) {
    return null;
  }

  const name = item.title?.trim() || item.name?.trim() || "Jabby's Haven gallery image";

  return {
    id,
    image,
    name,
    description: item.caption?.trim() || item.description?.trim() || ""
  };
}

async function fetchSedifexGallery(storeId: string): Promise<SedifexGalleryItem[]> {
  const apiBaseUrl = process.env.SEDIFEX_API_BASE_URL;
  const integrationKey =
    process.env.SEDIFEX_INTEGRATION_KEY ?? process.env.SEDIFEX_API_KEY ?? process.env.SEDIFEX_FIRE_SECRET;

  if (!apiBaseUrl) {
    return [];
  }

  const endpoint = `${apiBaseUrl.replace(/\/$/, "")}/integrationGallery?storeId=${encodeURIComponent(storeId)}`;
  const response = await fetch(endpoint, {
    headers: {
      ...(integrationKey ? { Authorization: `Bearer ${integrationKey}` } : {}),
      "Content-Type": "application/json"
    },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    throw new Error(`Sedifex gallery request failed: ${response.status}`);
  }

  const payload = await response.json();
  if (Array.isArray(payload)) return payload as SedifexGalleryItem[];
  if (Array.isArray(payload?.gallery)) return payload.gallery as SedifexGalleryItem[];
  if (Array.isArray(payload?.data)) return payload.data as SedifexGalleryItem[];
  if (Array.isArray(payload?.items)) return payload.items as SedifexGalleryItem[];

  return [];
}

export async function getGalleryImages(storeId = DEFAULT_STORE_ID): Promise<GalleryImage[]> {
  try {
    const gallery = await fetchSedifexGallery(storeId);
    const normalized = gallery
      .map((item) => normalizeGalleryItem(item))
      .filter((item): item is GalleryImage => Boolean(item));

    if (normalized.length) {
      return normalized;
    }
  } catch (error) {
    console.error("Failed to load Sedifex gallery. Falling back to local images.", error);
  }

  return menuCatalog.map((item) => ({
    id: item.id,
    image: item.image,
    name: item.name,
    description: item.description
  }));
}
