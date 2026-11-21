import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Record<string, string>;
    const name = (body.name ?? "").trim();
    const phone = (body.phone ?? "").trim();
    const message = (body.message ?? "").trim();
    if (name.length < 2) return NextResponse.json({ error: "نام را کامل وارد کنید." }, { status: 400 });
    const digits = phone.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[^0-9]/g, "").replace(/^(0098|98)/, "0");
    if (!/^0?9[0-9]{9}$/.test(digits)) return NextResponse.json({ error: "شماره موبایل معتبر نیست." }, { status: 400 });
    if (message.length < 5) return NextResponse.json({ error: "پیام خیلی کوتاه است." }, { status: 400 });
    // No database in this phase: log server-side so the request is not lost.
    console.log("[contact-request]", JSON.stringify({ ...body, at: new Date().toISOString() }));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر" }, { status: 400 });
  }
}
