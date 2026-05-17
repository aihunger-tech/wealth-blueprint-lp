"use client";

import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, Mail, MessageSquare, ChevronRight, Search } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import Link from "next/link";

export default function HelpCenterPage() {
  const categories = [
    {
      title: "Getting Started",
      items: ["How to apply for an audit", "Understanding your blueprint", "Account verification process"],
      icon: <HelpCircle className="w-6 h-6 text-brand-emerald" />
    },
    {
      title: "Billing & Access",
      items: ["Payment methods accepted", "Refund policy", "How to download resources"],
      icon: <Mail className="w-6 h-6 text-brand-emerald" />
    },
    {
      title: "Technical Help",
      items: ["Dashboard access issues", "Data privacy questions", "Browser compatibility"],
      icon: <MessageSquare className="w-6 h-6 text-brand-emerald" />
    }
  ];

  return (
    <main className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-6">Help Center</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team.
            </p>
          </div>
        </FadeIn>

        <div className="relative mb-16 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search for articles, guides, or keywords..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 text-white focus:outline-none focus:border-brand-emerald transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800"
            >
              <div className="flex items-center gap-3 mb-6">
                {cat.icon}
                <h3 className="text-xl font-bold">{cat.title}</h3>
              </div>
              <div className="space-y-3">
                {cat.items.map((item, i) => (
                  <Link 
                    key={i} 
                    href="/contact" 
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 group transition-all text-sm text-slate-400 hover:text-white"
                  >
                    {item}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-[-4px] group-hover:translate-x-0" />
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-3xl bg-brand-emerald/10 border border-brand-emerald/20 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-slate-400 mb-8">Our specialists are available to help you navigate your wealth journey.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-emerald text-brand-navy-dark font-bold hover:scale-105 transition-transform">
            Contact Support <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
