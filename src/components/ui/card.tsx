import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "glass-surface rounded-2xl shadow-[0_2px_20px_-8px_rgba(11,28,48,0.08)]",
        className,
      )}
      {...rest}
    />
  );
}
