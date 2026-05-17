"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Percent, Calendar } from "lucide-react";

export default function WealthCalculator() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const calculate = () => {
      const rate = expectedReturn / 100 / 12;
      const months = years * 12;
      const compoundInterest = initialAmount * Math.pow(1 + rate, months);
      const annuity = monthlyContribution * ((Math.pow(1 + rate, months) - 1) / rate);
      setResult(compoundInterest + annuity);
    };
    calculate();
  }, [initialAmount, monthlyContribution, years, expectedReturn]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-emerald/10 blur-3xl rounded-full -mr-32 -mt-32" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Wealth Projection <span className="text-brand-emerald">Calculator</span></h2>
            <p className="text-slate-400 mb-8">Visualize the power of compound growth with a strategic blueprint. See how small adjustments in your allocation can change your financial future.</p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-brand-emerald" /> Initial Investment
                </label>
                <input 
                  type="range" min="0" max="100000" step="1000" 
                  value={initialAmount} onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald" 
                />
                <div className="text-right font-mono text-brand-emerald">{formatCurrency(initialAmount)}</div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-emerald" /> Monthly Contribution
                </label>
                <input 
                  type="range" min="0" max="5000" step="50" 
                  value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald" 
                />
                <div className="text-right font-mono text-brand-emerald">{formatCurrency(monthlyContribution)}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Percent className="w-4 h-4 text-brand-emerald" /> Annual Return (%)
                  </label>
                  <input 
                    type="number" 
                    value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 font-mono focus:outline-none focus:border-brand-emerald transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-emerald" /> Years
                  </label>
                  <input 
                    type="number" 
                    value={years} onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 font-mono focus:outline-none focus:border-brand-emerald transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl bg-brand-emerald/5 border border-brand-emerald/20 backdrop-blur-sm">
            <TrendingUp className="w-12 h-12 text-brand-emerald mb-4" />
            <p className="text-slate-400 uppercase tracking-widest text-xs font-bold mb-2">Estimated Future Wealth</p>
            <div className="text-6xl font-black text-white mb-6 transition-all duration-500">
              {formatCurrency(result)}
            </div>
            <button className="px-8 py-4 rounded-full bg-brand-emerald text-brand-navy-dark font-bold hover:scale-105 transition-transform cursor-pointer">
              Get Your Full Blueprint
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}