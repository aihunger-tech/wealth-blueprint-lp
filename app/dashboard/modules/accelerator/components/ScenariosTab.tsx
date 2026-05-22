"use client";
import React, { useState } from "react";
import { Zap, ArrowUpRight, Activity, TrendingDown, TrendingUp } from "lucide-react";

export default function ScenariosTab({ 
  simulationResults, 
  scenario, 
  setScenario, 
  totalProjectedValue, 
  projectedDelta,
  enrichedAssets
}: any) {
  const [volatilityModifier, setVolatilityModifier] = useState(1);

  const adjustedResults = React.useMemo(() => {
    if (!simulationResults) return [];
    return simulationResults.map((res: any) => ({
      ...res,
      simulatedPrice: res.simulatedPrice * volatilityModifier,
      simulatedChange: res.simulatedChange * volatilityModifier
    }));
  }, [simulationResults, volatilityModifier]);

  return (
    <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Zap className="text-brand-emerald" /> Advanced Stress-Test Engine</h3>
        <div className="flex gap-2 p-1 bg-slate-800 rounded-xl border border-slate-700">
          {(['bull', 'bear', 'stagnant'] as const).map(s => (
            <button 
              key={s} 
              onClick={() => setScenario(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${scenario === s ? "bg-brand-emerald text-brand-navy-dark" : "text-slate-400 hover:text-white"}`}
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-800/50 border border-slate-700 space-y-6">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-emerald" /> Scenario Modifiers
            </h4>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                  <span>Impact Magnitude</span>
                  <span>{volatilityModifier}x</span>
                </div>
                <input 
                  type="range" min="0.5" max="2.0" step="0.1" 
                  value={volatilityModifier} 
                  onChange={(e) => setVolatilityModifier(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-emerald" 
                />
              </div>
              <p className="text-[10px] text-slate-500 italic">
                Adjust the magnitude of the selected regime to stress-test extreme tail-risks.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-brand-emerald/10 border border-brand-emerald/20 space-y-4">
            <div className="text-center space-y-2">
              <p className="text-slate-400 uppercase text-xs font-bold">Projected Impact</p>
              <div className="text-4xl font-black text-white">${totalProjectedValue.toLocaleString()}C</div>
              <div className="flex items-center justify-center gap-2 text-brand-emerald font-bold text-sm bg-brand-emerald/20 px-3 py-1 rounded-full w-fit mx-auto">
                <ArrowUpRight className="w-4 h-4" /> Delta: {projectedDelta.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adjustedResults.map((res: any) => (
              <div key={res.id} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 flex justify-between items-center group hover:border-brand-emerald/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${res.simulatedChange > 0 ? 'bg-brand-emerald/10 text-brand-emerald' : 'bg-rose-500/10 text-rose-500'}`}>
                    {res.simulatedChange > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  </div>
                  <div className="text-left">
                    <span className="font-bold text-white block">{res.symbol}</span>
                    <span className={`text-[10px] font-bold ${res.simulatedChange > 0 ? 'text-brand-emerald' : 'text-rose-500'}`}>
                      {res.simulatedChange > 0 ? 'GAIN' : 'LOSS'}: {res.simulatedChange.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-white">${res.simulatedPrice.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-500 uppercase">Simulated Price</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-3 uppercase opacity-50">Scenario Insight</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Under the current <span className="text-white font-bold uppercase">{scenario}</span> regime with a {volatilityModifier}x magnitude, 
              your portfolio exhibits a {projectedDelta > 0 ? 'positive' : 'negative'} sensitivity. 
              {scenario === 'bear' ? " Consider increasing hedge ratios in Gold or Cash." : " Opportunity to capitalize on momentum."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
