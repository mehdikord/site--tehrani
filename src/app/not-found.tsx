import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fa } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="emerald-stage relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-20 pt-36 text-center text-cream">
      <div className="pattern-paper-dark mask-fade-radial pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="font-latin text-[34vw] text-gold/35 font-black leading-none sm:text-[15rem]">{fa(404)}</p>
        <h1 className="mt-2 text-3xl font-black leading-[1.5] sm:text-5xl">این برگه‌ی الگو پیدا نشد</h1>
        <p className="mt-4 text-sand/75">صفحه‌ای که دنبالش بودید وجود ندارد یا جابه‌جا شده است.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href="/">بازگشت به خانه</Link></Button>
          <Button asChild size="lg" variant="ghostLight"><Link href="/products">پک الگوهای آماده</Link></Button>
        </div>
      </div>
    </section>
  );
}
