"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, TrendingUp, CheckCircle2, Award } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function SuccessStoriesPage() {
  const stories = [
    {
      name: "Alexander V.",
      role: "Entrepreneur",
      result: "42% Portfolio Optimization",
      story: "I had the capital but no strategy. The Wealth Blueprint's approach to asset allocation helped me identify a massive leak in my cash-flow management. Within 18 months, my net worth growth stabilized and exceeded my expectations without increasing my risk profile.",
      metric: "Net Worth Growth"
    },
    {
      name: "Sarah L.",
      role: "Corporate Executive",
      result: "Debt-to-Equity Ratio: -60%",
      story: "The audited blueprint showed me exactly why my aggressive debt repayment was actually slowing my wealth build. By shifting the strategy to a modified leverage model, I cleared my high-interest debt 3x faster than planned.",
      metric: "Debt Reduction"
    },
    {
      name: "Marcus K.",
      role: "Private Investor",
      result: "Diversification Score: A+",
      story: "Most guides are generic. This was a surgical strike on my portfolio. I learned where I was over-concentrated and how to pivot into emerging sectors that historical data suggests are primed for the next decade.",
      metric: "Asset Diversification"
    }
  ];

  return (
    <main className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold tracking-tight mb-6">Success Stories</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Real outcomes from users who applied the researched methodologies to their unique financial situations.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-800" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-emerald/20 border border-brand-emerald/40 flex items-center justify-center font-bold text-brand-emerald">
                  {story.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{story.name}</h3>
                  <p className="text-slate-500 text-sm">{story.role}</p>
                </div>
              </div>
              <div className="mb-6 p-3 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 inline-block">
                <div className="flex items-center gap-2 text-brand-emerald font-bold text-sm">
                  <TrendingUp className="w-4 h-4" />
                  {story.result}
                </div>
              </div>
              <p className="text-slate-400 italic leading-relaxed mb-6">
                "{story.story}"
              </p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600">
                <Award className="w-3 h-3" />
                Verified Outcome
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
