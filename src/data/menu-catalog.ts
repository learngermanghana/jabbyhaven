import { MenuItem } from "@/types/menu";

export const menuCatalog: MenuItem[] = [
  {
    id: "jollof-plate",
    name: "Smoky Jollof Plate",
    price: 18,
    category: "Rice",
    description: "Long-grain rice simmered in pepper stew with grilled chicken.",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
    available: true,
    spiceLevel: "medium",
    prepTime: 20,
    dietaryTags: ["halal"],
    course: "main",
    popularity: 5
  },
  {
    id: "pepper-soup",
    name: "Goat Pepper Soup",
    price: 14,
    category: "Soup",
    description: "Traditional aromatic broth with tender cuts and fresh herbs.",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80",
    available: true,
    spiceLevel: "hot",
    prepTime: 25,
    allergens: ["celery"],
    course: "starter",
    popularity: 4
  },
  {
    id: "plantain-platter",
    name: "Sweet Plantain Platter",
    price: 10,
    category: "Sides",
    description: "Caramelized ripe plantains paired with house dip.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80",
    available: true,
    prepTime: 12,
    isVegetarian: true,
    isVegan: true,
    dietaryTags: ["vegan", "gluten-free"],
    course: "starter",
    popularity: 3
  },
  {
    id: "hibiscus-cooler",
    name: "Hibiscus Cooler",
    price: 6,
    category: "Beverages",
    description: "Freshly brewed sobolo with citrus and ginger notes.",
    image:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80",
    available: true,
    prepTime: 5,
    isVegan: true,
    dietaryTags: ["vegan"],
    course: "drink",
    popularity: 4
  }
];
