import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({ children, light = false, className }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-sm font-medium", light ? "text-gold-light" : "text-gold-deep", className)}>
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inset-0 rounded-full bg-gold" />
        <span className="absolute inset-0 rounded-full bg-gold animate-[pulse-ring_2.4s_ease-out_infinite]" />
      </span>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal stagger={0.1} className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow light={light} className={cn("mb-5", align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <h2 className={cn("text-4xl font-black leading-[1.25] md:text-5xl md:leading-[1.25] lg:text-6xl lg:leading-[1.2]", light ? "text-cream" : "text-charcoal")}>{title}</h2>
      {description && <p className={cn("mt-6 text-base leading-8 md:text-lg md:leading-9", light ? "text-sand/80" : "text-cocoa")}>{description}</p>}
    </Reveal>
  );
}
