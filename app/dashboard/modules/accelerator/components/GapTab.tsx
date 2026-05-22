"use client";
import React from "react";
import { Target, Sparkles } from "lucide-react";
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Button } from "@/components/ui/Button";

export default function GapTab({ 
  gapResults, 
  targetAllocations, 
  setTargetAllocations, 
  rebalanceScore 
}: any) {
  const handleRebalanceNow = () => {
    alert("Generating AI Rebalance Execution Plan... (This will trigger the AICommandCenter)");
  };

  return (
    <div className="p-8 rounded-3 la-3xl bg-slate-900/50 border border-slate-800 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Target className="text-brand-emerald" /> Strategic Gap Analysis</h3>
        <div className="p-2 bg-brand-emerald/10 rounded-lg border border-brand-emerald/20 text-brand-emerald text-xs font-bold">
          Current Portfolio vs. Blueprint
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <p className="text-slate-400 text-sm leading-relaxed">
                  Action plan to optimize your wealth.
                </p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">Based on Strategic Persona</p>
              </div>
              <button className="text-xs font-bold text-brand-emerald hover:underline">Change Persona</button>
            </div>
            <div className="space-y-3">
              {gapResults.map((gap: any) => (
                <div key={gap.asset} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 group hover:border-brand-emerald/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg text-xs font-bold ${gap.action === 'BUY' ? 'bg-brand-emerald/20 text-brand-emerald' : gap.action === 'SELL' ? 'bg-rose-500/20 text-rose-500' : 'bg-slate-700 text-slate-400'}`}>
                      {gap.action}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{gap.asset}</span>
                      <div className="flex items-center gap-1">
                         <input 
                          type="number" 
                          min="0" 
                          max="100"
                          className="w-12 bg-transparent text-xs text-slate-500 border-b border-slate-700 focus:border-brand-emerald outline-none text-center"
                          value={targetAllocations.find((t: any) => t.asset === gap.asset)?.allocation || 0}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setTargetAllocations(prev => prev.map((t: any) => t.asset === gap.asset ? { ...t, allocation: val } : t));
                          }}
                        />
                        <span className="text-xs text-slate-500">%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white">{gap.suggestedAmount > 0 ? `+${gap.suggestedAmount.toLocaleString()}` : gap.suggestedAmount.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-500 uppercase">{gap.priority} Priority</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Button 
            onClick={handleRebalanceNow}
            className="w-full py-4 rounded-2xl bg-brand-emerald text-brand-navy-dark font-black flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-4 h-4" /> Rebalance Now with AI
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-brand-emerald/5 border border-brand-emerald/20 space-y-6">
          <div className="text-center">
            <p className="text-slate-400 text-xs uppercase font-bold mb-2">Portfolio Rebalance Score</p>
            <div className="text-6xl font-black text-white">{rebalanceScore}<span className="text-xl text-slate-500">%</span></div>
          </div>
          <div className="w-full max-w-xs h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={gapResults}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="currentPercent"
                  nameKey="asset"
                >
                  {gapResults.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }} />
                <Legend verticalAlign="bottom" height={36}/>
              </RePieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="text-2xl font-black text-white">{rebalanceScore}%</span>
                <p className="text-[10px] text-slate-500 uppercase">Alignment</p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-md space-y-4">
            {gapResults.map((gap: any) => (
              <div key={gap.asset} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-400">
                  <span>{gap.asset}</span>
                  <span>{gap.currentPercent ? `${gap.currentPercent.toFixed(1)}% / ${targetAllocations.find((t: any) => t.asset === gap.asset)?.allocation}%` : '0% / 0%'}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-emerald transition-all duration-500" style={{ width: `${gap.currentPercent || 0}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

