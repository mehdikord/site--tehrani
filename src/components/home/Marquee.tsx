import { Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

function Row({ words, dark, hidden = false }: { words: string[]; dark: boolean; hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w, i) => (
        <span key={i} className="flex items-center gap-8 pe-8 text-xl font-bold md:gap-12 md:pe-12 md:text-3xl" dir="rtl">
          {w}
          <Scissors className={cn("h-5 w-5 -rotate-90 md:h-6 md:w-6", dark ? "text-gold" : "text-pine")} strokeWidth={1.5} />
        </span>
      ))}
    </div>
  );
}

/** Infinite ribbon. Runs left→right so each Persian phrase enters with its first word leading. */
export function Marquee({ words, className, dark = false }: { words: string[]; className?: string; dark?: boolean }) {
  const half = [...words, ...words, ...words];
  return (
    <div className={cn("relative overflow-hidden py-6 md:py-8", dark ? "bg-charcoal text-sand" : "bg-gold text-charcoal", className)} dir="ltr">
      <div className="flex w-max animate-marquee whitespace-nowrap will-change-transform hover:[animation-play-state:paused]">
        <Row words={half} dark={dark} />
        <Row words={half} dark={dark} hidden />
      </div>
    </div>
  );
}
