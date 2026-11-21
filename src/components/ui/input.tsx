import * as React from "react";
import { cn } from "@/lib/utils";

const baseField =
  "w-full rounded-xl border border-charcoal/15 bg-cream/70 px-4 py-3 text-base sm:text-sm text-charcoal placeholder:text-taupe/80 transition-all duration-300 focus:border-pine focus:bg-cream focus:outline-none focus:ring-4 focus:ring-pine/10";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(baseField, className)} {...props} />
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(baseField, "min-h-[140px] resize-y", className)} {...props} />
  )
);
Textarea.displayName = "Textarea";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-2 block text-xs font-medium text-cocoa", className)} {...props} />;
}
