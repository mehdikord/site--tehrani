import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BarChart3, Check, ChevronLeft, Clock, Layers, MonitorPlay, PlayCircle, Users } from "lucide-react";
import { coursesData, getCourse, getCourseCategory, site, aboutData } from "@/lib/data";
import { fa, faPrice } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/SectionHeading";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CourseVideo } from "@/components/courses/CourseVideo";
import { EnrollCard } from "@/components/courses/EnrollCard";
import { CourseCard } from "@/components/courses/CourseCard";
import { ContactCTA } from "@/components/home/ContactCTA";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return coursesData.items.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = getCourse(slug);
  return { title: c?.title ?? "دوره", description: c?.excerpt };
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-40 border-t border-pine/10 pt-12 first:border-t-0 first:pt-0">
      <Reveal>
        <h2 className="text-2xl font-black text-charcoal lg:text-3xl">{title}</h2>
      </Reveal>
      <div className="mt-7">{children}</div>
    </section>
  );
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const c = getCourse(slug);
  if (!c) notFound();
  const cat = getCourseCategory(c.category);
  const lessonCount = c.syllabus.reduce((n, s) => n + s.lessons.length, 0);
  const related = coursesData.items.filter((x) => x.slug !== c.slug).sort((a, b) => Number(b.category === c.category) - Number(a.category === c.category)).slice(0, 3);
  const meta = [
    { Icon: MonitorPlay, label: "نوع دوره", value: cat?.title ?? "" },
    { Icon: Clock, label: "مدت", value: c.duration },
    { Icon: Layers, label: "جلسات", value: `${fa(c.sessions)} جلسه` },
    { Icon: BarChart3, label: "سطح", value: c.level },
  ];
  const tabs = [
    { href: "#about", label: "معرفی" },
    { href: "#outcomes", label: "چه یاد می‌گیرید" },
    { href: "#syllabus", label: "سرفصل‌ها" },
    { href: "#teacher", label: "مدرس" },
    { href: "#faq", label: "سؤالات متداول" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="emerald-stage relative overflow-hidden pb-16 pt-36 text-cream lg:pb-24 lg:pt-44">
        <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="مسیر صفحه" className="mb-9 flex flex-wrap items-center gap-2 text-xs text-sand/60">
            <Link href="/" className="py-1 transition-colors hover:text-gold-light">خانه</Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href="/courses" className="py-1 transition-colors hover:text-gold-light">{coursesData.pageTitle}</Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href={`/courses#${c.category}`} className="py-1 text-gold-light">{cat?.title}</Link>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <Reveal stagger={0.09} className="lg:col-span-6">
              <Eyebrow light>{c.subtitle}</Eyebrow>
              <h1 className="mt-5 text-4xl font-black leading-[1.4] sm:text-5xl sm:leading-[1.35] lg:text-6xl lg:leading-[1.3]">{c.title}</h1>
              <p className="mt-6 max-w-xl text-base leading-9 text-sand/85 lg:text-lg">{c.excerpt}</p>
              <dl className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {meta.map(({ Icon, label, value }) => (
                  <div key={label} className="rounded-2xl border border-cream/10 bg-cream/5 p-4 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.6} />
                    <dt className="mt-3 text-xs text-sand/60">{label}</dt>
                    <dd className="mt-1 text-sm font-bold leading-6 text-cream">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button asChild size="lg"><a href="#enroll">ثبت‌نام در دوره</a></Button>
                <p><span className="font-latin text-2xl font-black text-gold-light">{faPrice(c.price)}</span> <span className="text-sm text-sand/75">تومان</span></p>
              </div>
            </Reveal>
            <Reveal variant="zoom" className="lg:col-span-6">
              <CourseVideo src={c.video} poster={c.poster} title={c.title} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* In-page navigation: sticky only while the course content is on screen */}
      <div>
      <div className="sticky top-0 z-30 border-b border-pine/10 bg-ivory/90 backdrop-blur-xl">
        <nav aria-label="بخش‌های صفحه" className="no-scrollbar mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6">
          {tabs.map((t) => (
            <a key={t.href} href={t.href} className="shrink-0 border-b-2 border-transparent px-4 py-4 text-sm font-medium text-cocoa transition-colors hover:border-gold hover:text-pine">{t.label}</a>
          ))}
        </nav>
      </div>

      <section className="bg-ivory py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
          <div className="space-y-12 lg:col-span-8">
            <Block id="about" title="درباره‌ی این دوره">
              <Reveal stagger={0.08} className="space-y-5 text-base leading-9 text-cocoa lg:text-lg lg:leading-10">
                {c.description.map((d, i) => <p key={i}>{d}</p>)}
              </Reveal>
              <Reveal className="mt-8">
                <p className="text-sm font-bold text-pine">این دوره برای چه کسانی مناسب است؟</p>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {c.audience.map((a) => (
                    <li key={a} className="flex items-center gap-2 rounded-full border border-pine/15 bg-cream px-4 py-2.5 text-sm text-charcoal"><Users className="h-4 w-4 text-gold-deep" />{a}</li>
                  ))}
                </ul>
              </Reveal>
            </Block>

            <Block id="outcomes" title="در این دوره چه یاد می‌گیرید؟">
              <Reveal as="ul" stagger={0.06} className="grid gap-3 sm:grid-cols-2">
                {c.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 rounded-2xl border border-pine/10 bg-cream p-4 text-sm leading-7 text-charcoal sm:text-base">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pine text-gold-light"><Check className="h-3.5 w-3.5" strokeWidth={2.5} /></span>
                    {o}
                  </li>
                ))}
              </Reveal>
            </Block>

            <Block id="syllabus" title="سرفصل‌های دوره">
              <Reveal>
                <p className="mb-5 text-sm text-taupe">{fa(c.syllabus.length)} فصل · {fa(lessonCount)} درس · {c.duration}</p>
                <div className="rounded-[2rem] border border-pine/10 bg-cream p-2 shadow-soft sm:p-4">
                  <Accordion type="multiple" defaultValue={["s-0"]}>
                    {c.syllabus.map((s, i) => (
                      <AccordionItem key={s.title} value={`s-${i}`} className="px-3 last:border-b-0 sm:px-4">
                        <AccordionTrigger>
                          <span className="flex flex-1 items-center gap-4">
                            <span className="font-latin grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pine text-sm font-bold text-gold-light">{fa(String(i + 1).padStart(2, "0"))}</span>
                            <span className="flex-1 text-base font-bold leading-8 text-charcoal sm:text-lg">{s.title}</span>
                            <span className="hidden text-xs font-normal text-taupe sm:block">{fa(s.lessons.length)} درس · {s.duration}</span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-1 ps-14">
                            {s.lessons.map((l) => (
                              <li key={l} className="flex items-center gap-3 py-2 text-sm text-cocoa sm:text-base"><PlayCircle className="h-4 w-4 shrink-0 text-gold-deep" />{l}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Reveal>
            </Block>

            <Block id="teacher" title="مدرس دوره">
              <Reveal>
                <div className="emerald-stage gold-border relative grid items-center gap-6 overflow-hidden rounded-[2rem] p-6 text-cream sm:grid-cols-[11rem_1fr] sm:p-8">
                  <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/brand/portrait.webp" alt={site.brand.name} width={1000} height={1090} loading="lazy" className="relative mx-auto w-40 sm:w-full" />
                  <div className="relative">
                    <p className="text-2xl font-black text-gold-light">{site.brand.name}</p>
                    <p className="mt-1 text-sm text-sand/75">{aboutData.signature.role}</p>
                    <p className="mt-4 text-sm leading-8 text-sand/85">{aboutData.intro[1]}؛ با بیش از {fa(20)} سال سابقه‌ی تدریس و {fa(8)} تقدیرنامه از جشنواره‌ی بین‌المللی مد و لباس فجر.</p>
                    <Button asChild size="sm" variant="ghostLight" className="mt-5"><Link href="/about">بیشتر بدانید</Link></Button>
                  </div>
                </div>
              </Reveal>
            </Block>

            <Block id="faq" title="سؤالات متداول">
              <Reveal>
                <Accordion type="single" collapsible>
                  {c.faq.map((f, i) => (
                    <AccordionItem key={f.q} value={`f-${i}`}>
                      <AccordionTrigger><span className="text-base font-bold leading-8">{f.q}</span></AccordionTrigger>
                      <AccordionContent className="text-base leading-9">{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Reveal>
            </Block>
          </div>

          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-20">
              <EnrollCard course={c} />
            </div>
          </aside>
        </div>
      </section>

      </div>

      <section className="pattern-paper py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="text-3xl font-black text-charcoal md:text-4xl">دوره‌های دیگر</h2>
            <Button asChild variant="link"><Link href="/courses#catalog">همه‌ی دوره‌ها</Link></Button>
          </Reveal>
          <Reveal stagger={0.1} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((r) => <div key={r.slug}><CourseCard c={r} /></div>)}
          </Reveal>
        </div>
      </section>

      {/* Mobile purchase bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-gold/25 bg-charcoal/95 px-4 py-3 text-cream backdrop-blur-xl lg:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <p><span className="font-latin text-xl font-black text-gold-light">{faPrice(c.price)}</span> <span className="text-xs text-sand/75">تومان</span></p>
        <Button asChild><a href="#enroll">ثبت‌نام در دوره</a></Button>
      </div>

      <ContactCTA />
    </>
  );
}
