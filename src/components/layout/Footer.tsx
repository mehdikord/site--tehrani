import Link from "next/link";
import { MapPin, Phone, Clock, ArrowUp } from "lucide-react";
import { InstagramIcon, WhatsAppIcon, TelegramIcon } from "@/components/ui/brand-icons";
import { site } from "@/lib/data";
import { fa } from "@/lib/utils";

export function Footer() {
  const socials = [
    { href: site.social.instagram, Icon: InstagramIcon, label: "اینستاگرام" },
    { href: site.social.whatsapp, Icon: WhatsAppIcon, label: "واتساپ" },
    { href: site.social.telegram, Icon: TelegramIcon, label: "تلگرام" },
  ];
  return (
    <footer className="relative overflow-hidden bg-charcoal text-sand">
      <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[70rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-pine/50 blur-[130px]" />
      <div className="hairline relative" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/brand/logo-light.png" alt={site.brand.name} width={300} height={304} loading="lazy" className="h-28 w-auto" />
            <p className="mt-6 text-lg font-bold text-cream">{site.brand.organization}</p>
            <p className="mt-3 max-w-md text-sm leading-8 text-sand/70">{site.brand.footerAbout}</p>
            <div className="mt-7 flex gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-12 w-12 place-items-center rounded-full border border-cream/15 text-cream transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-charcoal">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-base font-bold text-cream">دسترسی سریع</h3>
            <ul className="mt-5 space-y-1 text-sm">
              {[...site.quickLinks, { label: "خدمات", href: "/services" }, { label: "نمونه‌کارها", href: "/portfolio" }, { label: "درباره ما", href: "/about" }, { label: "تماس با ما", href: "/contact" }].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 py-2 text-sand/75 transition-colors hover:text-gold-light">
                    <span className="h-px w-3 bg-gold/60 transition-[width] duration-300 group-hover:w-6" /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-base font-bold text-cream">{site.contact.infoTitle.replace(":", "")}</h3>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-sand/75">
              <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" />{fa(site.contact.address)}</li>
              <li className="flex gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-gold" />
                <span className="flex flex-col">
                  <a dir="ltr" href={`tel:${site.contact.phone}`} className="font-latin self-end transition-colors hover:text-gold-light">{fa(site.contact.phone)}</a>
                  <a dir="ltr" href={`tel:${site.contact.consultationPhone}`} className="font-latin self-end transition-colors hover:text-gold-light">{fa(site.contact.consultationPhone)}</a>
                </span>
              </li>
              <li className="flex gap-3"><Clock className="mt-1 h-4 w-4 shrink-0 text-gold" />{fa(site.contact.workingHours)}</li>
            </ul>
            <a href={site.social.enamad} target="_blank" rel="noreferrer" aria-label="نماد اعتماد الکترونیکی" className="mt-6 inline-grid h-24 w-24 place-items-center rounded-2xl bg-cream p-2 transition-transform duration-300 hover:-translate-y-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brand/enamad.png" alt="نماد اعتماد الکترونیکی" width={125} height={136} loading="lazy" className="h-full w-auto" />
            </a>
          </div>
        </div>

        <p aria-hidden dir="ltr" className="text-outline-gold pointer-events-none mt-16 select-none whitespace-nowrap text-center text-[11.5vw] font-black uppercase leading-none lg:text-[9.2vw]">
          {site.brand.latinName}
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-sand/55 sm:flex-row">
          <p>{site.brand.copyright}</p>
          <a href="#top" className="group inline-flex items-center gap-2 py-2 transition-colors hover:text-gold-light">
            بازگشت به بالا
            <span className="grid h-8 w-8 place-items-center rounded-full border border-cream/15 transition-transform duration-300 group-hover:-translate-y-1"><ArrowUp className="h-3.5 w-3.5" /></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
