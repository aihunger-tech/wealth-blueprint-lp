"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Shield, Zap, PieChart, Wallet, Target, ArrowUpRight, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";

type RiskLevel = "Conservative" | "Moderate" | "Aggressive";

export default function WealthAccelerator() {
  const [activeTab, setActiveTab] = useState<"allocator" | "projector" | "optimizer">("allocator");
  const [age, setAge] = useState(30);
  const [risk, setRisk] = useState<RiskLevel>("Moderate");
  const [capital, setCapital] = useState(10000);
  const [allocation, setAllocation] = useState({ stocks: 0, bonds: 0, cash: 0, alts: 0 });

  useEffect(() => {
    let stockBase = 110 - age;
    stockBase = Math.min(90, Math.max(20, stockBase));
    const modifier = risk === "Aggressive" ? 10 : risk === "Conservative" ? -10 : 0;
    const finalStocks = Math.min(95, Math.max(10, stockBase + modifier));
    const rem = 100 - finalStocks;
    setAllocation({
      stocks: finalStocks,
      bonds: Math.round(rem * 0.6),
      cash: Math.round(rem * 0.2),
      alts: rem - Math.round(rem * 0.6) - Math.round(rem * 0.2),
    });
  }, [age, risk]);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => setActiveTab("allocator")}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${activeTab === "allocator" ? "bg-brand-emerald text-brand-navy-dark border-brand-emerald shadow-lg shadow-brand-emerald/20" : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"}`}
        >
          <PieChart className="w-5 h-5" /> <span className="font-bold">Asset Allocator</span>
        </button>
        <button 
          onClick={() => setActiveTab("projector")}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${activeTab === "projector" ? "bg-brand-emerald text-brand-navy-dark border-brand-emerald shadow-lg shadow-brand-emerald/20" : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"}`}
        >
          <TrendingUp className="w-5 h-5" /> <span className="font-bold">Wealth Projector</span>
        </button>
        <button 
          onClick={() => setActiveTab("optimizer")}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${activeTab === "optimizer" ? "bg-brand-emerald text-brand-navy-dark border-brand-emerald shadow-lg shadow-brand-emerald/20" : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"}`}
        >
          <Zap className="w-5 h-5" /> <span className="font-bold">Tax Optimizer</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "allocator" && (
          <motion.div 
            key="allocator" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold flex items-center gap-3"><Shield className="text-brand-emerald" /> Risk-Adjusted Allocation</h3>
              <div className="flex items-center gap-2 p-1 bg-slate-800 rounded-xl border border-slate-700">
                {(["Conservative", "Moderate", "Aggressive"] as RiskLevel[]).map(r => (
                  <button key={r} onClick={() => setRisk(r)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${risk === r ? "bg-brand-emerald text-brand-navy-dark" : "text-slate-400 hover:text-white"}`}>{r}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm font-bold text-slate-400"><span>Strategic Age</span><span>{age} Years</span></div>
                  <input type="range" min="18" max="80" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(allocation).map(([key, val]) => (
                    <div key={key} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                      <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">{key}</div>
                      <div className="text-2xl font-black text-white">{val}%</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-brand-emerald/5 border border-brand-emerald/20">
                <div className="text-center mb-6">
                  <div className="text-slate-400 text-sm uppercase font-bold mb-2">Suggested Capital Split</div>
                  <div className="text-4xl font-black text-white">${(capital * allocation.stocks / 100).toLocaleString()} <span className="text-lg text-slate-500 font-medium">in Equities</span></div>
                </div>
                <div className="w-full max-w-xs space-y-3">
                  <div className="flex justify-between text-sm font-medium text-slate-400"><span>S&P 500 / Total Market</span><span className="text-white font-bold">{allocation.stocks}%</span></div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-emerald transition-all" style={{ width: `${allocation.stocks}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "projector" && (
          <motion.div 
            key="projector" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><TrendingUp className="text-brand-emerald" /> Compound Growth Projector</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase text-slate-500">Initial Capital</label>
                  <input type="number" value={capital} onChange={(e) => setCapital(parseInt(e.target.value))} className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:ring-2 ring-brand-emerald/50 outline-none" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase text-slate-500">Expected Annual Return (%)</label>
                  <input type="number" defaultValue={7} className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:ring-2 ring-brand-emerald/50 outline-none" />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center p-12 rounded-3xl bg-brand-emerald/10 border border-brand-emerald/20 text-center">
                <div className="text-slate-400 uppercase text-xs font-bold mb-2">Projected 10-Year Value</div>
                <div className="text-5xl font-black text-white mb-4">${(capital * Math.pow(1.07, 10)).toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                <div className="flex items-center gap-2 text-brand-emerald font-bold text-sm bg-brand-emerald/20 px-3 py-1 rounded-full">
                  <ArrowUpRight className="w-4 h-4" /> Adjusted for Inflation
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "optimizer" && (
          <motion.div 
            key="optimizer" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm h-full flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3"><Zap className="text-brand-emerald" /> Strategic Tax Optimizer</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="text-xs font-bold text-slate-500 uppercase mb-4">Efficiency Analysis</div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Tax Leakage Risk</span>
                      <span className="text-sm font-bold text-red-400">High</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Harvesting Opportunity</span>
                      <span className="text-sm font-bold text-brand-emerald">Optimal</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300">Compliance Score</span>
                      <span className="text-sm font-bold text-white">94%</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-brand-emerald/5 border border-brand-emerald/20">
                  <h4 className="text-sm font-bold text-white mb-2">Analyst Note</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Based on your audit profile, you are currently over-exposed to short-term capital gains. We recommend transitioning 15% of your liquidity into tax-advantaged vehicles.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-950 border border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand-emerald/5 pointer-events-none" />
                <div className="relative z-10 text-center">
                  <div className="text-slate-400 uppercase text-xs font-bold mb-4">Potential Annual Saving</div>
                  <div className="text-6xl font-black text-white mb-6">$1,240 <span className="text-lg text-slate-500 font-medium">est.</span></div>
                  <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-brand-emerald text-brand-navy-dark font-bold text-sm hover:scale-105 transition-all cursor-pointer">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Update Strategy
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
