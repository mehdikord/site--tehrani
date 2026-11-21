import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Convert western digits to Persian digits for display */
export function fa(input: string | number): string {
  const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(input).replace(/\d/g, (d) => digits[Number(d)]);
}

/** 2900000 → «۲٬۹۰۰٬۰۰۰» */
export function faPrice(n: number): string {
  return fa(n.toLocaleString("en-US").replace(/,/g, "٬"));
}
