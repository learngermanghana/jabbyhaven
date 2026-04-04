import {
  CTASection,
  FAQPreview,
  FeaturedProducts,
  GalleryPreview,
  HeroSection,
  TestimonialsSection
} from "@/components/sections";

export default function HomePage() {
  return (
    <div className="page-grid">
      <HeroSection />
      <FeaturedProducts />
      <GalleryPreview />
      <TestimonialsSection />
      <FAQPreview />
      <CTASection />
    </div>
  );
}
