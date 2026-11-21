import Link from "next/link";
import { ArrowLeft, Phone } from "lucide-react";
import { productsData, site, type Product } from "@/lib/data";
import { fa } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";

export function ProductCard({ p, index }: { p: Product; index: number }) {
  return (
    <TiltCard intensity={4} className="h-full rounded-[2rem]">
      <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-pine/10 bg-cream shadow-card">
        <Link href={`/products/${p.slug}`} className="relative block overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.image} alt={p.name} width={1254} height={1254} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.05]" />
          <span className="absolute right-4 top-4 rounded-full bg-charcoal/75 px-3.5 py-1.5 text-xs font-medium text-gold-light backdrop-blur-md">سایز {fa(p.sizeRange)}</span>
        </Link>
        <div className="flex flex-1 flex-col p-6 lg:p-7">
          <p className="flex items-center gap-3 text-xs font-medium text-gold-deep">
            <span className="font-latin">{fa(String(index + 1).padStart(2, "0"))}</span>
            <span className="h-px w-6 bg-gold" />
            {p.accent}
          </p>
          <h2 className="mt-3 text-xl font-extrabold leading-9 text-charcoal">
            <Link href={`/products/${p.slug}`} className="transition-colors hover:text-pine">{p.name}</Link>
          </h2>
          <p className="mt-3 line-clamp-3 text-sm leading-8 text-cocoa">{p.excerpt}</p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
            <Button asChild size="sm" variant="dark">
              <Link href={`/products/${p.slug}`}>{productsData.ctaLabel} <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:-translate-x-1" /></Link>
            </Button>
            <a href={`tel:${site.contact.consultationPhone}`} className="inline-flex items-center gap-2 py-2 text-xs text-cocoa transition-colors hover:text-pine">
              <Phone className="h-3.5 w-3.5 text-gold-deep" /> {site.contact.bookingLabel}
            </a>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
