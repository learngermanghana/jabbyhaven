export type SpiceLevel = "mild" | "medium" | "hot";
export type Course = "starter" | "main" | "dessert" | "drink";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  available: boolean;
  popularity?: number;
  spiceLevel?: SpiceLevel;
  prepTime?: number;
  allergens?: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  dietaryTags?: string[];
  course?: Course;
};
