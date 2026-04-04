import {
  CTASection,
  FAQPreview,
  FeaturedProducts,
  GalleryPreview,
  HeroSection,
  PromoSection,
  TestimonialsSection
} from "@/components/sections";
import { getStorePromo } from "@/lib/promo";

export default async function HomePage() {
  const promo = await getStorePromo();

  return (
    <div className="page-grid">
      <HeroSection />
      <PromoSection promo={promo} />
      <FeaturedProducts />
      <GalleryPreview />
      <TestimonialsSection />
      <FAQPreview />
      <CTASection />
    </div>
  );
}
