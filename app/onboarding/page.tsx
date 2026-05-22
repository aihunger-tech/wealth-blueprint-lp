"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, ArrowLeft, Landmark, TrendingUp, ShieldCheck, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Step = "goals" | "assets" | "risk";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("goals");
  const [formData, setFormData] = useState({
    goal: "",
    amount: "",
    timeframe: "5",
    assetClass: "diversified",
    riskTolerance: "moderate",
  });

  const nextStep = () => {
    if (step === "goals") setStep("assets");
    else if (step === "assets") setStep("risk");
    else router.push("/dashboard");
  };

  const prevStep = () => {
    if (step === "risk") setStep("assets");
    else if (step === "assets") setStep("goals");
  };

  const progress = { goals: 33, assets: 66, risk: 100 }[step];

  return (
    <main className="min-h-screen bg-brand-navy-dark text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      <div className="w-full max-w-2xl relative">
        {/* Progress Bar */}
        <div className="absolute -top-12 left-0 w-full flex items-center gap-4">
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: `${progress}%` }} 
              className="h-full bg-brand-emerald" 
            />
          </div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{progress}% Complete</span>
        </div>

        <AnimatePresence mode="wait">
          {step === "goals" && (
            <motion.div 
              key="goals" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-brand-emerald/10 text-brand-emerald">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Define Your Objective</h1>
                  <p className="text-slate-400 text-sm">What is the primary goal for this blueprint?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-8">
                {["Retirement Planning", "Wealth Acceleration", "Legacy Building", "Tax Optimization"].map((option) => (
                  <button 
                    key={option}
                    onClick={() => { setFormData({...formData, goal: option}); nextStep(); }}
                    className="flex items-center justify-between p-5 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-brand-emerald transition-all text-left group"
                  >
                    <span className="font-medium group-hover:text-brand-emerald transition-colors">{option}</span>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-brand-emerald transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "assets" && (
            <motion.div 
              key="assets" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-brand-emerald/10 text-brand-emerald">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Asset Overview</h1>
                  <p className="text-slate-400 text-sm">Provide a high-level estimate of your current capital.</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-3">Liquid Capital (USD)</label>
                  <input 
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    placeholder="e.g. 100,000"
                    className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-lg focus:ring-2 ring-brand-emerald/50 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={prevStep} className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                <Button onClick={nextStep} disabled={!formData.amount} className="bg-brand-emerald text-brand-navy-dark font-bold">
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === "risk" && (
            <motion.div 
              key="risk" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-brand-emerald/10 text-brand-emerald">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Risk Profile</h1>
                  <p className="text-slate-400 text-sm">Determine your comfort level with volatility.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-8">
                {[
                  { label: "Conservative", desc: "Priority on capital preservation", icon: <ShieldCheck className="w-5 h-5" /> },
                  { label: "Moderate", desc: "Balanced growth and safety", icon: <TrendingUp className="w-5 h-5" /> },
                  { label: "Aggressive", desc: "Maximum accumulation focus", icon: <Zap className="w-5 h-5" /> },
                ].map((opt) => (
                  <button 
                    key={opt.label}
                    onClick={() => { setFormData({...formData, riskTolerance: opt.label.toLowerCase()}); nextStep(); }}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group ${formData.riskTolerance === opt.label.toLowerCase() ? "bg-brand-emerald/10 border-brand-emerald" : "bg-slate-800/50 border-slate-700 hover:border-slate-600"}`}
                  >
                    <div className="p-2 rounded-lg bg-slate-900 text-brand-emerald">{opt.icon}</div>
                    <div>
                      <div className="font-bold">{opt.label}</div>
                      <div className="text-xs text-slate-500">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={prevStep} className="text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" /> Back
                </Button>
                 <Button onClick={() => router.push("/dashboard")} className="bg-brand-emerald text-brand-navy-dark font-bold">
                   Generate Blueprint <ArrowRight className="w-4 h-4 ml-2" />
                 </Button>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}