"use client";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Pointer-driven 3D tilt with a soft travelling highlight. Mouse only; touch devices get the plain card. */
export function TiltCard({ children, className, intensity = 7 }: { children: ReactNode; className?: string; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const sheen = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    gsap.to(el, { rotateY: (px - 0.5) * intensity * 2, rotateX: (0.5 - py) * intensity * 2, transformPerspective: 1100, duration: 0.5, ease: "power2.out", overwrite: "auto" });
    if (sheen.current) gsap.to(sheen.current, { opacity: 1, "--sx": `${px * 100}%`, "--sy": `${py * 100}%`, duration: 0.4, overwrite: "auto" });
  };
  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
    if (sheen.current) gsap.to(sheen.current, { opacity: 0, duration: 0.5, overwrite: "auto" });
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn("relative", className)}>
      {children}
      <div
        ref={sheen}
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light"
        style={{ background: "radial-gradient(420px circle at var(--sx, 50%) var(--sy, 50%), rgba(255,246,220,0.55), transparent 60%)" }}
      />
    </div>
  );
}
