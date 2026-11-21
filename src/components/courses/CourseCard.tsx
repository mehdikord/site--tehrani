import Link from "next/link";
import { ArrowLeft, Clock, Layers, PlayCircle } from "lucide-react";
import { getCourseCategory, type CourseItem } from "@/lib/data";
import { fa, faPrice } from "@/lib/utils";

export function CourseCard({ c }: { c: CourseItem }) {
  const cat = getCourseCategory(c.category);
  return (
    <Link href={`/courses/${c.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-pine/10 bg-cream shadow-soft transition-[transform,box-shadow,border-color] duration-500 [transition-timing-function:var(--ease-silk)] hover:-translate-y-2 hover:border-gold/70 hover:shadow-card">
      <span className="relative block overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={c.poster} alt="" width={1280} height={720} loading="lazy" className="aspect-video w-full object-cover transition-transform duration-[1400ms] [transition-timing-function:var(--ease-silk)] group-hover:scale-[1.06]" />
        <span className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
        <span className="absolute right-4 top-4 rounded-full bg-charcoal/75 px-3.5 py-1.5 text-xs font-medium text-gold-light backdrop-blur-md">{cat?.title}</span>
        <span className="absolute bottom-4 right-4 flex items-center gap-2 text-xs font-medium text-cream"><PlayCircle className="h-5 w-5 text-gold-light" /> پیش‌نمایش دوره</span>
        {c.oldPrice && <span className="absolute left-4 top-4 rounded-full bg-gold px-3 py-1.5 text-xs font-bold text-charcoal">{fa(Math.round((1 - c.price / c.oldPrice) * 100))}٪ تخفیف</span>}
      </span>
      <span className="flex flex-1 flex-col p-6">
        <span className="text-xl font-extrabold leading-9 text-charcoal transition-colors group-hover:text-pine">{c.title}</span>
        <span className="mt-2 line-clamp-2 text-sm leading-7 text-cocoa">{c.excerpt}</span>
        <span className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-taupe">
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-gold-deep" /> {c.duration}</span>
          <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5 text-gold-deep" /> {fa(c.sessions)} جلسه</span>
        </span>
        <span className="mt-6 flex flex-1 items-end justify-between gap-3 border-t border-pine/10 pt-5">
          <span>
            {c.oldPrice && <span className="font-latin block text-xs text-taupe line-through">{faPrice(c.oldPrice)}</span>}
            <span className="font-latin text-xl font-black text-pine">{faPrice(c.price)}</span> <span className="text-xs text-taupe">تومان</span>
          </span>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-pine text-gold-light transition-transform duration-500 [transition-timing-function:var(--ease-silk)] group-hover:-translate-x-1"><ArrowLeft className="h-4 w-4" /></span>
        </span>
      </span>
    </Link>
  );
}
