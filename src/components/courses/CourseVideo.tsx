"use client";
import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/** Course preview: poster with a large play button; native controls appear once playback starts. */
export function CourseVideo({ src, poster, title }: { src: string; poster: string; title: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const start = () => {
    setStarted(true);
    video.current?.play().catch(() => setStarted(false));
  };
  return (
    <div className="gold-border relative overflow-hidden rounded-[2rem] bg-charcoal shadow-glow">
      <video ref={video} src={src} poster={poster} controls={started} playsInline preload="none" onEnded={() => setStarted(false)} aria-label={`ویدئوی معرفی ${title}`} className="aspect-video w-full object-cover" />
      <button
        type="button"
        onClick={start}
        aria-label={`پخش ویدئوی معرفی ${title}`}
        className={cn("group absolute inset-0 grid cursor-pointer place-items-center bg-charcoal/25 transition-opacity duration-500", started && "pointer-events-none opacity-0")}
      >
        <span className="relative grid h-20 w-20 place-items-center">
          <span className="absolute inset-0 rounded-full bg-gold/60 animate-[pulse-ring_2.4s_ease-out_infinite]" />
          <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gold text-charcoal shadow-card transition-transform duration-500 [transition-timing-function:var(--ease-silk)] group-hover:scale-110">
            <Play className="h-7 w-7 translate-x-[2px] fill-current" />
          </span>
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-charcoal/75 px-3.5 py-1.5 text-xs font-medium text-cream backdrop-blur-md">ویدئوی کوتاه معرفی دوره</span>
      </button>
    </div>
  );
}
