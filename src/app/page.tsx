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
    <main>
      <HeroSection />
      <FeaturedProducts />
      <GalleryPreview />
      <TestimonialsSection />
      <FAQPreview />
      <CTASection />
    </main>
  );
}
