"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type RevealVariant = "up" | "fade" | "zoom" | "blur" | "clip" | "side";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  /** seconds */
  delay?: number;
  /** When set, the direct children are revealed one after another (seconds between each). */
  stagger?: number;
  style?: CSSProperties;
  as?: "div" | "section" | "ul" | "ol" | "li" | "p" | "span" | "article" | "header";
};

/**
 * Scroll reveal driven by IntersectionObserver + CSS transitions.
 * No scroll-position maths, so it can never fire at the wrong offset, and content
 * stays visible if JavaScript is unavailable (hidden states are scoped to html.js).
 */
export function Reveal({ children, className, variant = "up", delay = 0, stagger, style, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = 0;
    const show = () => {
      el.classList.add("is-in");
      const count = stagger ? Math.min(el.children.length, 9) : 1;
      // Drop the reveal transition afterwards so it never slows hover/focus transitions down
      done = window.setTimeout(() => el.classList.add("is-done"), (delay + (stagger ?? 0) * count + 1.4) * 1000);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        // Also reveal anything already scrolled past (deep links, reloads mid-page)
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(done);
    };
  }, [delay, stagger]);

  const vars = { ...(delay ? { "--reveal-delay": `${delay}s` } : {}), ...(stagger ? { "--stagger": `${stagger}s` } : {}), ...style } as CSSProperties;
  const attrs = stagger ? { "data-reveal-group": variant } : { "data-reveal": variant };
  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={cn(className)} style={vars} {...attrs}>
      {children}
    </Comp>
  );
}
