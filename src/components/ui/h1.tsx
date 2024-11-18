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
    <h1 className={cn("text-3xl lg:text-7xl font-bold", className)}>
      {children}
    </h1>
  );
}
