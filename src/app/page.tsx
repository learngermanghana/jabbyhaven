import {
  CTASection,
  FAQPreview,
  FeaturedProducts,
  GalleryPreview,
  HeroSection,
  PromoSection,
  TestimonialsSection,
  ServicesSection
} from "@/components/sections";
import { getGalleryImages } from "@/lib/gallery-images";
import { getMenuProducts } from "@/lib/menu-products";
import { getStorePromo } from "@/lib/promo";

export default async function HomePage() {
  const [promo, products, galleryImages] = await Promise.all([
    getStorePromo(),
    getMenuProducts(),
    getGalleryImages()
  ]);

  return (
    <div className="page-grid">
      <HeroSection />
      <PromoSection promo={promo} />
      <FeaturedProducts items={products} />
      <GalleryPreview items={galleryImages} />
      <ServicesSection />
      <TestimonialsSection />
      <FAQPreview />
      <CTASection />
    </div>
  );
}
