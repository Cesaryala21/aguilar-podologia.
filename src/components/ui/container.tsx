import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...rest }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12", className)}
      {...rest}
    />
  );
}
