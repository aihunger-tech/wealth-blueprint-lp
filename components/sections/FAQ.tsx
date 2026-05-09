"use client";

import React, { useState } from "react";
import { Plus, Minus, ShieldCheck, Mail, Clock, Zap } from "lucide-react";

const FAQS = [
  {
    question: "Is this blueprint suitable for complete beginners?",
    answer: "Absolutely. Whether you are starting with $100 or $100,000, the blueprint is designed to scale. We provide the foundational logic first, then show you how to accelerate your growth as your portfolio increases.",
    icon: <Zap className="w-4 h-4" />
  },
  {
    question: "How exactly do I receive my digital assets?",
    answer: "Immediately after a secure checkout, you will be redirected to a private download portal. Additionally, a permanent copy of your research and tools will be sent to your registered email address for lifetime access.",
    icon: <Mail className="w-4 h-4" />
  },
  {
    question: "Is the research based on current 2024 market data?",
    answer: "Yes. Our research is updated quarterly to reflect the current economic climate, including inflation rates, interest shifts, and emerging high-yield asset classes. You are getting the most recent institutional-grade data.",
    icon: <Clock className="w-4 h-4" />
  },
  {
    question: "What happens if I'm not satisfied with the tools?",
    answer: "We stand by our research. If you feel the blueprint doesn't provide immediate value to your financial structure, simply email us within 7 days for a full, no-questions-asked refund.",
    icon: <ShieldCheck className="w-4 h-4" />
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-24 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
          Common <span className="text-brand-gold">Questions</span>
        </h2>
        <p className="text-slate-400 text-lg">
          Everything you need to know before unlocking your wealth vault.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div 
            key={index} 
            className="group bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-gold/30"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-slate-800 text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-black transition-all">
                  {faq.icon}
                </div>
                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
              </div>
              {openIndex === index ? <Minus className="w-5 h-5 text-brand-gold" /> : <Plus className="w-5 h-5 text-slate-500" />}
            </button>
            
            <div 
              className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-12 text-slate-400 leading-relaxed text-sm md:text-base">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-slate-500 text-sm mb-6">
          Still have questions? We're here to help.
        </p>
        <button className="px-8 py-3 rounded-full border border-slate-700 text-slate-300 font-bold text-sm hover:bg-slate-800 transition-all">
          Contact Support
        </button>
      </div>
    </section>
  );
}
