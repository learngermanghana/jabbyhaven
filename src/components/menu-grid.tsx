"use client";

import { useMemo, useState } from "react";
import { menuCatalog } from "@/data/menu-catalog";

export function MenuGrid() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [dietary, setDietary] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");

  const categories = ["all", ...new Set(menuCatalog.map((item) => item.category))];
  const dietaryOptions = ["all", "vegan", "vegetarian", "halal", "gluten-free"];

  const filtered = useMemo(() => {
    return menuCatalog
      .filter((item) =>
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
  }, [category, dietary, search, sortBy]);

  return (
    <section>
      <h1>Menu</h1>
      <input placeholder="Search dishes" value={search} onChange={(e) => setSearch(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <select value={dietary} onChange={(e) => setDietary(e.target.value)}>
        {dietaryOptions.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="popularity">popularity</option>
        <option value="price">price</option>
      </select>

      <div>
        {filtered.map((item) => (
          <article key={item.id}>
            <img src={item.image} alt={item.name} width={260} height={180} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
