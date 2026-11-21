"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpLeft } from "lucide-react";
import { servicesData, site } from "@/lib/data";
import { cn, fa } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/motion/SectionHeading";

const items = servicesData.items;

/** Editorial index of services: a sticky preview frame follows whichever row is hovered, focused or centred on screen. */
export function ServicesShowcase() {
  const list = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // On scroll, the row crossing the middle of the viewport becomes the active one
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    el.querySelectorAll("li[data-index]").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  return (
    <section id="services" className="pattern-paper relative py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={site.brand.organization} title="فعالیت‌های ما" description={servicesData.intro} />
          <Reveal>
            <Button asChild variant="outline">
              <Link href="/services">مشاهده همه خدمات</Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Sticky preview */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-pine shadow-card">
                {items.map((s, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={s.slug}
                    src={s.image}
                    alt=""
                    loading="lazy"
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-[opacity,transform,clip-path] duration-[900ms] [transition-timing-function:var(--ease-silk)]",
                      i === active ? "z-10 scale-100 opacity-100 [clip-path:inset(0_0_0_0)]" : "scale-110 opacity-0 [clip-path:inset(12%_12%_12%_12%)]"
                    )}
                  />
                ))}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-7 text-cream">
                  <p className="max-w-[70%] text-lg font-bold leading-8">{items[active].title}</p>
                  <p className="font-latin text-sm text-sand/80"><span className="text-4xl font-black text-gold-light">{fa(String(active + 1).padStart(2, "0"))}</span> / {fa(String(items.length).padStart(2, "0"))}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Index */}
          <div ref={list} className="lg:col-span-7">
          <Reveal as="ol" stagger={0.06} className="border-t border-pine/15">
            {items.map((s, i) => (
              <li key={s.slug} data-index={i}>
                <Link
                  href={s.cta.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex items-center gap-4 border-b border-pine/15 py-5 transition-[padding] duration-500 [transition-timing-function:var(--ease-silk)] hover:ps-3 sm:gap-6 lg:py-7"
                >
                  <span className={cn("font-latin w-8 shrink-0 text-sm font-bold transition-colors duration-300", i === active ? "text-gold-deep" : "text-taupe")}>{fa(String(i + 1).padStart(2, "0"))}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt="" loading="lazy" className="h-16 w-16 shrink-0 rounded-2xl object-cover lg:hidden" />
                  <span className="min-w-0 flex-1">
                    <span className={cn("block text-lg font-extrabold leading-8 transition-colors duration-300 sm:text-xl lg:text-2xl lg:leading-10", i === active ? "text-pine" : "text-charcoal/75 group-hover:text-pine")}>{s.title}</span>
                    <span className="mt-1 block text-xs text-taupe sm:text-sm">{s.cta.label}</span>
                  </span>
                  <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-[background-color,color,border-color,transform] duration-500 [transition-timing-function:var(--ease-silk)] group-hover:rotate-[-45deg] group-hover:border-pine group-hover:bg-pine group-hover:text-gold-light", i === active ? "border-pine/40 text-pine" : "border-pine/15 text-taupe")}>
                    <ArrowUpLeft className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
