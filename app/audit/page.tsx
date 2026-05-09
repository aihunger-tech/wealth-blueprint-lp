"use client";

import React, { useState } from "react";
import { ShieldCheck, Send, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AuditApplication() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // SIMULATION: Here you would connect to your CRM, Email API, or Database (e.g., Firebase/Supabase)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-brand-black text-white flex flex-col items-center justify-center p-6">
        <div className="fixed inset-0 bg-dark-gradient pointer-events-none -z-10" />
        <div className="max-w-md w-full text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-brand-gold/20 border border-brand-gold/40">
              <CheckCircle2 className="w-12 h-12 text-brand-gold" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Application Received</h1>
          <p className="text-slate-400 mb-8">
            Your profile is being reviewed by our analysts. If you qualify for a professional audit, 
            we will contact you via email within 48-72 business hours.
          </p>
          <Link href="/" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-full text-sm font-bold transition-all">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-gold selection:text-brand-black">
      <div className="fixed inset-0 bg-dark-gradient pointer-events-none -z-10" />

      {/* Header Nav */}
      <nav className="p-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-brand-gold transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" />
          Return to Vault
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-4">
            <ShieldCheck className="w-3 h-3" />
            Private Application
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Professional <span className="text-brand-gold">Wealth Audit</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            The blueprint is the map, but an audit is the GPS. This is a high-touch 1-on-1 session 
            to identify the fastest possible route to your financial goals. 
            <span className="block mt-2 font-semibold text-slate-300 italic">Limited availability per month.</span>
          </p>
        </div>

        {/* The Application Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-900/40 border border-slate-800 p-8 md:p-12 rounded-3xl backdrop-blur-md">
          
          {/* Basic Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-brand-gold flex items-center gap-2">
              <div className="w-1.5 h-5 bg-brand-gold rounded-full" />
              Personal Identification
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-2 tracking-wider">Full Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-2 tracking-wider">Email Address</label>
                <input 
                  required
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Financial Qualification */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-brand-gold flex items-center gap-2">
              <div className="w-1.5 h-5 bg-brand-gold rounded-full" />
              Financial Snapshot
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-2 tracking-wider">Monthly Income Bracket</label>
                <select className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                  <option>$0 - $5,000</option>
                  <option>$5,000 - $15,000</option>
                  <option>$15,000 - $50,000</option>
                  <option>$50,000+</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-2 tracking-wider">Current Total Debt</label>
                <input 
                  type="text" 
                  placeholder="e.g. $20k or No Debt"
                  className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Full Width Sections */}
          <div className="md:col-span-2 space-y-6 pt-6 border-t border-slate-800">
            <h3 className="text-lg font-bold text-brand-gold flex items-center gap-2">
              <div className="w-1.5 h-5 bg-brand-gold rounded-full" />
              Goal Alignment
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-2 tracking-wider">Primary Objective</label>
                <select className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                  <option>Debt Elimination</option>
                  <option>Wealth Acceleration</option>
                  <option>Retirement Planning</option>
                  <option>Passive Income Setup</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-slate-500 mb-2 tracking-wider">Urgency Level</label>
                <select className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-gold transition-colors appearance-none">
                  <option>Low (Planning for future)</option>
                  <option>Medium (Looking to start soon)</option>
                  <option>High (Critical financial need)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold text-slate-500 mb-2 tracking-wider">Why should we prioritize your audit?</label>
              <textarea 
                rows={4}
                placeholder="Briefly describe your current situation and what you hope to achieve..."
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-gold transition-colors resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 pt-6">
            <button 
              disabled={isLoading}
              className="w-full py-5 rounded-2xl bg-brand-gold text-brand-black font-black text-lg hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-brand-gold/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-4 border-brand-black/30 border-t-brand-black rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Application for Review
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
              <AlertCircle className="w-3 h-3" />
              Application review takes 48-72 hours
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
