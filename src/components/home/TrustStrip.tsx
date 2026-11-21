import { ShieldCheck, CreditCard, Truck, Headphones } from "lucide-react";
import { site } from "@/lib/data";
import { cn, fa } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

const icons = { shield: ShieldCheck, "credit-card": CreditCard, truck: Truck, headset: Headphones } as const;

/** Sits on top of the section above it (rounded sheet), carrying the four buying assurances. */
export function TrustStrip({ overlap = true }: { overlap?: boolean }) {
  return (
    <section aria-label="مزایای خرید" className={cn("relative z-10 bg-ivory px-4 pb-6 pt-10 sm:px-6 md:pt-14", overlap && "-mt-10 rounded-t-[2.5rem] md:rounded-t-[3.5rem]")}>
      <Reveal as="ul" stagger={0.09} className="mx-auto grid max-w-7xl grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
        {site.trustFeatures.map((f, i) => {
          const Icon = icons[f.icon as keyof typeof icons] ?? ShieldCheck;
          return (
            <li key={f.title} className="group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-pine/10 bg-cream p-5 transition-[transform,box-shadow,border-color] duration-500 [transition-timing-function:var(--ease-silk)] hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-soft sm:flex-row sm:items-center md:p-6">
              <span className="grid h-13 w-13 shrink-0 place-items-center rounded-2xl bg-pine text-gold-light transition-transform duration-500 [transition-timing-function:var(--ease-silk)] group-hover:-rotate-6 group-hover:scale-110">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-bold text-charcoal">{f.title}</p>
                <p className="mt-1 text-sm text-taupe">{fa(f.subtitle)}</p>
              </div>
              <span aria-hidden className="font-latin absolute left-4 top-3 text-xs text-pine/25">{fa(String(i + 1).padStart(2, "0"))}</span>
            </li>
          );
        })}
      </Reveal>
    </section>
  );
}
