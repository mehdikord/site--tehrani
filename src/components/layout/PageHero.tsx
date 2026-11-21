import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Eyebrow } from "@/components/motion/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";

export function PageHero({ eyebrow, title, description, image = "/images/banners/emerald.jpg" }: { eyebrow?: string; title: string; description?: string; image?: string }) {
  return (
    <section className="emerald-stage relative overflow-hidden pb-24 pt-44 text-cream md:pb-28 md:pt-52">
      <Parallax inner className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover opacity-45" fetchPriority="high" />
      </Parallax>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-charcoal" />
      <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal stagger={0.1} className="max-w-3xl">
          <nav aria-label="مسیر صفحه" className="mb-8 flex items-center gap-2 text-xs text-sand/60">
            <Link href="/" className="py-1 transition-colors hover:text-gold-light">خانه</Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-gold-light">{title}</span>
          </nav>
          {eyebrow && <Eyebrow light className="mb-5">{eyebrow}</Eyebrow>}
          <h1 className="text-4xl font-black leading-[1.3] sm:text-5xl sm:leading-[1.3] md:text-6xl md:leading-[1.25] lg:text-7xl lg:leading-[1.2]">{title}</h1>
          {description && <p className="mt-7 max-w-2xl text-base leading-8 text-sand/80 md:text-lg md:leading-9">{description}</p>}
        </Reveal>
      </div>
      <div className="tape absolute inset-x-0 bottom-0 h-2.5 opacity-80" />
    </section>
  );
}
