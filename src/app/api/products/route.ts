import { NextResponse } from "next/server";
import { getMenuProducts } from "@/lib/menu-products";

export const revalidate = 60;

export async function GET() {
  const products = await getMenuProducts();
  return NextResponse.json({ products });
}
