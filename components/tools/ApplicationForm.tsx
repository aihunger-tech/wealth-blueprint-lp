"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";

const FORM_STEPS = [
  {
    id: 1,
    title: "Basic Profile",
    description: "Tell us who you are to personalize your experience.",
  },
  {
    id: 2,
    title: "Financial Snapshot",
    description: "Help us understand your current financial landscape.",
  },
  {
    id: 3,
    title: "Final Confirmation",
    description: "Confirm your details and request access to the library.",
  },
];

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentIncome: "under-2k",
    financialGoal: "wealth-building",
    experienceLevel: "beginner",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep((step) => step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((step) => step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    window.location.href = "/success";
  };

  const progress = ((step / FORM_STEPS.length) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl shadow-2xl">
      <div className="h-1.5 w-full bg-slate-800">
        <motion.div 
          className="h-full bg-brand-emerald" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="p-8 md:p-12">
        <div className="mb-10 text-center">
          <motion.div 
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <span className="text-brand-emerald text-xs font-bold uppercase tracking-widest">
              Step {step} of {FORM_STEPS.length}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{FORM_STEPS[step - 1].title}</h2>
            <p className="text-slate-400 text-sm">{FORM_STEPS[step - 1].description}</p>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-emerald transition-all"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-brand-emerald transition-all"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <label className="text-sm font-medium text-slate-300 ml-1">Approximate Monthly Income</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Under 2k", "2k - 5k", "5k - 10k", "10k+"].map((range) => (
                      <button
                        type="button"
                        key={range}
                        onClick={() => updateField("currentIncome", range.toLowerCase().replace(" ", "-"))}
                        className={`p-3 rounded-xl border transition-all text-left text-sm font-medium ${
                          formData.currentIncome === range.toLowerCase().replace(" ", "-") 
                          ? "bg-brand-emerald/10 border-brand-emerald text-brand-emerald" 
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {range}
                          {formData.currentIncome === range.toLowerCase().replace(" ", "-") && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-sm font-medium text-slate-300 ml-1">Primary Financial Goal</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Wealth Building", "Debt Reduction", "Passive Income", "Investment Strategy"].map((goal) => (
                      <button
                        type="button"
                        key={goal}
                        onClick={() => updateField("financialGoal", goal.toLowerCase().replace(" ", "-"))}
                        className={`p-3 rounded-xl border transition-all text-left text-sm font-medium ${
                          formData.financialGoal === goal.toLowerCase().replace(" ", "-") 
                          ? "bg-brand-emerald/10 border-brand-emerald text-brand-emerald" 
                          : "bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {goal}
                          {formData.financialGoal === goal.toLowerCase().replace(" ", "-") && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 text-center"
              >
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-left space-y-4">
                  <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <ShieldCheck className="w-5 h-5 text-brand-emerald" />
                    <span>Your data is securely encrypted and will not be shared.</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-brand-emerald" />
                    <span>You are applying for a personalized PDF library access.</span>
                  </div>
                </div>
                <div className="text-slate-400 text-xs text-center max-w-xs mx-auto uppercase tracking-widest">
                  By clicking the button below, you confirm you are seeking legitimate financial guidance.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
              step === 1 
                ? "opacity-0 pointer-events-none" 
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          <button
            onClick={step === 3 ? handleSubmit : handleNext}
            disabled={isLoading}
            className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
              step === 3 
                ? "bg-brand-emerald text-brand-navy-dark hover:bg-emerald-400" 
                : "bg-white text-brand-navy-dark hover:bg-slate-200"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 
              step === 3 ? "Submit Application" : "Next Step"
            }
            {!isLoading && step !== 3 && <ArrowRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
