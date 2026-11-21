import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft, PenTool, Ruler, Scissors, Sparkles, Layers, Package, Play, Briefcase, MessageCircle, Route, GraduationCap, LifeBuoy } from "lucide-react";
import { servicesData, site } from "@/lib/data";
import { cn, fa } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StitchLine } from "@/components/motion/StitchLine";
import { SectionHeading } from "@/components/motion/SectionHeading";
import { Marquee } from "@/components/home/Marquee";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = { title: servicesData.pageTitle, description: servicesData.intro };

const icons = { pen: PenTool, ruler: Ruler, scissors: Scissors, sparkles: Sparkles, layers: Layers, package: Package, play: Play, briefcase: Briefcase } as const;

// Bento rhythm on a 4-column grid: one hero tile, one wide tile, six compact tiles
const spans = ["col-span-2 lg:row-span-2", "", "", "", "", "col-span-2", "", ""];

const steps = [
  { Icon: MessageCircle, title: "مشاوره رایگان", text: "سطح، هدف و زمان شما را می‌شنویم." },
  { Icon: Route, title: "انتخاب مسیر", text: "دوره یا پک الگوی مناسب را با هم انتخاب می‌کنیم." },
  { Icon: GraduationCap, title: "یادگیری و اجرا", text: "آموزش اصولی و قدم‌به‌قدم تا دوخت نهایی." },
  { Icon: LifeBuoy, title: "پشتیبانی", text: "برای رفع اشکال کنارتان می‌مانیم." },
];

export default function ServicesPage() {
  const items = servicesData.items;
  return (
    <>
      <PageHero eyebrow="فعالیت‌های ما" title={servicesData.pageTitle} description={servicesData.intro} />

      <section className="pattern-paper relative py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow={site.brand.organization} title="هشت مسیر، یک مقصد: خیاط حرفه‌ای" />
            <Reveal>
              <p className="font-latin text-sm text-taupe"><span className="text-5xl font-black text-pine">{fa(String(items.length).padStart(2, "0"))}</span> خدمت تخصصی</p>
            </Reveal>
          </div>

          <Reveal as="ul" variant="zoom" stagger={0.07} className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-16 lg:auto-rows-[17rem] lg:grid-cols-4">
            {items.map((s, i) => {
              const Icon = icons[s.icon as keyof typeof icons] ?? Sparkles;
              const big = i === 0;
              return (
                <li key={s.slug} className={cn("min-h-[15rem] sm:min-h-[18rem] lg:min-h-0", spans[i % spans.length])}>
                  <Link href={s.cta.href} className="gold-border group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-pine p-4 text-cream shadow-card sm:rounded-[2rem] sm:p-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-110" />
                    <span className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/20 transition-opacity duration-500 group-hover:opacity-90" />
                    <span className="absolute inset-0 bg-pine/0 transition-colors duration-500 group-hover:bg-pine/35" />

                    <span className="relative flex items-start justify-between">
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cream/10 text-gold-light backdrop-blur-md transition-[background-color,color,transform] duration-500 [transition-timing-function:var(--ease-silk)] group-hover:-rotate-6 group-hover:bg-gold group-hover:text-charcoal sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <span className="font-latin text-sm font-bold text-gold-light/80">{fa(String(i + 1).padStart(2, "0"))}</span>
                    </span>

                    <span className="relative">
                      <span className={cn("block font-extrabold leading-8", big ? "text-xl sm:text-3xl sm:leading-[1.5] lg:text-4xl lg:leading-[1.45]" : "text-base sm:text-xl sm:leading-9")}>{s.title}</span>
                      <span className="mt-3 flex items-center justify-between gap-3 border-t border-cream/15 pt-3 text-xs text-sand/85 sm:text-sm">
                        {s.cta.label}
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/30 transition-[background-color,color,border-color,transform] duration-500 [transition-timing-function:var(--ease-silk)] group-hover:-rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal">
                          <ArrowUpLeft className="h-4 w-4" />
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </Reveal>
        </div>
      </section>

      <Marquee words={items.map((s) => s.title)} />

      {/* How we work */}
      <section className="relative bg-ivory py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="center" eyebrow="مسیر همراهی" title="از اولین تماس تا آخرین کوک" />
          <div className="relative mt-14">
            <StitchLine className="absolute inset-x-0 top-4 hidden lg:block" />
            <Reveal as="ol" stagger={0.12} className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ Icon, title, text }, i) => (
                <li key={title} className="rounded-[2rem] border border-pine/10 bg-cream p-7 text-center shadow-soft transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-silk)] hover:-translate-y-2 hover:shadow-card">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pine text-gold-light ring-8 ring-ivory"><Icon className="h-7 w-7" strokeWidth={1.5} /></span>
                  <p className="font-latin mt-5 text-xs font-bold text-gold-deep">گام {fa(i + 1)}</p>
                  <h3 className="mt-1 text-xl font-black text-charcoal">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-cocoa">{text}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
