import { type VariantProps, cva } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans font-medium transition-all duration-300 ease-[var(--ease-out-expo)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary shadow-[0_8px_30px_-8px_rgba(0,23,54,0.45)] hover:scale-105 hover:shadow-[0_12px_36px_-8px_rgba(0,23,54,0.55)]",
        glass:
          "glass-surface text-primary hover:scale-105 hover:shadow-[0_10px_30px_-10px_rgba(0,107,91,0.3)]",
        outline:
          "border border-on-primary/40 text-on-primary backdrop-blur-sm hover:bg-on-primary/10 hover:border-on-primary/70",
        ghost: "text-primary hover:bg-surface-container",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-base",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, type = "button", ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    />
  );
}
