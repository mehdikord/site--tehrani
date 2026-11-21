import Link from "next/link";
import { ArrowLeft, ArrowUpLeft } from "lucide-react";
import { portfolioData } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/motion/SectionHeading";

// Four columns drifting at different speeds as the page scrolls
const columns = [
  { speed: 0.72, offset: "lg:mt-24" },
  { speed: 1.22, offset: "mt-10 lg:mt-0" },
  { speed: 0.8, offset: "lg:mt-36" },
  { speed: 1.3, offset: "mt-10 lg:mt-12" },
];

export function PortfolioGallery({ withHeading = true }: { withHeading?: boolean }) {
  const items = portfolioData.items;
  const perCol = Math.ceil(items.length / columns.length);
  return (
    <section id="portfolio" className="relative overflow-hidden bg-charcoal py-24 text-cream lg:py-36">
      <div className="emerald-stage absolute inset-0" />
      <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {withHeading && (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading light eyebrow={portfolioData.subtitle} title={portfolioData.pageTitle} description={portfolioData.intro} />
            <Reveal>
              <Button asChild variant="ghostLight">
                <Link href="/portfolio">مشاهده نمونه‌کارها <ArrowLeft className="h-4 w-4" /></Link>
              </Button>
            </Reveal>
          </div>
        )}

        <div className={cn("grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4", withHeading && "mt-14 lg:mt-20")}>
          {columns.map((col, c) => (
            <Parallax key={c} speed={col.speed} className={cn("flex flex-col gap-4 sm:gap-6", col.offset)}>
              {items.slice(c * perCol, c * perCol + perCol).map((it) => (
                <Reveal key={it.id} variant="clip">
                  <Link href={it.href} className="group relative block overflow-hidden rounded-3xl bg-graphite shadow-card lg:rounded-[2rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt={it.title} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-[1500ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.08]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/10 to-transparent" />
                    <span className="absolute left-4 top-4 grid h-10 w-10 -translate-y-2 place-items-center rounded-full bg-gold text-charcoal opacity-0 transition-[opacity,transform] duration-500 [transition-timing-function:var(--ease-silk)] group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpLeft className="h-4 w-4" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="text-base font-extrabold leading-7 text-cream sm:text-lg">{it.title}</p>
                      <p className="mt-1 line-clamp-1 text-[11px] text-gold-light/85 sm:text-xs">{it.category}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}
