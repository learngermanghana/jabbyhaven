import {
  CTASection,
  FAQPreview,
  FeaturedProducts,
  GalleryPreview,
  HeroSection,
  PromoSection,
  TestimonialsSection
} from "@/components/sections";
import { getMenuProducts } from "@/lib/menu-products";
import { getStorePromo } from "@/lib/promo";

export default async function HomePage() {
  const [promo, products] = await Promise.all([getStorePromo(), getMenuProducts()]);

  return (
    <div className="page-grid">
      <HeroSection />
      <PromoSection promo={promo} />
      <FeaturedProducts items={products} />
      <GalleryPreview />
      <TestimonialsSection />
      <FAQPreview />
      <CTASection />
    </div>
  );
}
