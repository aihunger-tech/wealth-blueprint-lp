"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG, LINKS } from "@/constants";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-4 md:p-6 transition-all duration-300">
      <div className={cn(
        "flex items-center justify-between w-full max-w-7xl px-4 md:px-6 py-3 rounded-full",
        "bg-brand-black/60 backdrop-blur-lg border border-zinc-800/50",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]"
      )}>
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-gold-gradient rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-300" />
          <span className="font-bold text-sm md:text-lg tracking-tight text-white">
            {SITE_CONFIG.name}
          </span>
        </Link>

         <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
           <Link href="/about" className="hover:text-brand-emerald transition-colors">About</Link>
           <Link href="/methodology" className="hover:text-brand-emerald transition-colors">Methodology</Link>
           <Link href="/success-stories" className="hover:text-brand-emerald transition-colors">Successes</Link>
           <Link href="/help-center" className="hover:text-brand-emerald transition-colors">Help</Link>
           <Link href="#faq" className="hover:text-brand-emerald transition-colors">FAQ</Link>
         </div>


        <div className="flex items-center gap-2 md:gap-4">
           {/* we assume a mock auth state here or use a store if available */}
           <Button variant="outline" size="sm" className="hidden sm:flex px-4" asChild>
             <Link href="/login">Login</Link>
           </Button>
           <Button variant="premium" size="sm" className="px-4 text-xs md:text-sm" asChild>
             <Link href="/register">Get Access</Link>
           </Button>
         </div>

      </div>
    </nav>
  );
};

export default Navbar;
