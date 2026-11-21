import type { Metadata } from "next";
import Link from "next/link";
import { aboutData, site } from "@/lib/data";
import { fa } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { StitchLine } from "@/components/motion/StitchLine";
import { ScrubText } from "@/components/motion/ScrubText";
import { Button } from "@/components/ui/button";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = { title: aboutData.pageTitle, description: aboutData.intro[0] };

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={aboutData.heading} title={aboutData.welcome} description={aboutData.intro[0]} />

      <section className="relative bg-ivory py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal variant="zoom">
                <div className="emerald-stage relative mx-auto max-w-md overflow-hidden rounded-[2.5rem] p-6 shadow-card">
                  <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/brand/portrait.webp" alt={`${site.brand.name}، ${aboutData.signature.role}`} width={1000} height={1090} className="relative w-full" />
                  <div className="relative mt-4 text-center text-cream">
                    <p className="text-2xl font-black text-gold-light">{aboutData.signature.name}</p>
                    <p className="mt-2 text-xs leading-6 text-sand/75">{aboutData.signature.role}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Reveal stagger={0.1} className="space-y-6 text-base leading-9 text-cocoa md:text-lg md:leading-10">
              <p className="text-2xl font-black leading-[1.8] text-pine md:text-3xl md:leading-[1.7]">{aboutData.intro[1]}</p>
              <p>{aboutData.intro[0]}</p>
              <p>{aboutData.intro[2]}</p>
              <p>{aboutData.intro[3]}</p>
              <p>{aboutData.experience}</p>
              <p className="rounded-3xl border-s-4 border-gold bg-cream p-6 font-medium text-charcoal shadow-soft">{aboutData.honors}</p>
            </Reveal>
            <Reveal as="ul" stagger={0.1} className="mt-10 grid grid-cols-3 gap-3 sm:gap-5">
              {aboutData.highlights.map((h) => (
                <li key={h.label} className="rounded-3xl bg-pine p-4 text-center text-cream sm:p-6">
                  <p dir="auto" className="font-latin text-lg font-black text-gold-light sm:text-3xl">{h.value}</p>
                  <p className="mt-2 text-[11px] leading-5 text-sand/80 sm:text-sm sm:leading-6">{h.label}</p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pattern-paper relative py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <StitchLine className="mb-14 opacity-90" />
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal stagger={0.1}>
              <h2 className="text-3xl font-black leading-[1.5] text-charcoal md:text-4xl md:leading-[1.5]">{aboutData.whyTitle}</h2>
              <div className="mt-6 space-y-5 leading-9 text-cocoa">{aboutData.why.map((p, i) => <p key={i}>{p}</p>)}</div>
              <Parallax inner className="mt-8 aspect-[16/10] rounded-[2rem] shadow-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={aboutData.image} alt="آتلیه طراحی و دوخت" loading="lazy" className="h-full w-full object-cover" />
              </Parallax>
            </Reveal>
            <div>
              <Reveal stagger={0.1}>
                <h2 className="text-3xl font-black leading-[1.5] text-charcoal md:text-4xl md:leading-[1.5]">{aboutData.whatTitle}</h2>
                <p className="mt-6 leading-9 text-cocoa">{aboutData.whatIntro}</p>
                <p className="mt-8 font-bold text-pine">{aboutData.activitiesTitle}</p>
              </Reveal>
              <Reveal as="ol" stagger={0.06} className="mt-4">
                {aboutData.activities.map((a, i) => (
                  <li key={a} className="flex items-start gap-4 border-b border-pine/15 py-4 text-sm leading-8 text-charcoal sm:text-base">
                    <span className="font-latin mt-0.5 w-7 shrink-0 text-sm font-bold text-gold-deep">{fa(String(i + 1).padStart(2, "0"))}</span>
                    {a}
                  </li>
                ))}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="emerald-stage relative overflow-hidden py-24 text-cream lg:py-32">
        <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <ScrubText as="h2" text={aboutData.beliefs[0]} className="max-w-5xl text-2xl font-extrabold leading-[1.8] sm:text-4xl sm:leading-[1.7] lg:text-5xl lg:leading-[1.6]" />
          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal stagger={0.1}>
              <h3 className="text-2xl font-black text-gold-light md:text-3xl">{aboutData.beliefTitle}</h3>
              <div className="mt-6 space-y-5 leading-9 text-sand/85">{aboutData.beliefs.slice(1).map((p, i) => <p key={i}>{p}</p>)}</div>
            </Reveal>
            <Reveal stagger={0.1}>
              <h3 className="text-2xl font-black text-gold-light md:text-3xl">{aboutData.dreamTitle}</h3>
              <div className="mt-6 space-y-5 leading-9 text-sand/85">{aboutData.dream.map((p, i) => <p key={i}>{p}</p>)}</div>
              <div className="mt-10 border-t border-cream/10 pt-7">
                <p className="text-sand/70">{aboutData.signature.closing}</p>
                <p className="mt-2 text-3xl font-black text-gold-light">{aboutData.signature.name}</p>
                <p className="mt-2 text-sm text-sand/70">{aboutData.signature.role}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild><Link href="/courses">دوره‌ها و ورکشاپ‌ها</Link></Button>
                <Button asChild variant="ghostLight"><Link href="/products">پک الگوهای آماده</Link></Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
