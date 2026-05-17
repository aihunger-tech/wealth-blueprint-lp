"use client";

import React, { useState } from "react";
import { Plus, Minus, ShieldCheck, Mail, Clock, Zap, HelpCircle } from "lucide-react";
import Link from "next/link";

const FAQS = [
  {
    question: "What is the definitive nature of a Wealth Blueprint?",
    answer: "A Wealth Blueprint is a research-backed strategic roadmap. Unlike generic financial advice, it focuses on your specific 'Wealth Gap'—the distance between your current financial state and your target objective—and outlines the precise capital allocation and risk-management steps needed to close it.",
    icon: <Zap className="w-4 h-4" />
  },
  {
    question: "Is this suitable for investors at different capital levels?",
    answer: "Yes. The underlying logic of our methodology—capital efficiency and risk-adjusted growth—is scalable. Whether you are optimizing a modest starting portfolio or managing significant assets, the core blueprint principles remain constant, while the specific asset recommendations scale with your capital.",
    icon: <ShieldCheck className="w-4 h-4" />
  },
  {
    question: "How is the research validated and updated?",
    answer: "Our research is not static. We employ a continuous monitoring system that tracks global inflation cycles, interest rate regimes, and asset class performance. The blueprints are audited and updated quarterly to ensure the data reflects the current institutional economic climate.",
    icon: <Clock className="w-4 h-4" />
  },
  {
    question: "What is the delivery process for the research assets?",
    answer: "Upon successful settlement of the acquisition fee, you gain immediate access to a secure member portal. Your personalized blueprint and all associated research papers are delivered via a permanent digital vault and a confirmation email for lifelong archival access.",
    icon: <Mail className="w-4 h-4" />
  },
  {
    question: "What is the guarantee regarding financial outcomes?",
    answer: "In alignment with our commitment to integrity, we provide no guarantees of specific financial returns. Wealth generation involves inherent market risk. Our value lies in providing an institutional-grade strategy that optimizes your probability of success, not in promising a fixed result.",
    icon: <HelpCircle className="w-4 h-4" />
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="px-6 py-24 max-w-3xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
           Investor <span className="text-brand-emerald">Knowledge Base</span>
        </h2>
        <p className="text-slate-400 text-lg">
          Strategic clarifications on our methodology and the Wealth Blueprint process.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div 
            key={index} 
            className="group bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-brand-emerald/30"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-slate-800 text-brand-emerald group-hover:bg-brand-emerald group-hover:text-brand-navy-dark transition-all">
                  {faq.icon}
                </div>
                <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {faq.question}
                </span>
              </div>
              {openIndex === index ? <Minus className="w-5 h-5 text-brand-emerald" /> : <Plus className="w-5 h-5 text-slate-500" />}
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
          Require a more detailed clarification?
        </p>
        <Link 
          href="/contact" 
          className="px-8 py-3 rounded-full border border-slate-700 text-slate-300 font-bold text-sm hover:bg-slate-800 hover:text-white transition-all inline-block"
        >
          Contact Our Analysts
        </Link>
      </div>
    </section>
  );
}
