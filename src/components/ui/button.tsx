import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[transform,background-color,color,border-color,box-shadow] duration-300 [transition-timing-function:var(--ease-silk)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-l from-gold-light via-gold to-gold-light bg-[length:200%_100%] bg-[position:100%_0] text-charcoal shadow-[0_16px_40px_-16px_rgba(197,162,100,0.75)] hover:bg-[position:0%_0] hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-16px_rgba(197,162,100,0.9)]",
        dark: "bg-pine text-cream shadow-[0_16px_40px_-18px_rgba(15,77,58,0.8)] hover:bg-pine-deep hover:-translate-y-0.5",
        outline: "border border-pine/30 bg-transparent text-pine hover:border-pine hover:bg-pine hover:text-cream",
        ghostLight: "border border-cream/25 bg-cream/5 text-cream backdrop-blur-sm hover:border-gold-light hover:bg-cream/10 hover:text-gold-light",
        gold: "bg-gold text-charcoal hover:bg-gold-light",
        link: "rounded-none px-0 text-pine underline-offset-8 hover:underline",
      },
      size: {
        sm: "h-10 px-5 text-xs",
        md: "h-12 px-6",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
