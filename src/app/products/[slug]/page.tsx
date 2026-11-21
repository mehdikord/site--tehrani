import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Check, ChevronLeft } from "lucide-react";
import { getAllProductSlugs, getProduct, productsData, site } from "@/lib/data";
import { fa } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { ContactCTA } from "@/components/home/ContactCTA";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p?.name ?? "محصول", description: p?.excerpt };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const others = productsData.items.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <section className="emerald-stage relative overflow-hidden pb-20 pt-36 text-cream lg:pb-28 lg:pt-44">
        <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="مسیر صفحه" className="mb-10 flex flex-wrap items-center gap-2 text-xs text-sand/60">
            <Link href="/" className="py-1 transition-colors hover:text-gold-light">خانه</Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href="/products" className="py-1 transition-colors hover:text-gold-light">{p.category}</Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-gold-light">{p.accent}</span>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="zoom" className="lg:col-span-6">
              <TiltCard intensity={5} className="rounded-[2.5rem]">
                <div className="gold-border overflow-hidden rounded-[2.5rem] shadow-glow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} width={1254} height={1254} className="aspect-square w-full object-cover" fetchPriority="high" />
                </div>
              </TiltCard>
            </Reveal>
            <Reveal stagger={0.09} className="lg:col-span-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-gold/45 px-3.5 py-1.5 text-xs text-gold-light">سایز {fa(p.sizeRange)}</span>
                <span className="rounded-full border border-cream/20 px-3.5 py-1.5 text-xs text-sand">{p.accent}</span>
              </div>
              <h1 className="mt-6 text-3xl font-black leading-[1.5] sm:text-4xl sm:leading-[1.45] lg:text-5xl lg:leading-[1.4]">{p.name}</h1>
              <div className="mt-6 space-y-2 text-base leading-9 text-sand/85">{p.description.map((d, i) => <p key={i}>{d}</p>)}</div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg"><a href={`tel:${site.contact.consultationPhone}`}><Phone className="h-4 w-4" /> {site.contact.bookingLabel}</a></Button>
                <Button asChild size="lg" variant="ghostLight"><a href={site.social.whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon className="h-4 w-4" /> سفارش در واتساپ</a></Button>
              </div>
              <p className="mt-5 text-xs text-sand/60">{productsData.noteOnPrice}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pattern-paper py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            {p.sections.map((s, i) => (
              <Reveal key={i} delay={(i % 2) * 0.1}>
                <div className="h-full rounded-[2rem] border border-pine/10 bg-cream p-7 shadow-soft lg:p-9">
                  <p className="font-latin text-sm font-bold text-gold-deep">{fa(String(i + 1).padStart(2, "0"))}</p>
                  <h2 className="mt-2 text-xl font-black leading-9 text-charcoal lg:text-2xl lg:leading-10">{s.title}</h2>
                  <ul className="mt-6 space-y-4">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 text-sm leading-8 text-cocoa lg:text-base lg:leading-8">
                        <span className="mt-1.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-pine text-gold-light"><Check className="h-3 w-3" strokeWidth={3} /></span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="text-3xl font-black text-charcoal md:text-4xl">سایر الگوهای ما</h2>
            <Button asChild variant="link"><Link href="/products">همه‌ی الگوها</Link></Button>
          </Reveal>
          <Reveal stagger={0.1} className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/products/${o.slug}`} className="group block overflow-hidden rounded-[2rem] border border-pine/10 bg-cream shadow-soft transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-silk)] hover:-translate-y-2 hover:shadow-card">
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.image} alt={o.name} width={1254} height={1254} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-[1500ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-105" />
                </div>
                <div className="flex items-center justify-between gap-4 p-6">
                  <h3 className="text-lg font-extrabold leading-8 text-charcoal">{o.name}</h3>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-pine/20 text-pine transition-[background-color,color] duration-300 group-hover:bg-pine group-hover:text-gold-light"><ArrowLeft className="h-4 w-4" /></span>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
