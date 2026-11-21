"use client";
import { useEffect, useRef, useState } from "react";
import { Play, ArrowLeft, ArrowRight, ExternalLink, Quote } from "lucide-react";
import { testimonialsData, site } from "@/lib/data";
import { cn, fa } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/SectionHeading";
import { InstagramIcon } from "@/components/ui/brand-icons";

const ordinals = ["اول", "دوم", "سوم", "چهارم", "پنجم", "ششم", "هفتم", "هشتم"];

/** Student testimonials as a swipeable reel with clear controls, plus the Instagram community card. */
export function TestimonialsSection() {
  const rail = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const count = testimonialsData.videoCount;

  // The active card is the one resting at the rail's leading (right) edge
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.children[0] as HTMLElement | undefined;
      const step = (card?.offsetWidth ?? 320) + 20;
      const atEnd = Math.abs(el.scrollLeft) + el.clientWidth >= el.scrollWidth - 4;
      setIndex(atEnd ? el.children.length - 1 : Math.min(el.children.length - 1, Math.round(Math.abs(el.scrollLeft) / step)));
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    const step = (card?.offsetWidth ?? 320) + 20;
    // RTL rail: "next" moves towards negative scrollLeft
    el.scrollBy({ left: -dir * step, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="relative scroll-mt-24 overflow-hidden bg-ivory py-24 lg:py-36">
      <Quote aria-hidden className="pointer-events-none absolute -top-6 left-[4%] h-56 w-56 text-pine/[0.05] lg:h-80 lg:w-80" strokeWidth={1} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal stagger={0.1} className="max-w-2xl">
            <Eyebrow className="mb-5">{testimonialsData.pageTitle}</Eyebrow>
            <h2 className="text-4xl font-black leading-[1.3] text-charcoal md:text-5xl md:leading-[1.3] lg:text-6xl lg:leading-[1.25]">
              از زبان <span className="text-pine">خودِ هنرجوها</span> بشنوید
            </h2>
            <p className="mt-5 text-base leading-8 text-cocoa md:text-lg md:leading-9">{testimonialsData.videoSectionTitle}؛ کوتاه، واقعی و بدون واسطه.</p>
          </Reveal>
          <Reveal className="flex items-center gap-4">
            <p className="font-latin text-sm text-taupe"><span className="text-2xl font-black text-pine">{fa(String(index + 1).padStart(2, "0"))}</span> / {fa(String(count).padStart(2, "0"))}</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="ویدئوی قبلی" className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-pine/25 text-pine transition-[background-color,color,opacity,transform] duration-300 hover:bg-pine hover:text-gold-light active:scale-95 disabled:pointer-events-none disabled:opacity-30">
                <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => go(1)} disabled={index >= count - 1} aria-label="ویدئوی بعدی" className="grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-pine text-gold-light transition-[background-color,opacity,transform] duration-300 hover:bg-pine-deep active:scale-95 disabled:pointer-events-none disabled:opacity-30">
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Reel */}
      <Reveal variant="fade" className="mt-12 lg:mt-16">
        <ul ref={rail} data-lenis-prevent-touch className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-10 pt-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
          {Array.from({ length: count }).map((_, i) => (
            <li key={i} data-i={i} className="w-[78vw] shrink-0 snap-start sm:w-[24rem] lg:w-[27rem]">
              <a
                href={testimonialsData.externalUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "group block overflow-hidden rounded-[2rem] border bg-cream p-3 shadow-soft transition-[transform,box-shadow,border-color] duration-500 [transition-timing-function:var(--ease-silk)] hover:-translate-y-2 hover:rotate-0 hover:border-gold/70 hover:shadow-card",
                  i === index ? "border-gold/60" : "border-pine/10",
                  i % 2 ? "lg:rotate-[1.2deg]" : "lg:-rotate-[1.2deg]"
                )}
              >
                <span className="relative block overflow-hidden rounded-[1.4rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/testimonials/v${i + 1}.jpg`} alt="" width={760} height={670} loading="lazy" className="aspect-[9/8] w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-105" />
                  <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center">
                    <span className="absolute inset-0 rounded-full bg-cream/70 animate-[pulse-ring_2.4s_ease-out_infinite]" />
                    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-cream text-pine shadow-soft transition-[background-color,color,transform] duration-500 [transition-timing-function:var(--ease-silk)] group-hover:scale-110 group-hover:bg-gold group-hover:text-charcoal">
                      <Play className="h-6 w-6 translate-x-[1px] fill-current" />
                    </span>
                  </span>
                </span>
                <span className="flex items-center justify-between gap-3 px-3 pb-2 pt-4">
                  <span>
                    <span className="block text-lg font-extrabold text-charcoal">روایت هنرجوی {ordinals[i] ?? fa(i + 1)}</span>
                    <span className="mt-1 block text-xs text-taupe">خریدار پک الگوهای آماده</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-pine">
                    تماشا <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Progress dots */}
      <div className="flex justify-center gap-2" aria-hidden>
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className={cn("h-1.5 rounded-full transition-[width,background-color] duration-500", i === index ? "w-8 bg-pine" : "w-1.5 bg-pine/20")} />
        ))}
      </div>

      {/* Instagram community */}
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:mt-20">
        <Reveal variant="zoom">
          <a href={site.social.instagram} target="_blank" rel="noreferrer" className="emerald-stage gold-border group relative grid items-center gap-8 overflow-hidden rounded-[2.5rem] p-7 text-cream sm:p-10 lg:grid-cols-12 lg:p-0">
            <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
            <div className="relative lg:col-span-7 lg:p-14">
              <p className="flex items-center gap-2 text-sm font-medium text-gold-light"><InstagramIcon className="h-4 w-4" /> <span dir="ltr">@{site.social.instagramHandle}</span></p>
              <p className="mt-4 text-3xl font-black leading-[1.5] sm:text-4xl sm:leading-[1.45] lg:text-5xl lg:leading-[1.4]">
                به جمع <span className="text-gold-shimmer">+{fa(242)} هزار</span> همراه ما در اینستاگرام بپیوندید
              </p>
              <p className="mt-4 max-w-md text-sm leading-8 text-sand/80">نمونه‌دوخت هنرجوها، نکته‌های الگو و دوخت و خبر دوره‌های جدید، هر روز.</p>
              <Button asChild className="mt-7"><span>دنبال کردن صفحه <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" /></span></Button>
            </div>
            <div className="relative mx-auto h-72 w-full max-w-xs lg:col-span-5 lg:h-[26rem] lg:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/instagram.jpg" alt={`صفحه اینستاگرام ${site.brand.name}`} width={952} height={1652} loading="lazy" className="absolute left-1/2 top-6 w-[72%] -translate-x-1/2 rotate-6 rounded-[1.75rem] shadow-card transition-transform duration-700 [transition-timing-function:var(--ease-silk)] group-hover:-translate-y-4 group-hover:rotate-3 lg:top-10 lg:w-[62%]" />
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
