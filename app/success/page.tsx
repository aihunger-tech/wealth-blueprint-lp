"use client";

import React from "react";
import { CheckCircle2, Download, ArrowRight, ShieldCheck, Lock, FileText } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark flex flex-col items-center justify-center p-6">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-emerald/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <div className="max-w-3xl w-full text-center space-y-12">
        <div className="flex flex-col items-center gap-6">
          <div className="p-4 rounded-full bg-brand-emerald/20 border border-brand-emerald/40 animate-bounce">
            <CheckCircle2 className="w-16 h-16 text-brand-emerald" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Access <span className="text-brand-emerald">Granted.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Your order is complete. You are now a member of the Wealth Vault.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-md space-y-6">
            <div className="flex items-center gap-3 text-brand-emerald font-bold uppercase tracking-widest text-xs">
              <Download className="w-4 h-4" />
              Step 1: Retrieve Your Assets
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Check your email inbox. You will receive a secure, time-limited download link 
              containing your PDF library and tools.
            </p>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-brand-emerald" />
              <span className="text-xs text-slate-300">Verified secure delivery via SSL.</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-md space-y-6">
            <div className="flex items-center gap-3 text-brand-emerald font-bold uppercase tracking-widest text-xs">
              <Lock className="w-4 h-4" />
              Step 2: Secure Your Entry
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Save the download URL in a secure password manager. Our PDFs are designed 
              to be permanent guides for your financial journey.
            </p>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 flex items-center gap-3">
              <FileText className="w-5 h-5 text-brand-emerald" />
              <span className="text-xs text-slate-300">Standard format: PDF, XPS.</span>
            </div>
          </div>
        </div>

        <div className="relative p-12 rounded-3xl bg-gradient-to-br from-brand-emerald/10 via-slate-900 to-slate-900 border border-brand-emerald/30 text-center overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-6">
            <span className="px-3 py-1 rounded-full bg-brand-emerald text-brand-navy-dark text-[10px] font-black uppercase tracking-widest inline-block">
              Next Step
            </span>
            <h3 className="text-2xl font-bold text-white">Maximize Your Results</h3>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              Don't stop here. If you only purchased a single module, consider securing 
              the Master Bundle to eliminate all financial gaps.
            </p>
            <Link 
              href="/#pricing" 
              className="group px-8 py-4 bg-brand-emerald text-brand-navy-dark font-black rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2 w-fit mx-auto"
            >
              Upgrade to Master Bundle
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-emerald/10 blur-3xl rounded-full" />
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-slate-500 hover:text-brand-emerald text-sm transition-colors font-medium underline underline-offset-4">
            Return to Wealth Blueprint Home
          </Link>
        </div>
      </div>
    </div>
  );
}
