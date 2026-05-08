"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  highlight?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, highlight = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl border transition-all duration-300",
          "bg-brand-zinc-900 border-zinc-800",
          "hover:border-brand-gold/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]",
          highlight && "border-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]",
          className
        )}
        {...props}
      >
        <div className={cn(
          "absolute top-0 left-0 w-full h-[2px] bg-gold-gradient",
          highlight ? "opacity-100" : "opacity-30"
        )} />
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
