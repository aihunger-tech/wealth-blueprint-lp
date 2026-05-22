"use client";
import React, { useState } from "react";
import { TrendingUp, ArrowUpRight, Calendar, DollarSign, Percent } from "lucide-react";

export default function ProjectorTab({ 
  capital, 
  setCapital, 
  expectedReturn, 
  setExpectedReturn 
}: any) {
  const [years, setYears] = useState(10);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [useInflationAdjustment, setUseInflationAdjustment] = useState(true);
  const inflationRate = 0.03; // Standard 3% inflation

  const calculateGrowth = () => {
    const r = expectedReturn / 100;
    const n = 12; // compound monthly
    const P = capital;
    const PMT = monthlyContribution;
    const t = years;

    // Future Value of Lump Sum: P(1 + r/n)^(nt)
    const fvLumpSum = P * Math.pow(1 + r/n, n * t);
    
    // Future Value of Annuity: PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
    const fvAnnuity = r === 0 ? PMT * n * t : PMT * ((Math.pow(1 + r/n, n * t) - 1) / (r/n));
    
    let total = fvLumpSum + fvAnnuity;

    if (useInflationAdjustment) {
      total = total / Math.pow(1 + inflationRate, t);
    }

    return total;
  };

  const projectedValue = calculateGrowth();

  return (
    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold flex items-center gap-3"><TrendingUp className="text-brand-emerald" /> Compound Growth Projector</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700">
             <input 
               type="checkbox" 
               checked={useInflationAdjustment} 
               onChange={(e) => setUseInflationAdjustment(e.target.checked)}
               className="accent-brand-emerald"
             />
             <span className="text-[10px] font-bold text-slate-300 uppercase">Adjust for Inflation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-800/40 border border-slate-700 space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                <DollarSign size={14} /> Initial Capital
              </label>
              <input type="number" value={capital} onChange={(e) => setCapital(parseInt(e.target.value))} className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:ring-2 ring-brand-emerald/50 outline-none" />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                <Percent size={14} /> Expected Annual Return (%)
              </label>
              <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(parseInt(e.target.value))} className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:ring-2 ring-brand-emerald/50 outline-none" />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                <DollarSign size={14} /> Monthly Contribution
              </label>
              <input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(parseInt(e.target.value))} className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold focus:ring-2 ring-brand-emerald/50 outline-none" />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
                <Calendar size={14} /> Time Horizon ({years} Years)
              </label>
              <input type="range" min="1" max="50" value={years} onChange={(e) => setYears(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-emerald" />
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                <span>1 Year</span>
                <span>25 Years</span>
                <span>50 Years</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center p-12 rounded-3xl bg-brand-emerald/10 border border-brand-emerald/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-emerald/5 pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <div className="text-slate-400 uppercase text-xs font-bold mb-2">Projected Terminal Value</div>
            <div className="text-6xl font-black text-white mb-4">
              ${projectedValue.toLocaleString(undefined, {maximumFractionDigits: 0})}
            </div>
            <div className="flex flex-col gap-4 items-center">
              <div className="flex items-center gap-2 text-brand-emerald font-bold text-sm bg-brand-emerald/20 px-3 py-1 rounded-full">
                <ArrowUpRight className="w-4 h-4" /> 
                {useInflationAdjustment ? "Real Value (Inflation Adjusted)" : "Nominal Value"}
              </div>
              <p className="text-xs text-slate-500 max-w-xs italic">
                Estimates are based on compound interest with monthly contributions over a {years}-year period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
