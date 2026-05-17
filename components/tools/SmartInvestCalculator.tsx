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
        <div className="p-2 bg-brand-emerald/20 rounded-lg text-brand-emerald">
                Current Age: <span className="text-brand-emerald">{age}</span>
               className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald"
                     ? "bg-brand-emerald text-brand-navy-dark" 
               { label: "Equities (Stocks)", value: allocation.stocks, color: "bg-brand-emerald" },
             <Info className="w-3 h-3 shrink-0 text-brand-emerald" />
            <span>This model is based on a systematic risk-adjusted framework. Consult a certified advisor before executing.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
