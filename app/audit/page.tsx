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
      <div className="min-h-screen bg-brand-navy-dark text-white flex flex-col items-center justify-center p-6">
        <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
            <div className="p-4 rounded-full bg-brand-emerald/20 border border-brand-emerald/40">
              <CheckCircle2 className="w-12 h-12 text-brand-emerald" />
    <div className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-brand-emerald transition-colors text-sm font-medium">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald text-[10px] font-bold uppercase tracking-widest mb-4">
             Professional <span className="text-brand-emerald">Wealth Audit</span>
             <h3 className="text-lg font-bold text-brand-emerald flex items-center gap-2">
               <div className="w-1.5 h-5 bg-brand-emerald rounded-full" />
                   className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-colors"
                   className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-colors"
             <h3 className="text-lg font-bold text-brand-emerald flex items-center gap-2">
               <div className="w-1.5 h-5 bg-brand-emerald rounded-full" />
                   className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-colors appearance-none"
                   className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-colors"
             <h3 className="text-lg font-bold text-brand-emerald flex items-center gap-2">
               <div className="w-1.5 h-5 bg-brand-emerald rounded-full" />
                   className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-colors appearance-none"
                   className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-colors appearance-none"
                   className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-colors resize-none"
               className="w-full py-5 rounded-2xl bg-brand-emerald text-brand-navy-dark font-black text-lg hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-brand-emerald/20 disabled:opacity-50 disabled:cursor-not-allowed"
                 <div className="w-6 h-6 border-4 border-brand-navy-dark/30 border-t-brand-navy-dark rounded-full animate-spin" />
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
