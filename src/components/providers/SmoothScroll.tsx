"use client";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollApi } from "@/lib/device";

const HEADER_OFFSET = -96;

function scrollToHash(hash: string, immediate = false) {
  if (!hash || hash === "#") return false;
  let el: Element | null = null;
  try {
    el = document.querySelector(decodeURIComponent(hash));
  } catch {
    return false;
  }
  if (!el) return false;
  if (scrollApi.lenis) scrollApi.lenis.scrollTo(el as HTMLElement, { offset: HEADER_OFFSET, immediate });
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET });
  return true;
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Lenis ⇄ GSAP ticker ⇄ ScrollTrigger
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!reduced) {
      lenis = new Lenis({ duration: 1.1, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, syncTouch: false });
      scrollApi.lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // In-page anchors (#id or /#id on the same page) scroll smoothly instead of jumping
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      if (scrollToHash(url.hash)) {
        e.preventDefault();
        history.replaceState(null, "", url.hash);
      }
    };
    document.addEventListener("click", onClick);

    // Layout can shift once fonts and images settle; keep trigger positions honest
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      scrollApi.lenis = null;
    };
  }, []);

  // Route changes: start at the top (or at the hash target) and re-measure every trigger
  useEffect(() => {
    const hash = window.location.hash;
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (hash) scrollToHash(hash, true);
    }, 120);
    if (!hash) {
      if (scrollApi.lenis) scrollApi.lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    }
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
