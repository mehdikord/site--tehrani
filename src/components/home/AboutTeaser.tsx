import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { aboutData, site } from "@/lib/data";
import { fa } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ScrubText } from "@/components/motion/ScrubText";
import { Eyebrow } from "@/components/motion/SectionHeading";

export function AboutTeaser() {
  return (
    <section id="about" className="relative overflow-hidden bg-ivory py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow className="mb-7">{aboutData.heading}</Eyebrow>
          </Reveal>
          <ScrubText as="h2" text={aboutData.intro[0]} className="text-[1.7rem] font-extrabold leading-[1.75] text-charcoal sm:text-4xl sm:leading-[1.7] lg:text-[2.75rem] lg:leading-[1.65]" />
          <Reveal stagger={0.1} className="mt-9 max-w-2xl space-y-5 text-base leading-9 text-cocoa md:text-lg">
            <p className="font-semibold text-pine">{aboutData.intro[1]}</p>
            <p>{aboutData.intro[3]}</p>
          </Reveal>

          <Reveal as="ul" stagger={0.1} className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
            {aboutData.highlights.map((h) => (
              <li key={h.label} className="border-s-2 border-gold ps-4">
                <p dir="auto" className="font-latin text-xl font-black text-pine sm:text-3xl">{h.value}</p>
                <p className="mt-2 text-xs leading-6 text-taupe sm:text-sm">{h.label}</p>
              </li>
            ))}
          </Reveal>

          <Reveal className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="dark">
              <Link href="/about">آشنایی با {site.brand.name} <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-x-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/courses">دوره‌ها و ورکشاپ‌ها</Link>
            </Button>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <Reveal variant="clip">
            <Parallax inner className="aspect-[4/5] rounded-t-[999px] rounded-b-[2.5rem] shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={aboutData.image} alt="طراحی و دوخت لباس در آتلیه" width={1254} height={1254} loading="lazy" className="h-full w-full object-cover" />
            </Parallax>
          </Reveal>
          <Parallax speed={1.25} className="absolute -bottom-8 -right-3 w-[38%] sm:-right-8">
            <div className="overflow-hidden rounded-3xl border-4 border-ivory shadow-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/about/studio.jpg" alt="چرخ خیاطی و ابزار الگوسازی" width={1254} height={1254} loading="lazy" className="aspect-square w-full object-cover" />
            </div>
          </Parallax>
          <Parallax speed={1.12} className="absolute -left-2 top-[18%] sm:-left-6">
            <div className="rounded-3xl bg-pine px-5 py-4 text-center text-cream shadow-card">
              <p className="font-latin text-3xl font-black text-gold-light sm:text-4xl">+{fa(20)}</p>
              <p className="mt-1 text-xs text-sand/80">سال سابقه تدریس</p>
            </div>
          </Parallax>
        </div>
      </div>
    </section>
  );
}
