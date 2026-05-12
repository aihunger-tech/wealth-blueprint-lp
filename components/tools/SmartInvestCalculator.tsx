"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Info } from "lucide-react";

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
    // Professional Allocation Logic
    // Rule of thumb: 110 - age = Stock %
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
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-brand-gold/20 rounded-lg text-brand-gold">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold">Smart Invest Allocation Matrix</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs uppercase font-bold text-slate-500 mb-3 tracking-widest">
              Current Age: <span className="text-brand-gold">{age}</span>
            </label>
            <input 
              type="range" 
              min="18" max="80" 
              value={age} 
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-slate-500 mb-3 tracking-widest">
              Risk Tolerance
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["Conservative", "Moderate", "Aggressive"] as RiskLevel[]).map((level) => (
                <button
                  key={level}
                  onClick={() => setRisk(level)}
                  className={`py-2 text-[10px] font-bold uppercase rounded-lg transition-all ${
                    risk === level 
                    ? "bg-brand-gold text-brand-black" 
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
          <div className="text-center mb-6">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Suggested Allocation</span>
          </div>
          
          <div className="space-y-4">
            {[
              { label: "Equities (Stocks)", value: allocation.stocks, color: "bg-brand-gold" },
              { label: "Fixed Income (Bonds)", value: allocation.bonds, color: "bg-blue-500" },
              { label: "Liquid Cash", value: allocation.cash, color: "bg-slate-400" },
              { label: "Alternatives/Crypto", value: allocation.alternatives, color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="text-white font-bold">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} transition-all duration-500`} 
                    style={{ width: `${item.value}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-800 flex items-start gap-2 text-[10px] text-slate-500 leading-relaxed">
            <Info className="w-3 h-3 shrink-0 text-brand-gold" />
            <span>This model is based on a systematic risk-adjusted framework. Consult a certified advisor before executing.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
