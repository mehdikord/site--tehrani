import Link from "next/link";
import { Phone, ArrowLeft, Check } from "lucide-react";
import { coursesData } from "@/lib/data";
import { fa } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/motion/SectionHeading";

const blurbs: Record<string, string> = {
  "in-person": "کلاس‌های کارگاهی در آتلیه؛ تمرین عملی و رفع اشکال رو در رو.",
  recorded: "ویدئوهای قدم‌به‌قدم؛ هر زمان و هر جا، با سرعت خودتان.",
  online: "کلاس زنده و تعاملی؛ بدون محدودیت شهر و مسافت.",
};

export function CoursesSection({ full = false }: { full?: boolean }) {
  return (
    <section id="courses" className="relative overflow-hidden bg-ivory py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="آموزش از مبتدی تا پیشرفته" title={coursesData.pageTitle} description={full ? undefined : coursesData.intro} className={full ? undefined : "max-w-3xl"} />

        {/* Expanding panels: hover/focus widens a panel on desktop, stacked cards on mobile */}
        <Reveal stagger={0.12} variant="clip" className="mt-14 flex flex-col gap-4 lg:h-[34rem] lg:flex-row lg:gap-5">
          {coursesData.categories.map((c, i) => (
            <article
              key={c.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-pine shadow-card transition-[flex-grow] duration-700 [transition-timing-function:var(--ease-silk)] sm:aspect-[16/9] lg:aspect-auto lg:flex-[1] lg:focus-within:flex-[2.2] lg:hover:flex-[2.2]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/5" />
              <span className="font-latin absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full border border-cream/30 bg-charcoal/40 text-sm font-bold text-gold-light backdrop-blur-sm">{fa(String(i + 1).padStart(2, "0"))}</span>
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <h3 className="text-2xl font-black leading-10 text-cream lg:text-3xl lg:leading-[1.5]"><Link href={`/courses#${c.id}`} className="after:absolute after:inset-0">{c.title}</Link></h3>
                <p className="mt-2 max-w-sm text-sm leading-7 text-sand/85">{blurbs[c.id]}</p>
                <div className="relative z-10 mt-5 lg:translate-y-3 lg:opacity-0 lg:transition-[opacity,transform] lg:duration-500 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
                  <Button asChild size="sm">
                    <Link href={`/courses#${c.id}`}>مشاهده دوره‌ها <ArrowLeft className="h-3.5 w-3.5" /></Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </Reveal>

        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <Reveal><h3 className="text-2xl font-black text-charcoal lg:text-3xl">سرفصل‌های آموزشی</h3></Reveal>
            <Reveal as="ul" stagger={0.07} className="mt-7 grid gap-x-8 sm:grid-cols-2">
              {coursesData.topics.map((t) => (
                <li key={t} className="flex items-start gap-3 border-b border-pine/10 py-4 text-sm leading-7 text-charcoal sm:text-base sm:leading-8">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pine text-gold-light"><Check className="h-3.5 w-3.5" strokeWidth={2.5} /></span>
                  {t}
                </li>
              ))}
            </Reveal>
          </div>
          <Reveal variant="zoom" className="lg:col-span-5">
            <div className="emerald-stage gold-border relative overflow-hidden rounded-[2rem] p-8 text-cream lg:p-10">
              <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
              <div className="relative">
                <p className="text-sm font-medium text-gold-light">{coursesData.consultation.label}</p>
                <a href={`tel:${coursesData.consultation.phone}`} dir="ltr" className="font-latin mt-3 block text-right text-4xl font-black text-cream transition-colors hover:text-gold-light sm:text-5xl">
                  {fa(coursesData.consultation.phone)}
                </a>
                <p className="mt-5 text-sm leading-8 text-sand/80">برای انتخاب دوره‌ی مناسب سطح شما، همین حالا تماس بگیرید یا فرم تماس را پر کنید.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={`tel:${coursesData.consultation.phone}`}><Phone className="h-4 w-4" /> تماس</a>
                  </Button>
                  <Button asChild variant="ghostLight">
                    <Link href="/contact">فرم تماس</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
