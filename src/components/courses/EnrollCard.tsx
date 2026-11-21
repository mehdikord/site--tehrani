"use client";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, ShieldCheck, CreditCard, Check, Phone } from "lucide-react";
import { site, type CourseItem } from "@/lib/data";
import { fa, faPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

const toLatinDigits = (v: string) => v.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

/** Price + enrolment. The order is registered through the contact endpoint; a consultant then finalises payment. */
export function EnrollCard({ course }: { course: CourseItem }) {
  const [step, setStep] = useState<"price" | "form" | "done">("price");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const off = course.oldPrice ? Math.round((1 - course.price / course.oldPrice) * 100) : 0;
  const wa = `${site.social.whatsapp}?text=${encodeURIComponent(`سلام، برای ثبت‌نام در «${course.title}» پیام می‌دهم.`)}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = { name: String(fd.get("name") ?? ""), phone: toLatinDigits(String(fd.get("phone") ?? "")), subject: `ثبت‌نام دوره: ${course.title}`, message: `درخواست ثبت‌نام در «${course.title}» به مبلغ ${course.price} تومان` };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "ثبت درخواست ناموفق بود. دوباره تلاش کنید.");
      setStep("done");
    } catch (err) {
      setError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "ارتباط برقرار نشد. اینترنت خود را بررسی کنید و دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="enroll" className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-pine/10 bg-cream shadow-card">
      <div className="emerald-stage relative p-7 text-cream">
        <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
        <div className="relative">
          <p className="text-sm text-sand/75">هزینه‌ی ثبت‌نام</p>
          {course.oldPrice && (
            <p className="mt-3 flex items-center gap-3">
              <span className="font-latin text-base text-sand/60 line-through">{faPrice(course.oldPrice)}</span>
              <span className="rounded-full bg-gold px-2.5 py-1 text-xs font-bold text-charcoal">{fa(off)}٪ تخفیف</span>
            </p>
          )}
          <p className="mt-2 flex items-baseline gap-2">
            <span className="font-latin text-4xl font-black text-gold-light">{faPrice(course.price)}</span>
            <span className="text-sm text-sand/80">تومان</span>
          </p>
        </div>
      </div>

      <div className="p-7">
        {step === "price" && (
          <>
            <Button size="lg" className="w-full" onClick={() => setStep("form")}>ثبت‌نام در دوره</Button>
            <Button asChild size="lg" variant="outline" className="mt-3 w-full">
              <a href={wa} target="_blank" rel="noreferrer"><WhatsAppIcon className="h-4 w-4" /> ثبت‌نام در واتساپ</a>
            </Button>
          </>
        )}

        {step === "form" && (
          <form onSubmit={onSubmit}>
            <p className="text-base font-extrabold text-charcoal">اطلاعات ثبت‌نام</p>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="enroll-name">نام و نام خانوادگی</Label>
                <Input id="enroll-name" name="name" required minLength={2} autoComplete="name" placeholder="نام شما" />
              </div>
              <div>
                <Label htmlFor="enroll-phone">شماره موبایل</Label>
                <Input id="enroll-phone" name="phone" type="tel" required dir="ltr" inputMode="tel" autoComplete="tel" placeholder="09xxxxxxxxx" className="text-right" />
              </div>
            </div>
            <p role="alert" aria-live="polite" className="mt-3 min-h-5 text-sm font-medium text-red-700">{error}</p>
            <Button type="submit" size="lg" className="mt-2 w-full" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "در حال ثبت…" : "ثبت درخواست ثبت‌نام"}
            </Button>
            <button type="button" onClick={() => setStep("price")} className="mt-3 w-full cursor-pointer py-2 text-sm text-taupe transition-colors hover:text-pine">انصراف</button>
          </form>
        )}

        {step === "done" && (
          <div role="status" className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-pine" strokeWidth={1.5} />
            <p className="mt-4 text-lg font-black text-charcoal">درخواست شما ثبت شد</p>
            <p className="mt-2 text-sm leading-7 text-cocoa">کارشناسان ما برای نهایی‌کردن ثبت‌نام و پرداخت با شما تماس می‌گیرند.</p>
          </div>
        )}

        <ul className="mt-7 space-y-3 border-t border-pine/10 pt-6 text-sm text-cocoa">
          {course.includes.map((x) => (
            <li key={x} className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-pine" strokeWidth={2.5} />{x}</li>
          ))}
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-cocoa">
          <p className="flex items-center gap-2 rounded-2xl bg-linen p-3"><CreditCard className="h-4 w-4 shrink-0 text-gold-deep" /> خرید قسطی {fa(4)} قسطه</p>
          <p className="flex items-center gap-2 rounded-2xl bg-linen p-3"><ShieldCheck className="h-4 w-4 shrink-0 text-gold-deep" /> پشتیبانی و رفع اشکال</p>
        </div>
        <a href={`tel:${site.contact.consultationPhone}`} className="mt-5 flex items-center justify-center gap-2 py-2 text-sm text-cocoa transition-colors hover:text-pine">
          <Phone className="h-4 w-4 text-gold-deep" /> {site.contact.consultationLabel}: <span dir="ltr" className="font-latin font-bold">{fa(site.contact.consultationPhone)}</span>
        </a>
      </div>
    </div>
  );
}
