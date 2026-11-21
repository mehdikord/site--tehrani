"use client";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK } from "@/lib/device";
import { cn } from "@/lib/utils";

/** Paragraph whose words "ink in" one by one as it travels up the viewport. */
export function ScrubText({ text, className, as: Tag = "p" }: { text: string; className?: string; as?: "p" | "h2" | "h3" }) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          el.querySelectorAll(".sw"),
          { opacity: 0.14 },
          { opacity: 1, ease: "none", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 48%", scrub: 0.5 } }
        );
      });
    },
    { scope: ref, dependencies: [text] }
  );
  const Comp = Tag as any;
  return (
    <Comp ref={ref} className={cn(className)}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="sw">
          {w}{" "}
        </span>
      ))}
    </Comp>
  );
}
