"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "premium";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";

    const variants: Record<string, string> = {
      primary: "bg-brand-gold text-brand-black hover:bg-brand-gold-light font-bold transition-all duration-200",
      secondary: "bg-zinc-800 text-white hover:bg-zinc-700 transition-all duration-200",
      outline: "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all duration-200",
      ghost: "text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all duration-200",
      premium: "bg-gold-gradient text-brand-black font-bold btn-gold-shadow hover:scale-105 transition-transform duration-200 active:scale-95",
    };

    const sizes: Record<string, string> = {
      sm: "h-9 px-3 rounded-md text-xs",
      md: "h-11 px-8 rounded-md text-sm",
      lg: "h-14 px-10 rounded-md text-base",
      icon: "h-10 w-10 rounded-full",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap ring-offset-brand-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
