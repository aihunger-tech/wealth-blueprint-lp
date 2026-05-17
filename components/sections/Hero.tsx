"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles, X } from "lucide-react";
import ApplicationForm from "@/components/tools/ApplicationForm";
import Link from "next/link";
import { isDevMode } from "@/lib/auth-dev";

export default function Hero() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const ctaHref = isDevMode() ? "/dashboard" : "/register";

  return (
    <section className="relative px-6 py-20 md:py-32 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-emerald/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-emerald/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        {/* Validation Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
          <Sparkles className="w-3 h-3" />
          <span>Analysis Complete</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
          Your Custom Blueprint to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-emerald via-emerald-300 to-brand-emerald">
            Financial Freedom
          </span> is Ready.
        </h1>

        {/* Sub-headline */}
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12">
          We've processed your <span className="text-white font-semibold">Financial Reality Check</span>. 
          The gaps in your current wealth strategy have been identified—now it's time to fix them with professional, 
          research-backed tools.
        </p>

        {/* Action Area */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              href={ctaHref}
              className="group relative px-8 py-4 bg-brand-emerald text-brand-navy-dark font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-95 flex items-center gap-2"
            >
              {isDevMode() ? "Enter Developer Dashboard" : "Unlock My Blueprint"}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

          
           <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
             <div className="flex -space-x-2">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-navy-dark bg-slate-800" />
               ))}
             </div>
             <span>Joined by 5,000+ investors</span>
           </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            "Research-Backed",
            "Instant Access",
            "Professional Grade",
            "Secure Payment"
          ].map((text, i) => (
            <div key={i} className="flex items-center justify-center gap-2 text-slate-500 text-xs md:text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Application Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-navy-dark/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl">
            <button 
              onClick={() => setIsFormOpen(false)}
              className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <ApplicationForm />
          </div>
        </div>
      )}
    </section>
  );
}