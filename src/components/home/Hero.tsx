"use client";
import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MOTION_OK } from "@/lib/device";
import { site } from "@/lib/data";
import { fa } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Counter } from "@/components/motion/Counter";
import { InstagramIcon } from "@/components/ui/brand-icons";

const THREAD = "M1520,150 C1240,40 1040,250 800,300 S 470,110 270,320 S 90,700 400,770 S 900,690 1090,810 S 1400,890 1520,790";
const STATEMENT = "از یک ایده‌ی ساده، تا لباسی که بیانگر هنر و سلیقه‌ی شماست.".split(" ");

const stats = [
  { value: 20, prefix: "+", label: "سال سابقه‌ی تدریس" },
  { value: 242, prefix: "+", label: "هزار همراه در اینستاگرام" },
  { value: 8, prefix: "", label: "تقدیرنامه‌ی جشنواره‌ی فجر" },
];

/**
 * Hero: a pinned (CSS sticky) stage scrubbed by scroll.
 * Act 1 — headline, portrait and floating pattern packs settle in.
 * Act 2 — on scroll the copy lifts away, the portrait glides to centre and an
 *         emerald "spotlight" opens from it, sewing the brand statement in word by word.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        /* ── Intro ── */
        const threadMask = el.querySelector<SVGPathElement>(".hero-thread-mask");
        const underline = el.querySelector<SVGPathElement>(".hero-underline");
        const intro = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
        intro
          .fromTo(q(".hero-chip"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1 }, 0)
          .fromTo(q(".hero-line"), { yPercent: 115, y: 0 }, { yPercent: 0, y: 0, duration: 1.35, stagger: 0.13 }, 0.1)
          .fromTo(q(".hero-portrait"), { opacity: 0, scale: 0.86, y: 60 }, { opacity: 1, scale: 1, y: 0, duration: 1.6 }, 0.25)
          .fromTo(q(".hero-ring"), { opacity: 0, scale: 0.7, rotate: -40 }, { opacity: 1, scale: 1, rotate: 0, duration: 2 }, 0.3)
          .fromTo(q(".hero-copy"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1.1 }, 0.75)
          .fromTo(q(".hero-cta"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 0.9)
          .fromTo(q(".hero-float"), { opacity: 0, scale: 0.6, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 1.3, stagger: 0.12, ease: "back.out(1.6)" }, 0.85)
          .fromTo(q(".hero-stat"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 1.15)
          .fromTo(q(".hero-ghost"), { opacity: 0 }, { opacity: 1, duration: 2, ease: "power1.out" }, 0.6);
        if (threadMask) {
          const len = threadMask.getTotalLength();
          intro.fromTo(q(".hero-thread"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.35);
          intro.fromTo(threadMask, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.8, ease: "power2.inOut" }, 0.35);
        }
        if (underline) {
          const len = underline.getTotalLength();
          intro.fromTo(underline, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: "power3.out" }, 1.05);
        }

        /* ── Scroll scene ── */
        const visual = q(".hs-visual")[0] as HTMLElement;
        const toCentre = () => {
          const r = visual.getBoundingClientRect();
          return window.innerWidth / 2 - (r.left + r.width / 2);
        };
        const toMiddle = () => {
          const r = visual.getBoundingClientRect();
          return window.innerHeight / 2 - (r.top + r.height / 2);
        };
        const scene = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: 0.7, invalidateOnRefresh: true },
        });
        scene
          .to(q(".hs-text"), { yPercent: -28, opacity: 0, duration: 0.3 }, 0)
          .to(q(".hs-stats"), { opacity: 0, y: 40, duration: 0.18 }, 0)
          .to(q(".hs-float"), { opacity: 0, scale: 0.7, x: (i) => [150, -150, -130, 130][i % 4], y: (i) => [-110, 110, -90, 80][i % 4], duration: 0.3, stagger: 0.02 }, 0.02)
          .to(visual, { x: toCentre, y: toMiddle, scale: 1.08, duration: 0.28, ease: "power1.inOut" }, 0)
          .to(q(".hs-thread"), { opacity: 0, duration: 0.25 }, 0.1)
          .to(q(".hs-ghost"), { xPercent: 14, duration: 1 }, 0)
          // the portrait dissolves into a gold spark just before the spotlight opens from the same point
          .to(visual, { scale: 0.55, opacity: 0, duration: 0.1, ease: "power2.in" }, 0.28)
          .fromTo(q(".hs-reveal"), { clipPath: "circle(0% at 50% 50%)" }, { clipPath: "circle(76% at 50% 50%)", duration: 0.3, ease: "power2.in" }, 0.32)
          .fromTo(q(".hs-reveal-bg"), { scale: 1.25 }, { scale: 1, duration: 0.6 }, 0.32)
          .fromTo(q(".hs-eyebrow"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.1 }, 0.52)
          .to(q(".hs-word"), { opacity: 1, duration: 0.05, stagger: 0.026 }, 0.56)
          .fromTo(q(".hs-sub"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.1 }, 0.82)
          .to({}, { duration: 0.08 });

        /* ── Pointer depth (desktop mice only) ── */
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          const layers = (q(".hp") as HTMLElement[]).map((node) => ({
            depth: Number(node.dataset.depth ?? 1),
            x: gsap.quickTo(node, "x", { duration: 0.9, ease: "power3.out" }),
            y: gsap.quickTo(node, "y", { duration: 0.9, ease: "power3.out" }),
          }));
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            layers.forEach((l) => {
              l.x(nx * 34 * l.depth);
              l.y(ny * 26 * l.depth);
            });
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          return () => window.removeEventListener("pointermove", onMove);
        }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} aria-label="معرفی" className="relative bg-charcoal text-cream motion-safe:h-[250svh]">
      <div className="emerald-stage relative h-[100svh] min-h-[680px] overflow-hidden motion-safe:sticky motion-safe:top-0">
        {/* Backdrop */}
        <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
        <p aria-hidden dir="ltr" className="hs-ghost hero-ghost hero-pre text-outline-gold pointer-events-none absolute -left-[30%] bottom-[11%] hidden select-none whitespace-nowrap text-[13.5vw] font-black uppercase leading-none lg:block">
          {site.brand.latinName} · Atelier
        </p>
        <svg aria-hidden viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="hs-thread pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            <mask id="hero-thread" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="900">
              <path className="hero-thread-mask" d={THREAD} fill="none" stroke="#fff" strokeWidth="6" />
            </mask>
          </defs>
          <path className="hero-thread hero-pre" d={THREAD} fill="none" stroke="var(--color-gold)" strokeOpacity="0.55" strokeWidth="1.4" strokeDasharray="9 8" mask="url(#hero-thread)" />
        </svg>

        {/* Stage */}
        <div className="relative z-10 mx-auto grid h-full max-w-[88rem] grid-cols-1 content-start px-5 pt-28 sm:px-8 lg:grid-cols-12 lg:content-center lg:items-center lg:gap-6 lg:pb-28 lg:pt-24">
          <div className="hs-text lg:col-span-7">
            <p className="hero-chip hero-pre inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-cream/5 py-2 pe-4 ps-3 text-xs text-gold-light backdrop-blur-sm sm:text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-gold" />
                <span className="absolute inset-0 rounded-full bg-gold animate-[pulse-ring_2.4s_ease-out_infinite]" />
              </span>
              {site.brand.name}؛ {site.brand.title}
            </p>

            <h1 className="mt-5 text-[clamp(2.7rem,min(7vw,10.4svh),6.9rem)] font-black leading-[1.22] sm:mt-7">
              <span className="-my-[0.1em] block overflow-hidden py-[0.1em]">
                <span className="hero-line hero-line-pre block">یاد بگیرید،</span>
              </span>
              <span className="-my-[0.1em] block overflow-hidden py-[0.1em]">
                <span className="hero-line hero-line-pre block font-extralight text-sand">خلق کنید،</span>
              </span>
              <span className="-my-[0.1em] block overflow-hidden py-[0.1em]">
                <span className="hero-line hero-line-pre relative inline-block">
                  <span className="text-gold-shimmer">بدرخشید</span>
                  <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className="absolute -bottom-[0.02em] left-0 h-[0.16em] w-full overflow-visible">
                    <path className="hero-underline hero-pre" d="M298,12 C230,2 150,18 80,8 S 20,10 2,13" fill="none" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="hero-copy hero-pre mt-4 max-w-xl max-lg:[@media(max-height:740px)]:hidden text-[0.92rem] leading-7 text-sand/80 sm:mt-7 sm:text-lg sm:leading-9">
              بیش از {fa(20)} سال تدریس خیاطی، در قالب الگوهای آماده‌ی «بدون پرو» و دوره‌های حضوری و آنلاین؛ از اولین کوک تا لباس شب و عروس.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-9">
              <Button asChild size="lg" className="hero-cta hero-pre max-sm:h-12 max-sm:px-5 max-sm:text-sm">
                <Link href={site.primaryCta.href}>
                  {site.primaryCta.label}
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghostLight" className="hero-cta hero-pre max-sm:h-12 max-sm:px-5 max-sm:text-sm">
                <a href={`tel:${site.contact.consultationPhone}`}>
                  <Phone className="h-4 w-4 text-gold" />
                  {site.contact.consultationLabel}
                  <span dir="ltr" className="font-latin hidden text-sm font-normal text-sand sm:inline">{fa(site.contact.consultationPhone)}</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Portrait composition */}
          <div className="pointer-events-none absolute inset-x-0 -bottom-[4%] mx-auto w-[min(72vw,37svh)] lg:pointer-events-auto lg:static lg:col-span-5 lg:mx-0 lg:w-full lg:max-w-[min(560px,62svh)] lg:justify-self-end">
            <div className="hs-visual relative aspect-square">
              <div className="absolute inset-[-12%] rounded-full bg-[radial-gradient(closest-side,rgba(197,162,100,0.22),rgba(27,106,82,0.25)_55%,transparent)] blur-2xl" />
              <div className="hp absolute inset-[-7%]" data-depth="0.4">
                <svg aria-hidden viewBox="0 0 400 400" className="hero-ring hero-pre h-full w-full">
                  <g className="animate-spin-slow" style={{ transformOrigin: "200px 200px" }}>
                    <circle cx="200" cy="200" r="196" fill="none" stroke="var(--color-gold)" strokeOpacity="0.45" strokeWidth="1" strokeDasharray="2 9" strokeLinecap="round" />
                    <path id="hero-ring-path" d="M200,200 m-176,0 a176,176 0 1,1 352,0 a176,176 0 1,1 -352,0" fill="none" />
                    <text fill="var(--color-gold-light)" fillOpacity="0.7" fontSize="10.5" fontWeight="500" letterSpacing="5.2" direction="ltr">
                      <textPath href="#hero-ring-path">SHARARE TEHRANI ✦ FASHION DESIGN ✦ PATTERN MAKING ✦ SEWING ACADEMY ✦ TEHRAN ✦ ATELIER ✦</textPath>
                    </text>
                  </g>
                </svg>
              </div>
              <div className="hp absolute inset-[3%]" data-depth="0.8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/brand/portrait.webp" alt={`${site.brand.name}، ${site.brand.title}`} width={1000} height={1090} fetchPriority="high" className="hero-portrait hero-pre h-full w-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.55)]" />
              </div>

              <div className="hs-float absolute -right-[7%] top-[1%] w-[29%]">
                <div className="hp" data-depth="1.9">
                  <div className="hero-float hero-pre">
                    <div className="gold-border animate-float rotate-6 overflow-hidden rounded-[1.1rem] shadow-card lg:rounded-3xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/products/white-magic.jpg" alt="پک الگوهای شب و عروس" width={1254} height={1254} className="aspect-square w-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hs-float absolute -left-[9%] bottom-[5%] w-[27%]">
                <div className="hp" data-depth="2.4">
                  <div className="hero-float hero-pre">
                    <div className="gold-border animate-float-slow -rotate-[8deg] overflow-hidden rounded-[1.1rem] shadow-card lg:rounded-3xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/products/trousers.jpg" alt="نسل جدید الگوهای شلوار" width={1254} height={1254} className="aspect-square w-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hs-float absolute -left-[6%] top-[13%]">
                <div className="hp" data-depth="1.4">
                  <div className="hero-float hero-pre">
                    <div className="animate-float-slow flex items-center gap-2.5 rounded-2xl border border-cream/15 bg-charcoal/70 px-3 py-2.5 shadow-soft backdrop-blur-md lg:px-4 lg:py-3">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-gold text-charcoal lg:h-10 lg:w-10"><InstagramIcon className="h-4 w-4 lg:h-5 lg:w-5" /></span>
                      <span className="leading-tight">
                        <span className="block text-sm font-extrabold text-cream lg:text-lg">+{fa(242)} هزار</span>
                        <span className="block text-[10px] text-sand/70 lg:text-xs">همراه در اینستاگرام</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hs-float absolute -right-[4%] bottom-[16%]">
                <div className="hp" data-depth="1.1">
                  <div className="hero-float hero-pre">
                    <div className="animate-float flex items-center gap-2 rounded-full border border-gold/30 bg-pine/80 py-2 pe-4 ps-2 text-xs font-semibold text-cream shadow-soft backdrop-blur-md lg:text-sm">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-gold text-charcoal"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                      بدون نیاز به پرو
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat rail */}
        <div className="hs-stats absolute inset-x-0 bottom-0 z-10 hidden border-t border-cream/10 bg-charcoal/30 backdrop-blur-sm lg:block">
          <div className="mx-auto flex max-w-[88rem] items-center justify-between px-8 py-5">
            <dl className="flex items-center gap-10 xl:gap-14">
              {stats.map((s) => (
                <div key={s.label} className="hero-stat hero-pre flex items-center gap-3">
                  <dt className="order-2 max-w-[9rem] text-xs leading-5 text-sand/65">{s.label}</dt>
                  <dd className="font-latin text-3xl font-black text-gold-light xl:text-4xl"><Counter value={s.value} prefix={s.prefix} /></dd>
                </div>
              ))}
            </dl>
            <div className="hero-stat hero-pre flex items-center gap-3 text-xs text-sand/60">
              اسکرول کنید
              <span className="flex h-9 w-5 justify-center rounded-full border border-cream/25 pt-1.5">
                <span className="h-1.5 w-1 rounded-full bg-gold animate-[scroll-dot_1.8s_ease-in-out_infinite]" />
              </span>
            </div>
          </div>
        </div>

        {/* Act 2: spotlight statement (opened by scroll; hidden when motion is reduced) */}
        <div className="hs-reveal absolute inset-0 z-20 hidden items-center justify-center motion-safe:flex" style={{ clipPath: "circle(0% at 50% 50%)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/banners/emerald.jpg" alt="" loading="eager" className="hs-reveal-bg absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,23,17,0.5),rgba(6,23,17,0.82))]" />
          <div className="relative mx-auto max-w-5xl px-6 text-center">
            <p className="hs-eyebrow mb-6 text-sm font-medium text-gold-light sm:text-base">{site.brand.organization}</p>
            <p className="text-[clamp(1.9rem,5.4vw,4.75rem)] font-black leading-[1.45]">
              {STATEMENT.map((w, i) => (
                <span key={i} className={i >= STATEMENT.length - 3 ? "hs-word text-gold-light opacity-[0.12]" : "hs-word opacity-[0.12]"}>
                  {w}{" "}
                </span>
              ))}
            </p>
            <p className="hs-sub mx-auto mt-8 max-w-xl text-sm leading-8 text-sand/75 sm:text-base">
              آموزش اصولی، الگوی دقیق و همراهی واقعی؛ همان چیزی که هنرجویان ما را از علاقه به مهارت و درآمد می‌رساند.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
