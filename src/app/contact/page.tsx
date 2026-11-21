import type { Metadata } from "next";
import { MapPin, Phone, Clock, Headphones } from "lucide-react";
import { site } from "@/lib/data";
import { fa } from "@/lib/utils";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { InstagramIcon, WhatsAppIcon, TelegramIcon } from "@/components/ui/brand-icons";

export const metadata: Metadata = { title: "تماس با ما", description: site.contact.address };

export default function ContactPage() {
  const rows = [
    { Icon: MapPin, label: "نشانی", text: fa(site.contact.address) },
    { Icon: Phone, label: "تلفن", text: fa(site.contact.phone), href: `tel:${site.contact.phone}`, ltr: true },
    { Icon: Headphones, label: site.contact.consultationLabel, text: fa(site.contact.consultationPhone), href: `tel:${site.contact.consultationPhone}`, ltr: true },
    { Icon: Clock, label: "ساعت کاری", text: fa(site.contact.workingHours.replace("ساعت کاری : ", "")) },
  ];
  const socials = [
    { href: site.social.instagram, Icon: InstagramIcon, label: "اینستاگرام" },
    { href: site.social.whatsapp, Icon: WhatsAppIcon, label: "واتساپ" },
    { href: site.social.telegram, Icon: TelegramIcon, label: "تلگرام" },
  ];
  return (
    <>
      <PageHero eyebrow={site.contact.bookingLabel} title="تماس با ما" description="برای انتخاب دوره، خرید پک الگو یا رزرو نوبت مشاوره، از هر راهی که راحت‌ترید با ما در ارتباط باشید." />
      <section className="pattern-paper py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-3xl font-black text-charcoal md:text-4xl">{site.contact.infoTitle.replace(":", "")}</h2>
            </Reveal>
            <Reveal as="ul" stagger={0.08} className="mt-8 space-y-4">
              {rows.map(({ Icon, label, text, href, ltr }) => (
                <li key={label} className="flex items-start gap-4 rounded-3xl border border-pine/10 bg-cream p-5 shadow-soft">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-pine text-gold-light"><Icon className="h-5 w-5" strokeWidth={1.6} /></span>
                  <div className="min-w-0">
                    <p className="text-xs text-taupe">{label}</p>
                    {href ? (
                      <a href={href} dir={ltr ? "ltr" : undefined} className="font-latin mt-1 block text-right text-lg font-bold text-charcoal transition-colors hover:text-pine">{text}</a>
                    ) : (
                      <p className="mt-1 leading-8 text-charcoal">{text}</p>
                    )}
                  </div>
                </li>
              ))}
            </Reveal>
            <Reveal className="mt-8 flex gap-3">
              {socials.map(({ href, Icon, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-13 w-13 place-items-center rounded-full border border-pine/20 bg-cream text-pine transition-[background-color,color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-pine hover:bg-pine hover:text-gold-light">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </Reveal>
          </div>
          <Reveal variant="zoom" className="lg:col-span-7"><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
