"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { DESKTOP_MOTION } from "@/lib/device";
import { productsData } from "@/lib/data";
import { cn, fa } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/motion/SectionHeading";

const items = productsData.items;

/**
 * Pattern packs. Desktop: a pinned (sticky) horizontal gallery driven by vertical scroll.
 * Touch / reduced motion: the same track becomes a native swipeable carousel.
 */
export function ProductsShowcase() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(DESKTOP_MOTION, () => {
        const track = el.querySelector<HTMLElement>(".hs-track");
        const bar = el.querySelector<HTMLElement>(".hs-bar");
        const count = el.querySelector<HTMLElement>(".hs-count");
        if (!track) return;
        // RTL track: its start is on the right, so it travels rightwards
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: distance,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar) bar.style.transform = `scaleX(${self.progress})`;
              if (count) count.textContent = fa(String(Math.min(items.length, Math.max(1, Math.round(self.progress * (items.length + 0.4))))).padStart(2, "0"));
            },
          },
        });
        gsap.fromTo(el.querySelectorAll(".hs-card-inner"), { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.09, scrollTrigger: { trigger: el, start: "top 55%" } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="products" className="relative bg-charcoal text-cream lg:motion-safe:h-[430svh]">
      <div className="emerald-stage relative flex flex-col justify-center overflow-hidden py-24 lg:py-0 lg:motion-safe:sticky lg:motion-safe:top-0 lg:motion-safe:h-[100svh]">
        <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />

        <div className="no-scrollbar relative snap-x snap-mandatory overflow-x-auto lg:motion-safe:snap-none lg:motion-safe:overflow-visible">
          <ul className="hs-track flex w-max items-center gap-5 px-5 will-change-transform sm:px-8 lg:gap-8 lg:px-[6vw]">
            {/* Intro panel */}
            <li className="w-[82vw] shrink-0 snap-center sm:w-[30rem] lg:w-[34vw]">
              <Eyebrow light className="mb-6">{productsData.category}</Eyebrow>
              <h2 className="text-5xl font-black leading-[1.25] lg:text-7xl lg:leading-[1.2]">
                الگوهای <span className="text-gold-shimmer">معجزه‌گر</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-8 text-sand/80 lg:text-lg lg:leading-9">
                سایزبندی‌شده، تست‌شده و بدون نیاز به پرو؛ برای مزون‌دارها، هنرجوهای حرفه‌ای و کسانی که دنبال کار تمیزند.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild variant="ghostLight">
                  <Link href="/products">مشاهده همه الگوها</Link>
                </Button>
                <span className="flex items-center gap-2 text-xs text-sand/60">
                  <ArrowLeft className="h-4 w-4 animate-pulse text-gold" />
                  <span className="lg:hidden">بکشید</span>
                  <span className="hidden lg:inline">اسکرول کنید</span>
                </span>
              </div>
            </li>

            {items.map((p, i) => (
              <li key={p.slug} className={cn("w-[80vw] shrink-0 snap-center sm:w-[24rem] lg:w-[min(30vw,54svh)]", i % 2 === 1 && "lg:translate-y-8")}>
                <article className="hs-card-inner group relative">
                  <Link href={`/products/${p.slug}`} className="gold-border relative block overflow-hidden rounded-[2rem] shadow-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image} alt={p.name} width={1254} height={1254} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.06]" />
                    <span className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-gradient-to-t from-charcoal via-charcoal/80 to-transparent p-5 pt-14 text-sm font-semibold text-gold-light transition-transform duration-500 [transition-timing-function:var(--ease-silk)] group-hover:translate-y-0">
                      {productsData.ctaLabel}
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-gold text-charcoal"><ArrowLeft className="h-4 w-4" /></span>
                    </span>
                  </Link>
                  <div className="mt-5 flex items-start gap-4">
                    <span className="font-latin text-4xl font-black leading-none text-gold/40">{fa(String(i + 1).padStart(2, "0"))}</span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-extrabold leading-8 text-cream lg:text-xl">
                        <Link href={`/products/${p.slug}`} className="transition-colors hover:text-gold-light">{p.name}</Link>
                      </h3>
                      <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-sand/70">
                        <span className="rounded-full border border-gold/40 px-3 py-1 text-gold-light">سایز {fa(p.sizeRange)}</span>
                        <span className="rounded-full border border-cream/15 px-3 py-1">{p.accent}</span>
                      </p>
                    </div>
                  </div>
                </article>
              </li>
            ))}

            {/* Outro panel */}
            <li className="w-[80vw] shrink-0 snap-center sm:w-[24rem] lg:w-[26vw]">
              <div className="gold-border rounded-[2rem] bg-cream/5 p-8 backdrop-blur-sm lg:p-10">
                <p className="text-2xl font-extrabold leading-10 lg:text-3xl lg:leading-[1.6]">کدام پک برای شما مناسب‌تر است؟</p>
                <p className="mt-4 text-sm leading-8 text-sand/75">{productsData.noteOnPrice}</p>
                <Button asChild className="mt-7">
                  <Link href="/contact">مشاوره رایگان <ArrowLeft className="h-4 w-4" /></Link>
                </Button>
              </div>
            </li>
          </ul>
        </div>

        {/* Progress rail (desktop scene only) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden px-[6vw] lg:motion-safe:block">
          <div className="flex items-center gap-5">
            <p className="font-latin text-sm text-sand/60"><span className="hs-count text-lg font-black text-gold-light">{fa("01")}</span> / {fa(String(items.length).padStart(2, "0"))}</p>
            <div className="h-px flex-1 bg-cream/15"><div className="hs-bar h-px origin-right scale-x-0 bg-gold" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
