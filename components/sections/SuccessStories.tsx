"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const STORIES = [
  {
    name: "Alexander Vance",
    role: "Hedge Fund Manager",
    text: "The Wealth Blueprint fundamentally shifted how I view tax efficiency. I reduced my annual liability by 14% while increasing my dividend yield.",
    result: "+$1.2M Tax Savings",
    image: "AV"
  },
  {
    name: "Sarah Chen",
    role: "Tech Entrepreneur",
    text: "I had the capital but no system. This framework gave me the exact blueprint to diversify into institutional assets with total confidence.",
    result: "+22% Portfolio Growth",
    image: "SC"
  },
  {
    name: "Marcus Thorne",
    role: "Private Equity Investor",
    text: "The audit process uncovered leakage in my portfolio I didn't know existed. The optimization phase paid for itself in 30 days.",
    result: "18% Efficiency Gain",
    image: "MT"
  }
];

export default function SuccessStories() {
  return (
    <section className="py-24 px-6 bg-brand-navy-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Proven <span className="text-brand-emerald">Results</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Stop guessing. Start implementing the exact strategies used by the top 1% of worldwide wealth managers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STORIES.map((story, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-brand-emerald/30 transition-all duration-500 group relative"
            >
              <div className="absolute top-6 right-6">
                <Quote className="w-8 h-8 text-slate-800 group-hover:text-brand-emerald/20 transition-colors" />
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-brand-emerald flex items-center justify-center font-bold text-brand-navy-dark shadow-lg shadow-brand-emerald/20">
                  {story.image}
                </div>
                <div>
                  <h4 className="font-bold text-white">{story.name}</h4>
                  <p className="text-slate-500 text-xs">{story.role}</p>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6 relative z-10">
                "{story.text}"
              </p>
              
              <div className="p-4 rounded-2xl bg-brand-emerald/5 border border-brand-emerald/20 flex items-center gap-3">
                <Star className="w-4 h-4 text-brand-emerald fill-brand-emerald" />
                <span className="text-brand-emerald font-bold text-sm italic">{story.result}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    </section>
  );
}