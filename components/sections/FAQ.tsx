"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ as FAQ_DATA } from "@/constants"; // Renamed to avoid conflict
import { ChevronDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-24 w-full relative px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Common <span className="text-gold-gradient">Questions</span>
          </h2>
          <p className="text-zinc-400 px-6">
            Everything you need to know before joining the Wealth Blueprint.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item: { question: string; answer: string }, index: number) => (
            <div 
              key={index} 
              className="border border-zinc-800 rounded-xl overflow-hidden bg-brand-zinc-900/50 transition-all duration-300 active:scale-[0.98] sm:active:scale-100"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
              >
                <span className="text-white font-medium text-sm md:text-base pr-4">{item.question}</span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-zinc-500 transition-transform duration-300 shrink-0",
                    activeIndex === index ? "rotate-180 text-brand-gold" : ""
                  )} 
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 pt-0 text-zinc-400 leading-relaxed border-t border-zinc-800/50 mt-2 text-sm md:text-base">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Final Trust Banner - Optimized for Mobile */}
        <div className="mt-12 md:mt-16 p-6 rounded-2xl bg-gold-gradient/10 border border-brand-gold/20 flex flex-col sm:flex-row items-center gap-4 justify-center text-center">
          <ShieldCheck className="w-6 h-6 text-brand-gold shrink-0" />
          <p className="text-zinc-300 text-xs md:text-sm">
            <span className="text-white font-bold">100% Secure Delivery.</span> All guides are delivered instantly via encrypted download.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
