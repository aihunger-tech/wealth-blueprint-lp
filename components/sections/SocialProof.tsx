"use client";

import React from "react";
import { CheckCircle2, TrendingUp, Users, ShieldCheck } from "lucide-react";

export default function SocialProof() {
  const metrics = [
    { label: "Active Users", value: "5,000+", icon: <Users className="w-5 h-5" /> },
    { label: "Frameworks Applied", value: "1,200+", icon: <TrendingUp className="w-5 h-5" /> },
    { label: "Research Papers", value: "140+", icon: <ShieldCheck className="w-5 h-5" /> },
  ];

  return (
    <section className="relative px-6 py-12 border-y border-slate-900 bg-slate-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-10">
          <p className="text-slate-500 text-xs uppercase font-bold tracking-[0.2em] mb-6">
            Trusted by high-performance investors worldwide
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            {["Forbes Advisor", "Bloomberg", "Financial Times", "Wall Street", "Investopedia"].map((brand) => (
              <span key={brand} className="text-slate-300 text-lg md:text-xl font-bold tracking-tighter italic">
                {brand}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="group relative p-6 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-brand-gold/30 transition-all duration-300 text-center"
            >
              <div className="flex justify-center mb-3 text-brand-gold group-hover:scale-110 transition-transform">
                {metric.icon}
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                {metric.value}
              </div>
              <div className="text-slate-500 text-sm font-medium uppercase tracking-wide">
                {metric.label}
              </div>
              
              <div className="absolute inset-0 rounded-2xl bg-brand-gold/0 group-hover:bg-brand-gold/5 transition-colors pointer-events-none" />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3 text-brand-gold" />
            Verified Financial Methodology
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-slate-700" />
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3 text-brand-gold" />
            Secure SSL Encryption
          </div>
        </div>

      </div>
    </section>
  );
}
