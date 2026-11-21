"use client";
import { useState, type FormEvent } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { site } from "@/lib/data";
import { fa } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Label } from "@/components/ui/input";

/** Persian/Arabic digits → Latin so phone numbers typed on a Persian keyboard still validate. */
const toLatinDigits = (v: string) => v.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const payload = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    payload.phone = toLatinDigits(payload.phone ?? "");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "ارسال ناموفق بود. لطفاً دوباره تلاش کنید.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "ارتباط برقرار نشد. اینترنت خود را بررسی کنید و دوباره تلاش کنید.");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-[2rem] border border-gold/50 bg-cream p-10 text-center shadow-card">
        <CheckCircle2 className="mx-auto h-14 w-14 text-pine" strokeWidth={1.5} />
        <h3 className="mt-5 text-2xl font-black text-charcoal">درخواست شما ثبت شد</h3>
        <p className="mt-3 text-sm leading-8 text-cocoa">
          به‌زودی با شما تماس می‌گیریم. برای پاسخ سریع‌تر می‌توانید با شماره{" "}
          <a href={`tel:${site.contact.consultationPhone}`} dir="ltr" className="font-latin font-bold text-pine">{fa(site.contact.consultationPhone)}</a> تماس بگیرید.
        </p>
        <Button type="button" variant="outline" className="mt-7" onClick={() => setStatus("idle")}>ارسال پیام جدید</Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] border border-pine/10 bg-cream p-6 shadow-card md:p-10">
      <h3 className="text-2xl font-black text-charcoal md:text-3xl">{site.contact.formTitle.replace(":", "")}</h3>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">نام و نام خانوادگی</Label>
          <Input id="name" name="name" required minLength={2} autoComplete="name" placeholder="نام شما" />
        </div>
        <div>
          <Label htmlFor="phone">شماره تماس</Label>
          <Input id="phone" name="phone" type="tel" required dir="ltr" inputMode="tel" autoComplete="tel" placeholder="09xxxxxxxxx" className="text-right" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="subject">موضوع</Label>
          <select id="subject" name="subject" className="h-12 w-full rounded-xl border border-charcoal/15 bg-cream/70 px-4 text-base text-charcoal transition-colors focus:border-pine focus:outline-none focus:ring-4 focus:ring-pine/10 sm:text-sm">
            <option>خرید پک الگوهای آماده</option>
            <option>دوره های حضوری</option>
            <option>دوره های آموزشی ضبط شده</option>
            <option>دوره های آنلاین</option>
            <option>مشاوره</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="message">پیام</Label>
          <Textarea id="message" name="message" required minLength={5} placeholder="چطور می‌توانیم کمکتان کنیم؟" />
        </div>
      </div>
      <p role="alert" aria-live="polite" className="mt-4 min-h-6 text-sm font-medium text-red-700">{error}</p>
      <Button type="submit" size="lg" variant="dark" className="mt-2 w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 -scale-x-100" />}
        {status === "loading" ? "در حال ارسال…" : site.contact.formSubmitLabel}
      </Button>
    </form>
  );
}
