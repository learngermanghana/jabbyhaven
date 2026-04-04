import "server-only";

const DEFAULT_STORE_ID = "c5q9ze32D4TbLoaPHpG2mFOXuOo2";

export type StorePromo = {
  promoTitle: string;
  promoSummary: string;
  promoStartDate?: string;
  promoEndDate?: string;
  promoSlug?: string;
  promoWebsiteUrl?: string;
  promoImageUrl?: string;
};

function normalizePromo(payload: unknown): StorePromo | null {
  const promo = (Array.isArray(payload) ? payload[0] : payload) as Partial<StorePromo> | null;
  if (!promo?.promoTitle || !promo?.promoSummary) {
    return null;
  }

  return {
    promoTitle: promo.promoTitle,
    promoSummary: promo.promoSummary,
    promoStartDate: promo.promoStartDate,
    promoEndDate: promo.promoEndDate,
    promoSlug: promo.promoSlug,
    promoWebsiteUrl: promo.promoWebsiteUrl,
    promoImageUrl: promo.promoImageUrl
  };
}

export async function getStorePromo(storeId = DEFAULT_STORE_ID): Promise<StorePromo | null> {
  const apiBaseUrl = process.env.SEDIFEX_API_BASE_URL;
  const apiKey =
    process.env.SEDIFEX_INTEGRATION_KEY ?? process.env.SEDIFEX_API_KEY ?? process.env.SEDIFEX_FIRE_SECRET;

  if (!apiBaseUrl) {
    return null;
  }

  const url = `${apiBaseUrl.replace(/\/$/, "")}/integrationPromo?storeId=${encodeURIComponent(storeId)}`;
  const response = await fetch(url, {
    headers: {
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
      "Content-Type": "application/json"
    },
    next: { revalidate: 60 }
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  return normalizePromo(payload?.data ?? payload?.result ?? payload);
}
