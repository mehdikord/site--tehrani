"use client";
import Link from "next/link";
import { useRef } from "react";
import { Phone, MapPin, Clock, CalendarCheck } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK } from "@/lib/device";
import { site } from "@/lib/data";
import { fa } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/motion/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

const SEAM = "M-60,650 C200,740 440,700 630,600 S 740,210 960,120 S 1300,50 1500,120";
// Spool holes, pre-rounded so server and client markup match exactly
const HOLES = [0, 60, 120, 180, 240, 300].map((a) => ({ x: (32 + 12 * Math.cos((a * Math.PI) / 180)).toFixed(2), y: (32 + 12 * Math.sin((a * Math.PI) / 180)).toFixed(2) }));

/**
 * Booking call-to-action staged as a tailor's bench:
 * a needle sews a gold seam across the section as it scrolls, the appointment
 * tag gets its border stitched on, a spool unwinds and scissors run the cut line.
 */
export function ContactCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // 1) Seam sewn by the needle while the section crosses the viewport
        const seam = el.querySelector<SVGPathElement>(".cta-seam");
        const seamMask = el.querySelector<SVGPathElement>(".cta-seam-mask");
        const needle = el.querySelector<SVGGElement>(".cta-needle");
        if (seam && seamMask && needle) {
          const len = seam.getTotalLength();
          const place = (t: number) => {
            const a = seam.getPointAtLength(t * len);
            const b = seam.getPointAtLength(Math.min(len, t * len + 3));
            needle.setAttribute("transform", `translate(${a.x},${a.y}) rotate(${(Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI})`);
          };
          gsap.set(seamMask, { strokeDasharray: len, strokeDashoffset: len });
          place(0);
          const s = { t: 0 };
          gsap.to(s, {
            t: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 60%", scrub: 0.8 },
            onUpdate: () => {
              seamMask.style.strokeDashoffset = String(len * (1 - s.t));
              place(s.t);
            },
          });
        }

        // 2) Appointment tag: drops in on its string, then its border is stitched on
        const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector(".cta-tag"), start: "top 82%" } });
        tl.fromTo(el.querySelector(".cta-tag"), { opacity: 0, y: -50, rotate: -11 }, { opacity: 1, y: 0, rotate: -2.5, duration: 1.5, ease: "elastic.out(1, 0.55)" })
          .fromTo(el.querySelector(".cta-tag-stitch"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" }, 0.35)
          .fromTo(el.querySelectorAll(".cta-tag-row"), { opacity: 0, x: 24 }, { opacity: 1, x: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }, 0.6);

        // 3) Scissors travel the cut line with the scroll
        gsap.fromTo(el.querySelector(".cta-scissors"), { left: "96%" }, { left: "2%", ease: "none", scrollTrigger: { trigger: el, start: "top 40%", end: "bottom bottom", scrub: 0.6 } });
        gsap.fromTo(el.querySelector(".cta-cut"), { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 40%", end: "bottom bottom", scrub: 0.6 } });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="emerald-stage relative overflow-hidden pb-28 pt-24 text-cream lg:pb-40 lg:pt-36">
      <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
      {/* Running tailor's tape */}
      <div aria-hidden className="tape tape-run absolute inset-x-0 top-0 h-3" />

      {/* Seam + needle */}
      <svg aria-hidden viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice" className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block">
        <defs>
          <mask id="cta-seam-mask" maskUnits="userSpaceOnUse" x="-80" y="0" width="1600" height="760">
            <path className="cta-seam-mask" d={SEAM} fill="none" stroke="#fff" strokeWidth="8" />
          </mask>
        </defs>
        <path className="cta-seam" d={SEAM} fill="none" stroke="var(--color-gold)" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="12 9" strokeLinecap="round" mask="url(#cta-seam-mask)" />
        <g className="cta-needle" transform="translate(1500,120)">
          <g className="needle-bob">
            <path d="M-46,0 L26,-1.6 L34,0 L26,1.6 Z" fill="var(--color-gold-light)" />
            <ellipse cx="-38" cy="0" rx="5" ry="1.4" fill="var(--color-charcoal)" />
          </g>
        </g>
      </svg>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal stagger={0.1} className="lg:col-span-7">
            <Eyebrow light>{site.contact.bookingLabel}</Eyebrow>
            <h2 className="mt-5 text-4xl font-black leading-[1.35] sm:text-5xl sm:leading-[1.3] lg:text-7xl lg:leading-[1.25]">
              اولین کوک را <span className="text-gold-shimmer">همین امروز</span> بزنید
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-sand/80">یک تماس کوتاه کافی است تا دوره یا پک الگوی مناسب سطح و هدف‌تان را با هم انتخاب کنیم.</p>

            <a href={`tel:${site.contact.consultationPhone}`} className="group mt-8 inline-flex items-center gap-4">
              {/* Thread spool */}
              <svg aria-hidden viewBox="0 0 64 64" className="h-14 w-14 shrink-0 sm:h-16 sm:w-16">
                <g className="animate-spin-slow [animation-duration:9s] group-hover:[animation-duration:2s]" style={{ transformOrigin: "32px 32px" }}>
                  <circle cx="32" cy="32" r="29" fill="var(--color-gold)" />
                  <circle cx="32" cy="32" r="29" fill="none" stroke="var(--color-charcoal)" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="3 4" />
                  <circle cx="32" cy="32" r="19" fill="var(--color-pine)" />
                  {HOLES.map((h) => (
                    <circle key={`${h.x}-${h.y}`} cx={h.x} cy={h.y} r="2.2" fill="var(--color-gold-light)" />
                  ))}
                  <circle cx="32" cy="32" r="4.5" fill="var(--color-charcoal)" />
                </g>
              </svg>
              <span dir="ltr" className="font-latin text-4xl font-black text-cream transition-colors group-hover:text-gold-light sm:text-6xl">{fa(site.contact.consultationPhone)}</span>
            </a>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg"><a href={`tel:${site.contact.consultationPhone}`}><Phone className="h-4 w-4" /> تماس تلفنی</a></Button>
              <Button asChild size="lg" variant="ghostLight"><a href={site.social.whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon className="h-4 w-4" /> واتساپ</a></Button>
              <Button asChild size="lg" variant="ghostLight"><Link href="/contact"><CalendarCheck className="h-4 w-4" /> فرم رزرو نوبت</Link></Button>
            </div>
          </Reveal>

          {/* Appointment tag */}
          <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-md">
            <svg aria-hidden viewBox="0 0 120 90" className="absolute -top-[4.6rem] left-1/2 h-24 w-32 -translate-x-1/2 overflow-visible">
              <path d="M60,88 C40,60 20,40 34,16 S 96,4 86,40 S 66,70 60,88" fill="none" stroke="var(--color-gold)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <div className="cta-tag pattern-paper relative origin-top -rotate-[2.5deg] rounded-[1.75rem] p-7 pt-12 text-charcoal shadow-card sm:p-9 sm:pt-14">
              <span aria-hidden className="absolute left-1/2 top-4 h-5 w-5 -translate-x-1/2 rounded-full bg-charcoal ring-2 ring-gold" />
              <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-2.5 h-[calc(100%-1.25rem)] w-[calc(100%-1.25rem)]">
                <defs>
                  <mask id="cta-tag-mask" maskUnits="userSpaceOnUse" x="-2" y="-2" width="104" height="104">
                    <rect className="cta-tag-stitch" x="1" y="1" width="98" height="98" rx="5" fill="none" stroke="#fff" strokeWidth="4" pathLength={1} strokeDasharray="1" strokeDashoffset="0" />
                  </mask>
                </defs>
                <rect x="1" y="1" width="98" height="98" rx="5" fill="none" stroke="var(--color-pine)" strokeWidth="1.5" strokeDasharray="7 6" vectorEffect="non-scaling-stroke" mask="url(#cta-tag-mask)" />
              </svg>

              <div className="relative">
                <p className="cta-tag-row flex items-center justify-between text-xs font-semibold text-gold-deep">
                  <span>کارت رزرو نوبت</span>
                  <span dir="ltr" className="font-latin">{site.brand.latinName}</span>
                </p>
                <p className="cta-tag-row mt-3 text-2xl font-black text-pine">{site.contact.infoTitle.replace(":", "")}</p>
                <ul className="mt-5 space-y-4 text-sm leading-8 text-cocoa">
                  <li className="cta-tag-row flex gap-3"><MapPin className="mt-1.5 h-4 w-4 shrink-0 text-pine" />{fa(site.contact.address)}</li>
                  <li className="cta-tag-row flex gap-3"><Phone className="mt-1.5 h-4 w-4 shrink-0 text-pine" /><a dir="ltr" href={`tel:${site.contact.phone}`} className="font-latin font-bold text-charcoal transition-colors hover:text-pine">{fa(site.contact.phone)}</a></li>
                  <li className="cta-tag-row flex gap-3"><Clock className="mt-1.5 h-4 w-4 shrink-0 text-pine" />{fa(site.contact.workingHours)}</li>
                </ul>
                <div className="cta-tag-row mt-6 flex items-center justify-between border-t border-dashed border-pine/35 pt-5">
                  <span className="text-sm font-bold text-pine">{site.contact.consultationLabel}</span>
                  <Button asChild size="sm" variant="dark"><Link href="/contact">رزرو نوبت</Link></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cut line + scissors */}
      <div aria-hidden className="absolute inset-x-0 bottom-9 lg:bottom-12">
        <div className="relative mx-auto h-px max-w-7xl">
          <div className="cut-line absolute inset-0 opacity-25" />
          <div className="cta-cut cut-line absolute inset-0 origin-right" />
          <svg viewBox="-34 -22 80 44" className="cta-scissors absolute left-[2%] top-1/2 h-9 w-16 -translate-y-1/2 -scale-x-100 overflow-visible">
            <g className="snip-a">
              <path d="M0,0 L42,-5 L44,-1 Z" fill="var(--color-gold-light)" />
              <path d="M0,0 L-14,6" stroke="var(--color-gold-light)" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="-21" cy="10" r="7" fill="none" stroke="var(--color-gold)" strokeWidth="2.6" />
            </g>
            <g className="snip-b">
              <path d="M0,0 L42,5 L44,1 Z" fill="var(--color-gold)" />
              <path d="M0,0 L-14,-6" stroke="var(--color-gold)" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="-21" cy="-10" r="7" fill="none" stroke="var(--color-gold-light)" strokeWidth="2.6" />
            </g>
            <circle r="1.8" fill="var(--color-charcoal)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
