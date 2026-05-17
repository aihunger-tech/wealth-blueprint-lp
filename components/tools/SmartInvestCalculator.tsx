"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Info, ShieldCheck } from "lucide-react";

type RiskLevel = "Conservative" | "Moderate" | "Aggressive";

export default function SmartInvestCalculator() {
  const [age, setAge] = useState(30);
  const [risk, setRisk] = useState<RiskLevel>("Moderate");
  const [allocation, setAllocation] = useState({
    stocks: 0,
    bonds: 0,
    cash: 0,
    alternatives: 0,
  });

  useEffect(() => {
    let stockBase = 110 - age;
    if (stockBase < 20) stockBase = 20;
    if (stockBase > 90) stockBase = 90;

    let riskModifier = 0;
    if (risk === "Aggressive") riskModifier = 10;
    if (risk === "Conservative") riskModifier = -10;

    const finalStocks = Math.min(95, Math.max(10, stockBase + riskModifier));
    const remaining = 100 - finalStocks;
    
    const finalBonds = Math.round(remaining * 0.6);
    const finalCash = Math.round(remaining * 0.2);
    const finalAlts = remaining - finalBonds - finalCash;

    setAllocation({
      stocks: finalStocks,
      bonds: finalBonds,
      cash: finalCash,
      alternatives: finalAlts,
    });
  }, [age, risk]);

  return (
    <div className="w-full max-w-2xl p-6 rounded-3xl bg-slate-950 border border-slate-800 text-white shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-emerald/20 rounded-lg text-brand-emerald">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold">Smart Allocation</h3>
        </div>
        <div className="text-sm font-medium text-slate-400">
          Current Age: <span className="text-brand-emerald">{age}</span>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between text-sm font-bold text-slate-500 uppercase tracking-widest">
            <span>Set Strategic Age</span>
            <span>{age} Years</span>
          </div>
          <input 
            type="range" min="18" max="80" 
            value={age} 
            onChange={(e) => setAge(parseInt(e.target.value))} 
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald" 
          />
        </div>

        <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {(["Conservative", "Moderate", "Aggressive"] as RiskLevel[]).map(r => (
            <button 
              key={r} 
              onClick={() => setRisk(r)} 
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${risk === r ? "bg-brand-emerald text-brand-navy-dark" : "text-slate-400 hover:text-white"}`}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(allocation).map(([key, val]) => (
            <div key={key} className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div className="text-xs uppercase text-slate-500 mb-1">{key}</div>
              <div className="text-2xl font-black text-white">{val}%</div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-3 p-4 rounded-2xl bg-brand-emerald/5 border border-brand-emerald/20 text-slate-400 text-xs">
          <Info className="w-4 h-4 shrink-0 text-brand-emerald" />
          <span>This model is based on a systematic risk-adjusted framework. Consult a certified advisor before executing.</span>
        </div>
      </div>
    </div>
  );
}