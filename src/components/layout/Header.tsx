"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Phone, ChevronDown, ArrowLeft } from "lucide-react";
import { site } from "@/lib/data";
import { scrollApi } from "@/lib/device";
import { cn, fa } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { InstagramIcon, WhatsAppIcon, TelegramIcon } from "@/components/ui/brand-icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Step aside while reading down, come back the moment the user scrolls up
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 480);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) scrollApi.lenis?.stop();
    else scrollApi.lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,padding] duration-500 [transition-timing-function:var(--ease-silk)]",
          scrolled ? "py-2.5" : "py-4",
          hidden && !open ? "-translate-y-[120%]" : "translate-y-0"
        )}
      >
        <div className="mx-auto max-w-[88rem] px-3 sm:px-6">
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-full border py-2 pe-2 ps-4 transition-[background-color,border-color,box-shadow] duration-500 sm:ps-5",
              scrolled || open ? "border-gold/20 bg-charcoal/80 shadow-[0_18px_50px_-22px_rgba(0,0,0,0.7)] backdrop-blur-xl" : "border-transparent bg-transparent"
            )}
          >
            <Link href="/" aria-label={site.brand.name} className="group flex shrink-0 items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/logo-light.png" alt={site.brand.name} width={300} height={304} className={cn("w-auto transition-[height,transform] duration-500 [transition-timing-function:var(--ease-silk)] group-hover:scale-105", scrolled ? "h-14" : "h-16 sm:h-[4.75rem]")} />
            </Link>

            <nav aria-label="منوی اصلی" className="hidden items-center lg:flex">
              {site.nav.map((item) => (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-3.5 py-2.5 text-sm transition-colors duration-300 xl:px-4",
                      isActive(item.href) ? "text-gold-light" : "text-cream/80 hover:text-cream"
                    )}
                  >
                    {item.label}
                    {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180" />}
                    <span className={cn("absolute inset-x-4 bottom-1 h-px origin-right bg-gold transition-transform duration-500 [transition-timing-function:var(--ease-silk)]", isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100")} />
                  </Link>
                  {item.children && (
                    <div className="invisible absolute right-0 top-full translate-y-2 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="min-w-60 rounded-3xl border border-gold/20 bg-charcoal/95 p-2 shadow-card backdrop-blur-xl">
                        {item.children.map((c) => (
                          <Link key={c.label} href={c.href} className="flex items-center justify-between gap-6 rounded-2xl px-4 py-3 text-sm text-cream/80 transition-colors hover:bg-cream/5 hover:text-gold-light">
                            {c.label}
                            <ArrowLeft className="h-3.5 w-3.5 opacity-50" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a href={`tel:${site.contact.consultationPhone}`} className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm text-cream/80 transition-colors hover:text-gold-light xl:flex">
                <Phone className="h-4 w-4 text-gold" />
                <span dir="ltr" className="font-latin font-medium">{fa(site.contact.consultationPhone)}</span>
              </a>
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link href={site.primaryCta.href}>{site.primaryCta.label}</Link>
              </Button>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "بستن منو" : "باز کردن منو"}
                aria-expanded={open}
                className="relative grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream lg:hidden"
              >
                <span className={cn("absolute h-px w-5 bg-current transition-transform duration-500 [transition-timing-function:var(--ease-silk)]", open ? "rotate-45" : "-translate-y-1.5")} />
                <span className={cn("absolute h-px w-5 bg-current transition-transform duration-500 [transition-timing-function:var(--ease-silk)]", open ? "-rotate-45" : "translate-y-1.5")} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu lives outside <header> so the header's transform never traps it */}
      <div
        className={cn("emerald-stage fixed inset-0 z-40 overflow-y-auto pb-10 pt-28 transition-[opacity,visibility] duration-500 lg:hidden", open ? "visible opacity-100" : "invisible opacity-0")}
        data-lenis-prevent
        aria-hidden={!open}
      >
        <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
        {/* Any link tap closes the menu (navigation or in-page anchor) */}
        <nav aria-label="منوی موبایل" onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)} className="relative mx-auto flex max-w-xl flex-col px-6">
          {site.nav.map((item, i) => (
            <div
              key={item.label}
              style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
              className={cn("transition-[opacity,transform] duration-700 [transition-timing-function:var(--ease-silk)]", open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0")}
            >
              <Link href={item.href} tabIndex={open ? 0 : -1} className={cn("flex items-center justify-between border-b border-cream/10 py-4 text-2xl font-bold", isActive(item.href) ? "text-gold-light" : "text-cream")}>
                {item.label}
                <span className="font-latin text-xs font-normal text-gold/70">{fa(String(i + 1).padStart(2, "0"))}</span>
              </Link>
              {item.children && (
                <div className="flex flex-wrap gap-2 py-3">
                  {item.children.map((c) => (
                    <Link key={c.label} href={c.href} tabIndex={open ? 0 : -1} className="rounded-full border border-cream/15 px-3.5 py-2 text-xs text-sand">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className={cn("mt-8 flex flex-col gap-4 transition-opacity delay-500 duration-700", open ? "opacity-100" : "opacity-0")}>
            <Button asChild size="lg">
              <Link href={site.primaryCta.href} tabIndex={open ? 0 : -1}>{site.primaryCta.label}</Link>
            </Button>
            <a href={`tel:${site.contact.consultationPhone}`} tabIndex={open ? 0 : -1} className="flex items-center justify-center gap-2 py-2 text-sand">
              <Phone className="h-4 w-4 text-gold" /> {site.contact.consultationLabel}
              <span dir="ltr" className="font-latin">{fa(site.contact.consultationPhone)}</span>
            </a>
            <div className="flex justify-center gap-3">
              {[
                { href: site.social.instagram, Icon: InstagramIcon, label: "اینستاگرام" },
                { href: site.social.whatsapp, Icon: WhatsAppIcon, label: "واتساپ" },
                { href: site.social.telegram, Icon: TelegramIcon, label: "تلگرام" },
              ].map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} tabIndex={open ? 0 : -1} className="grid h-12 w-12 place-items-center rounded-full border border-cream/15 text-cream">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
