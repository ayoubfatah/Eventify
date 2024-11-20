import { cn } from "@/utils/helpers";
import { ClassValue } from "clsx";
import React, { ReactNode } from "react";

export default function H1({
  children,
  className,
}: {
  children: ReactNode;
  className?: ClassValue;
}) {
  return (
    <h1
      className={cn(
        "md:text-5xl sm:text-4xl  text-3xl lg:text-6xl font-bold",
        className
      )}
    >
      {children}
    </h1>
  );
}
