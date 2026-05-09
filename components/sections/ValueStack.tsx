"use client";

import React from "react";
import { Target, Zap, TrendingUp, ChevronRight, Lock } from "lucide-react";

const GAP_SOLUTIONS = [
  {
    gap: "Cash Flow Leakage",
    solution: "The Debt-Exit Framework",
    benefit: "Stop the bleed. We show you exactly how to rearrange your payments to kill high-interest debt first while maintaining your lifestyle.",
    icon: <Zap className="w-6 h-6 text-brand-gold" />,
    color: "from-amber-500/20 to-transparent"
  },
  {
    gap: "Stagnant Growth",
    solution: "The Smart Allocation Tool",
    benefit: "Stop guessing where your money goes. Our tool calculates your risk-to-reward ratio based on your specific age and goals.",
    icon: <TrendingUp className="w-6 h-6 text-brand-gold" />,
    color: "from-amber-500/20 to-transparent"
  },
  {
    gap: "Market Blindness",
    solution: "The Wealth Accelerator Research",
    benefit: "Get the unfair advantage. Access institutional-grade research on emerging high-yield assets that 99% of retail investors ignore.",
    icon: <Target className="w-6 h-6 text-brand-gold" />,
    color: "from-amber-500/20 to-transparent"
  }
];

export default function ValueStack() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
          Closing the <span className="text-brand-gold">Wealth Gap</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Your Reality Check revealed specific vulnerabilities in your financial structure. 
          Here is exactly how the Blueprint solves them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {GAP_SOLUTIONS.map((item, index) => (
          <div 
            key={index} 
            className="group relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-brand-gold/40 transition-all duration-300 flex flex-col"
          >
            {/* Gradient Background Effect */}
            <div className={`absolute inset-0 bg-gradient-to-b ${item.color} rounded-3xl pointer-events-none`} />
            
            <div className="relative z-10">
              <div className="mb-6 p-3 w-fit rounded-2xl bg-brand-black border border-slate-700 group-hover:border-brand-gold/50 transition-colors">
                {item.icon}
              </div>
              
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                  The Gap: {item.gap}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-gold transition-colors">
                {item.solution}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {item.benefit}
              </p>
              
              <div className="mt-auto flex items-center justify-between text-xs font-bold text-brand-gold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                <span>Included in Blueprint</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Value Summary Box */}
      <div className="mt-20 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-brand-gold/10 via-transparent to-transparent border border-brand-gold/20 text-center max-w-4xl mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Lock className="w-24 h-24 text-brand-gold" />
        </div>
        
        <h3 className="text-2xl font-bold mb-4">Everything You Need to Scale</h3>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
          Instead of spending years in trial-and-error, you are getting the condensed 
          research and tools required to move from <span className="text-white">Financial Stress</span> to <span className="text-white">Financial Certainty</span>.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {["Research PDFs", "Calculation Tools", "Investment Maps", "Debt Checklists"].map((feature) => (
            <div key={feature} className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              {feature}
            </div>
          ))}
        </div >
      </div>
    </section>
  );
}
