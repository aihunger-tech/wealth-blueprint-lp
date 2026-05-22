"use client";
import React, { useState } from "react";
import { Zap, RefreshCw, ShieldAlert, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function OptimizerTab({ 
  assets = [], 
  useWealthStore 
}: any) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationPlan, setOptimizationPlan] = useState<any>(null);

  const runOptimization = () => {
    setIsOptimizing(true);
    // Simulate AI engine analyzing tax leakage
    setTimeout(() => {
      const analyzedAssets = assets.map((a: any) => ({
        ...a,
        taxLiability: a.currentPrice > a.averagePrice ? (a.currentPrice - a.averagePrice) * 0.15 : 0,
        suggestedMove: a.currentPrice > a.averagePrice * 1.5 ? "MOVE TO ROTH" : "HOLD"
      }));

      setOptimizationPlan({
        totalLeakage: analyzedAssets.reduce((sum: number, a: any) => sum + a.taxLiability, 0),
        savingsPotential: 1240,
        recommendations: analyzedAssets.filter((a: any) => a.suggestedMove !== "HOLD")
      });
      setIsOptimizing(false);
    }, 1500);
  };

  return (
    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold flex items-center gap-3"><Zap className="text-brand-emerald" /> Strategic Tax Optimizer</h3>
        <Button 
          onClick={runOptimization} 
          disabled={isOptimizing}
          className="py-2 px-4 rounded-xl bg-brand-emerald text-brand-navy-dark font-black text-xs flex items-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
        >
          {isOptimizing ? <RefreshCw className="w-3 h-3 animate-spin" /> : <TrendingUp size={14} />}
          {isOptimizing ? "Analyzing..." : "Run Full Audit"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
            <div className="text-xs font-bold text-slate-500 uppercase mb-4">Efficiency Analysis</div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={14} className="text-rose-400" />
                  <span className="text-sm text-slate-300">Tax Leakage Risk</span>
                </div>
                <span className={`text-sm font-bold ${optimizationPlan ? (optimizationPlan.totalLeakage > 1000 ? 'text-rose-400' : 'text-brand-emerald') : 'text-white'}`}>
                  {optimizationPlan ? (optimizationPlan.totalLeakage > 1000 ? 'High' : 'Low') : 'Calculating...'}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-sm text-slate-300">Harvesting Opportunity</span>
                <span className="text-sm font-bold text-brand-emerald">Optimal</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-sm text-slate-300">Compliance Score</span>
                <span className="text-sm font-bold text-white">94%</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-brand-emerald/5 border border-brand-emerald/20">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Zap size={14} className="text-brand-emerald" /> Strategic Action Plan
            </h4>
            <div className="space-y-3">
              {optimizationPlan && optimizationPlan.recommendations.length > 0 ? (
                optimizationPlan.recommendations.map((rec: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-slate-300">
                    <span>{rec.symbol}: <span className="text-white font-bold">{rec.suggestedMove}</span></span>
                    <ArrowRight size={12} className="text-brand-emerald" />
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic">Run optimization to see specific asset moves.</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-950 border border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-emerald/5 pointer-events-none" />
          <div className="relative z-10 text-center space-y-6">
            <div className="text-slate-400 uppercase text-xs font-bold mb-4">Potential Annual Saving</div>
            <div className="text-6xl font-black text-white mb-6">
              ${optimizationPlan ? optimizationPlan.savingsPotential.toLocaleString() : "1,240"} 
              <span className="text-lg text-slate-500 font-medium"> est.</span>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-brand-emerald text-brand-navy-dark font-bold text-sm hover:scale-105 transition-all cursor-pointer shadow-lg shadow-brand-emerald/20">
              <RefreshCw size={14} className={isOptimizing ? "animate-spin" : ""} />
              Update Tax Strategy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
