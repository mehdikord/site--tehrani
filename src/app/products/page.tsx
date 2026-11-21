import type { Metadata } from "next";
import { productsData } from "@/lib/data";
import { PageHero } from "@/components/layout/PageHero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ProductCard } from "@/components/home/ProductCard";
import { Reveal } from "@/components/motion/Reveal";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = { title: productsData.category, description: "الگوهای معجزه‌گر؛ سایزبندی‌شده، تست‌شده و بدون نیاز به پرو." };

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow={productsData.category} title={productsData.pageTitle} description="الگوهای معجزه‌گر؛ سایزبندی‌شده، تست‌شده و بدون نیاز به پرو." />
      <TrustStrip overlap={false} />
      <section className="bg-ivory pb-24 pt-10 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal stagger={0.1} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {productsData.items.map((p, i) => (
              <div key={p.slug}><ProductCard p={p} index={i} /></div>
            ))}
          </Reveal>
          <p className="mt-12 text-center text-sm text-taupe">{productsData.noteOnPrice}</p>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
