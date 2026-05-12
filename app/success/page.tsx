"use client";

import React from "react";
import { CheckCircle2, Download, ArrowRight, ShieldCheck, Star, FileText, Layers, Zap } from "lucide-react";
import Link from "next/link";
import SmartInvestCalculator from "@/components/tools/SmartInvestCalculator";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-gold selection:text-brand-black flex flex-col items-center justify-center p-6">
      
      {/* Background Glow */}
      <div className="fixed inset-0 bg-dark-gradient pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl w-full text-center">
        {/* Header */}
        <div className="relative flex justify-center mb-8">
          <div className="p-4 rounded-full bg-brand-gold/20 border border-brand-gold/40 animate-bounce">
            <CheckCircle2 className="w-16 h-16 text-brand-gold" />
          </div>
          <div className="absolute -top-2 -right-2 p-2 bg-emerald-500 rounded-full animate-ping">
            <Star className="w-4 h-4 text-white" />
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Welcome to the <span className="text-brand-gold">Wealth Vault.</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto">
          Your access has been verified. Below is your personalized suite of 
          financial frameworks and tools.
        </p>

        {/* THE VAULT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-start">
          
          {/* Asset 1: Debt-Exit (PDF) */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-md flex flex-col items-center text-center hover:border-brand-gold/30 transition-all group">
            <div className="p-4 bg-brand-gold/10 rounded-2xl text-brand-gold mb-6 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Debt-Exit Strategy</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              The complete framework to reorganize your payments and eliminate high-interest debt.
            </p>
            <button className="mt-auto w-full py-3 bg-white text-brand-black font-bold rounded-xl text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          {/* Asset 2: Smart Invest Tool (The Live Calculator) */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-brand-gold/5 border border-brand-gold/20 backdrop-blur-md flex flex-col items-center text-center">
              <div className="p-4 bg-brand-gold/10 rounded-2xl text-brand-gold mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Invest Tool</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Interactive allocation matrix based on your age and risk profile.
              </p>
              <div className="w-full">
                <SmartInvestCalculator />
              </div>
            </div>
          </div>

          {/* Asset 3: Wealth Accelerator (PDF) */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-md flex flex-col items-center text-center hover:border-brand-gold/30 transition-all group">
            <div className="p-4 bg-brand-gold/10 rounded-2xl text-brand-gold mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Wealth Accelerator</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Institutional-grade research on high-yield assets and market opportunities for 2024.
            </p>
            <button className="mt-auto w-full py-3 bg-white text-brand-black font-bold rounded-xl text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Access Research
            </button>
          </div>

        </div>

        {/* THE UPSHIFT (Lead Generation for High-Ticket) */}
        <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-brand-gold/20 via-slate-900 to-slate-900 border border-brand-gold/30 text-center overflow-hidden">
          <div className="relative z-10">
            <span className="px-3 py-1 rounded-full bg-brand-gold text-brand-black text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
              Exclusive Opportunity
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for a Professional Audit?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              The blueprint is the map, but a professional audit is the GPS. We offer 
              limited 1-on-1 strategy sessions for members who want to accelerate 
              their results through direct analysis.
            </p>
            <Link 
              href="/audit" 
              className="group px-8 py-4 bg-brand-gold text-brand-black font-black rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2 w-fit mx-auto"
            >
              Apply for Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/10 blur-3xl rounded-full" />
        </div>

        <div className="mt-12">
          <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors font-medium underline underline-offset-4">
            Return to Wealth Blueprint Home
          </Link>
        </div>
      </div>
    </div>
  );
}
