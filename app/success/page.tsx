"use client";

import React from "react";
import { CheckCircle2, Download, ArrowRight, ShieldCheck, Star } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-gold selection:text-brand-black flex flex-col items-center justify-center p-6">
      
      {/* Background Glow */}
      <div className="fixed inset-0 bg-dark-gradient pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-3xl w-full text-center">
        {/* Success Icon */}
        <div className="relative flex justify-center mb-8">
          <div className="p-4 rounded-full bg-brand-gold/20 border border-brand-gold/40 animate-bounce">
            <CheckCircle2 className="w-16 h-16 text-brand-gold" />
          </div>
          <div className="absolute -top-2 -right-2 p-2 bg-emerald-500 rounded-full animate-ping">
            <Star className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Welcome to the <span className="text-brand-gold">Inner Circle.</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
          Your payment was successful. Your personalized wealth assets are being 
          prepared and will be delivered to your email inbox in the next 2-5 minutes.
        </p>

        {/* Asset Access Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-md flex flex-col items-center text-center">
            <div className="p-3 bg-brand-gold/10 rounded-2xl text-brand-gold mb-4">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Instant Access</h3>
            <p className="text-slate-500 text-sm mb-6">Can't wait for the email? Download your assets directly from your LemonSqueezy portal.</p>
            <button 
              onClick={() => window.location.href = "#"} // You will replace this with the LemonSqueezy Customer Portal link
              className="px-6 py-3 bg-white text-brand-black font-bold rounded-full text-sm hover:bg-slate-200 transition-all"
            >
              Access My Downloads
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-md flex flex-col items-center text-center">
            <div className="p-3 bg-brand-gold/10 rounded-2xl text-brand-gold mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Lifetime Access</h3>
            <p className="text-slate-500 text-sm mb-6">Your purchase includes all future updates to the research and tool logic.</p>
            <div className="px-6 py-3 rounded-full bg-slate-800 text-slate-400 font-bold text-sm">
              Verified Member
            </div>
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
              their results even faster.
            </p>
            <Link 
              href="/audit" 
              className="group px-8 py-4 bg-brand-gold text-brand-black font-black rounded-full hover:scale-105 transition-all flex items-center justify-center gap-2 w-fit mx-auto"
            >
              Apply for Audit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/10 blur-3xl rounded-full" />
        </div>

        {/* Back to Home */}
        <div className="mt-12">
          <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors font-medium underline underline-offset-4">
            Return to Wealth Blueprint Home
          </Link>
        </div>
      </div>
    </div>
  );
}
