import type { Metadata } from "next";
import { Gift } from "lucide-react";
import { coursesData } from "@/lib/data";
import { fa } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { CoursesSection } from "@/components/home/CoursesSection";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ContactCTA } from "@/components/home/ContactCTA";

export const metadata: Metadata = { title: coursesData.pageTitle, description: coursesData.intro };

const giftTitles = ["عضویت در کانال آموزشی الگوهای معجزه‌گر", "آموزش مجازی رسم الگوی بیس بالاتنه تمام‌کرستی", "دوره‌ی اعجاز آستین؛ از رسم الگو تا دوخت نهایی"];

export default function CoursesPage() {
  return (
    <>
      <PageHero eyebrow="حضوری · ضبط‌شده · آنلاین" title={coursesData.pageTitle} description={coursesData.intro} />
      <CoursesSection full />
      <CourseCatalog />
      <section className="bg-ivory py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <Reveal stagger={0.1} className="lg:col-span-5">
            <Eyebrow className="mb-5">هدیه‌ی همراه پک</Eyebrow>
            <h2 className="text-3xl font-black leading-[1.5] text-charcoal md:text-4xl md:leading-[1.5]">{coursesData.bundledTrainings.title}</h2>
            <p className="mt-5 leading-9 text-cocoa">این آموزش‌ها به‌عنوان هدیه همراه پک الگوهای پاورکت ارائه می‌شوند.</p>
            <span className="mt-8 grid h-20 w-20 place-items-center rounded-3xl bg-pine text-gold-light shadow-card"><Gift className="h-9 w-9" strokeWidth={1.4} /></span>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <div className="rounded-[2rem] border border-pine/10 bg-cream p-3 shadow-card sm:p-6">
              <Accordion type="single" collapsible defaultValue="item-0">
                {coursesData.bundledTrainings.items.map((t, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="px-3 last:border-b-0">
                    <AccordionTrigger>
                      <span className="flex items-center gap-4 text-base font-bold leading-8 sm:text-lg">
                        <span className="font-latin text-sm text-gold-deep">{fa(String(i + 1).padStart(2, "0"))}</span>
                        {giftTitles[i] ?? `آموزش ${fa(i + 1)}`}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="ps-9 text-base leading-9">{t}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
