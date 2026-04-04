import { MenuGrid } from "@/components/menu-grid";
import { getMenuProducts } from "@/lib/menu-products";

export const revalidate = 60;

export default async function MenuPage() {
  const products = await getMenuProducts();

  return <MenuGrid items={products} />;
}
