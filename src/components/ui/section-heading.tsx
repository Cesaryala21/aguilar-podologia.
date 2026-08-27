import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter && "items-center text-center",
        className,
      )}
    >
      <span
        className={cn(
          "w-fit text-xs font-semibold uppercase tracking-[0.18em]",
          isLight ? "text-secondary-fixed" : "text-secondary",
        )}
      >
        {eyebrow}
      </span>
      <h2
        className={cn(
          "font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl",
          isLight ? "text-on-primary" : "text-on-surface",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            isLight ? "text-on-primary-container" : "text-on-surface-variant",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
