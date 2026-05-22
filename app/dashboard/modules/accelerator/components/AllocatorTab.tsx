"use client";
import React, { useState } from "react";
import { Shield, CheckCircle2, Info } from "lucide-react";

export default function AllocatorTab({ 
  age, 
  setAge, 
  risk, 
  setRisk, 
  allocation, 
  capital 
}: any) {
  const [showGuide, setShowGuide] = useState(false);

  return (
    <div className="p-8 rounded-3 la-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold flex items-center gap-3"><Shield className="text-brand-emerald" /> Risk-Adjusted Allocation</h3>
          <p className="text-xs text-slate-500">Strategic asset distribution based on lifecycle and risk appetite</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-800 rounded-xl border border-slate-700">
          {(["Conservative", "Moderate", "Aggressive"] as any[]).map(r => (
            <button key={r} onClick={() => setRisk(r)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${risk === r ? "bg-brand-emerald text-brand-navy-dark" : "text-slate-400 hover:text-white"}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-300">Strategic Age Horizon</label>
              <div className="flex items-center gap-1 text-brand-emerald">
                <Info size={14} />
                <span className="text-[10px] cursor-pointer" onClick={() => setShowGuide(!showGuide)}>How it works</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold text-slate-400">
                <span>Current Age</span>
                <span className="text-white">{age} Years</span>
              </div>
              <input type="range" min="18" max="80" value={age} onChange={(e) => setAge(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-emerald" />
              {showGuide && (
                <p className="text-[10px] text-slate-500 italic leading-relaxed animate-in fade-in slide-in-from-top-1">
                  We use a modified "100 minus age" rule. As you age, the engine automatically shifts capital from volatile equities to stable bonds.
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {Object.entries(allocation).map(([key, val]) => (
               <div key={key} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 group hover:border-brand-emerald/30 transition-all">
                 <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1 flex items-center justify-between">
                   {key}
                   <CheckCircle2 className="w-3 h-3 text-brand-emerald opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <div className="text-2xl font-black text-white">{val as React.ReactNode}%</div>
               </div>
             ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 rounded-3 la-3xl bg-brand-emerald/5 border border-brand-emerald/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <div className="w-24 h-24 bg-brand-emerald/10 rounded-full blur-3xl" />
          </div>
          <div className="text-center mb-6 relative z-10">
            <div className="text-slate-400 text-sm uppercase font-bold mb-2">Recommended Capital Split</div>
            <div className="text-4xl font-black text-white">${(capital * (allocation.stocks || 0) / 100).toLocaleString()} <span className="text-lg text-slate-500 font-medium">in Equities</span></div>
          </div>
          <div className="w-full max-w-xs space-y-4 relative z-10">
            <div className="flex justify-between text-sm font-medium text-slate-400">
              <span>S&P 500 / Total Market</span>
              <span className="text-white font-bold">{allocation.stocks}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-brand-emerald transition-all duration-700 ease-out" style={{ width: `${allocation.stocks}%` }} />
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700 text-center">
               <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Risk Efficiency</p>
               <p className="text-xs text-white">{risk === "Aggressive" ? "Optimized for Max Growth" : risk === "Conservative" ? "Optimized for Capital Preservation" : "Balanced Risk/Reward"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

