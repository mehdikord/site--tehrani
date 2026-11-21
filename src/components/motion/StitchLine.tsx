"use client";
import { useId, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** A dashed "stitch" that is sewn across the page as the user scrolls, led by a needle. */
export function StitchLine({ className, path = "M0,40 C 200,0 400,80 600,40 S 1000,0 1200,40", color = "var(--color-gold)" }: { className?: string; path?: string; color?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const maskId = `stitch-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  useGSAP(
    () => {
      const svg = ref.current;
      if (!svg) return;
      const line = svg.querySelector<SVGPathElement>(".stitch-path");
      const mask = svg.querySelector<SVGPathElement>(".mask-path");
      const needle = svg.querySelector<SVGGElement>(".needle");
      if (!line || !mask || !needle) return;
      const len = line.getTotalLength();
      const place = (t: number) => {
        const a = line.getPointAtLength(t * len);
        const b = line.getPointAtLength(Math.min(len, t * len + 2));
        needle.setAttribute("transform", `translate(${a.x},${a.y}) rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI})`);
      };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        place(1);
        return;
      }
      gsap.set(mask, { strokeDasharray: len, strokeDashoffset: len });
      place(0);
      const state = { t: 0 };
      gsap.to(state, {
        t: 1,
        ease: "none",
        scrollTrigger: { trigger: svg, start: "top 88%", end: "top 30%", scrub: 0.8 },
        onUpdate: () => {
          mask.style.strokeDashoffset = String(len * (1 - state.t));
          place(state.t);
        },
      });
    },
    { scope: ref }
  );
  return (
    <svg ref={ref} viewBox="0 0 1200 80" preserveAspectRatio="none" className={cn("h-16 w-full overflow-visible", className)} aria-hidden>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-20" y="-20" width="1240" height="120">
          <path className="mask-path" d={path} fill="none" stroke="#fff" strokeWidth="8" />
        </mask>
      </defs>
      <path className="stitch-path" d={path} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="10 8" mask={`url(#${maskId})`} vectorEffect="non-scaling-stroke" />
      <g className="needle">
        <line x1="-26" y1="0" x2="10" y2="0" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="-22" cy="0" r="2.2" fill="var(--color-pine)" />
      </g>
    </svg>
  );
}
