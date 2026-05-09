"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToVault = () => {
    const element = document.getElementById("pricing");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative px-6 py-20 md:py-32 overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-gold/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center">
        {/* Validation Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
          <Sparkles className="w-3 h-3" />
          <span>Analysis Complete</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8">
          Your Custom Blueprint to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-200 to-brand-gold">
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
          <button 
            onClick={scrollToVault}
            className="group relative px-8 py-4 bg-brand-gold text-brand-black font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(217,119,6,0.4)] active:scale-95 flex items-center gap-2"
          >
            Unlock My Blueprint
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-black bg-slate-800" />
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
              <CheckCircle2 className="w-4 h-4 text-brand-gold" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
