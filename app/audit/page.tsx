"use client";

import React, { useState } from "react";
import { ShieldCheck, Send, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AuditApplication() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      income: formData.get("income"),
      debt: formData.get("debt"),
      objective: formData.get("objective"),
      urgency: formData.get("urgency"),
      reason: formData.get("reason"),
    };

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Submission failed. Please try again later.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-brand-navy-dark text-white flex flex-col items-center justify-center p-6 relative">
        <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
        <div className="p-4 rounded-full bg-brand-emerald/20 border border-brand-emerald/40 mb-6">
          <CheckCircle2 className="w-12 h-12 text-brand-emerald" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-center">Application Received</h1>
        <p className="text-slate-400 text-center max-w-md mb-8">
          Your financial profile is now being analyzed by our strategic team. 
          We will reach out via email within 48-72 hours.
        </p>
        <Link href="/" className="px-8 py-3 rounded-full bg-brand-emerald text-brand-navy-dark font-bold hover:scale-105 transition-all">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark relative p-6">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      <div className="max-w-2xl mx-auto bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl mt-12">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald text-[10px] font-bold uppercase tracking-widest">
            Professional Wealth Audit
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-brand-emerald rounded-full" />
            Sovereign Audit Application
          </h3>
          <p className="text-slate-400">Provide your details to receive a custom wealth blueprint.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
              <input name="fullName" required className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Email Address</label>
              <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Annual Income</label>
              <input name="income" type="text" required placeholder="$0.00" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">Total Debt</label>
              <input name="debt" type="text" required placeholder="$0.00" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Primary Objective</label>
            <select name="objective" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all appearance-none">
              <option value="growth">Aggressive Growth</option>
              <option value="preservation">Capital Preservation</option>
              <option value="income">Passive Income Generation</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Specific Goals / Notes</label>
            <textarea name="reason" rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all resize-none" placeholder="Describe your current situation..."></textarea>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}

          <button 
            disabled={isLoading}
            className="w-full py-5 rounded-2xl bg-brand-emerald text-brand-navy-dark font-black text-lg hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-brand-emerald/20 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-brand-navy-dark/30 border-t-brand-navy-dark rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-5 h-5" /> Submit Application for Review
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-2 mt-4 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
            <AlertCircle className="w-3 h-3" /> Application review takes 48-72 hours
          </div>
        </form>
      </div>
    </div>
  );
}