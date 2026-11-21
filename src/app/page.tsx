import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { Marquee } from "@/components/home/Marquee";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { ProductsShowcase } from "@/components/home/ProductsShowcase";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { CoursesSection } from "@/components/home/CoursesSection";
import { PortfolioGallery } from "@/components/home/PortfolioGallery";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { site } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <AboutTeaser />
      <ProductsShowcase />
      <ServicesShowcase />
      <Marquee words={[...site.brand.rotatingOfferings, site.brand.slogan]} />
      <CoursesSection />
      <PortfolioGallery />
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
}
