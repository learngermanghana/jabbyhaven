"use client";

import { useMemo, useState } from "react";
import { menuCatalog } from "@/data/menu-catalog";
import { MenuItem } from "@/types/menu";

type MenuGridProps = {
  items?: MenuItem[];
};

export function MenuGrid({ items = menuCatalog }: MenuGridProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [dietary, setDietary] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const categories = ["all", ...new Set(items.map((item) => item.category || "Uncategorized"))];
  const dietaryOptions = ["all", "vegan", "vegetarian", "halal", "gluten-free"];

  const filtered = useMemo(() => {
    return items
      .filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      )
      .filter((item) => category === "all" || item.category === category)
      .filter((item) => {
        if (dietary === "all") return true;
        if (dietary === "vegetarian") return Boolean(item.isVegetarian);
        return item.dietaryTags?.includes(dietary);
      })
      .sort((a, b) => {
        if (sortBy === "price") return a.price - b.price;
        return (b.popularity ?? 0) - (a.popularity ?? 0);
      });
  }, [category, dietary, items, search, sortBy]);

  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, MenuItem[]>>((acc, item) => {
      const group = item.category || "Uncategorized";

      if (!acc[group]) {
        acc[group] = [];
      }

      acc[group].push(item);
      return acc;
    }, {});
  }, [filtered]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-GH", {
      style: "currency",
      currency: "GHS",
      minimumFractionDigits: 2
    }).format(price);

  return (
    <section className="page-grid">
      <div className="card">
        <h1>Our Menu</h1>
        <p className="lead">Browse signature meals, sides, and drinks curated for every appetite.</p>
      </div>

      <div className="card grid-2">
        <input
          className="field"
          placeholder="Search dishes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select className="select" value={dietary} onChange={(e) => setDietary(e.target.value)}>
          {dietaryOptions.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popularity">popularity</option>
          <option value="price">price</option>
        </select>
      </div>

      {Object.entries(grouped).map(([group, groupItems]) => (
        <div key={group} className="page-grid">
          <div className="card">
            <h2>{group}</h2>
          </div>
          <div className="grid-3">
            {groupItems.map((item) => (
              <article className="card" key={`${item.storeId ?? "local"}-${item.id}`}>
                <img src={item.image} alt={item.imageAlt || item.name} width={260} height={180} />
                <h3>{item.name}</h3>
                <p>
                  <strong>{formatPrice(item.price)}</strong>
                  {typeof item.stockCount === "number" && item.stockCount > 0 ? ` · ${item.stockCount} left` : ""}
                </p>
                <p className="lead">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
