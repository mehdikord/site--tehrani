"use client";
import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK } from "@/lib/device";
import { cn } from "@/lib/utils";

/**
 * Scroll parallax. `speed` < 1 lags behind the page, > 1 runs ahead of it.
 * Pass `inner` for images inside a clipped frame (the child is oversized and slides within it).
 */
export function Parallax({
  children,
  speed = 0.85,
  className,
  rotate = 0,
  inner = false,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  rotate?: number;
  inner?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        if (inner) {
          const target = el.firstElementChild;
          if (!target) return;
          gsap.fromTo(target, { yPercent: -9, scale: 1.2 }, { yPercent: 9, scale: 1.2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
          return;
        }
        const dist = (1 - speed) * 180;
        gsap.fromTo(el, { y: dist, rotate: -rotate }, { y: -dist, rotate, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
      });
    },
    { scope: ref, dependencies: [speed, rotate, inner] }
  );
  return (
    <div ref={ref} className={cn(inner && "overflow-hidden", className)}>
      {children}
    </div>
  );
}
