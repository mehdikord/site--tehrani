import type { Metadata } from "next";
import { portfolioData } from "@/lib/data";
import { PageHero } from "@/components/layout/PageHero";
import { PortfolioGallery } from "@/components/home/PortfolioGallery";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = { title: portfolioData.pageTitle, description: portfolioData.intro };

export default function PortfolioPage() {
  return (
    <>
      <PageHero eyebrow={portfolioData.subtitle} title={portfolioData.pageTitle} description={portfolioData.intro} />
      <PortfolioGallery withHeading={false} />
      <ContactCTA />
    </>
  );
}
