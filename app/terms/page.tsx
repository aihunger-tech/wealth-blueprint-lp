"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      <section className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex p-3 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-slate-500 italic">Last Updated: May 2026</p>
          </div>
        </FadeIn>

        <div className="space-y-10 text-slate-400 leading-relaxed">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-white font-bold text-xl mb-4">1. No Financial Guarantees</h3>
            <p>
              All materials, blueprints, and research provided by Wealth Blueprint are for 
              informational purposes only. We do not guarantee specific financial returns, 
              income levels, or a specific outcome. Financial markets carry inherent risk.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-white font-bold text-xl mb-4">2. Not Financial Advice</h3>
            <p>
              The content sold through this platform is the result of primary research and 
              strategic analysis. It does not constitute personalized financial advice, 
              investment advice, or legal counsel. Users are encouraged to consult 
              with a licensed professional before making significant capital movements.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-white font-bold text-xl mb-4">3. Intellectual Property</h3>
            <p>
              The proprietary methodologies, blueprints, and research papers are the intellectual 
              property of Wealth Blueprint. Unauthorized distribution or resale of these 
 la materials is strictly prohibited and may lead to legal action.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-white font-bold text-xl mb-4">4. User Responsibility</h3>
            <p>
              By using our tools and purchasing our resources, you acknowledge that you are the sole 
              decision-maker in your financial journey and assume all risk associated with the 
              application of our research.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
