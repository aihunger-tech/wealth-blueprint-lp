"use client";
import React, { useState, useEffect } from "react";
import { 
  TrendingUp, Shield, Zap, Wallet, Target, ArrowUpRight, 
  RefreshCw, AlertCircle, CheckCircle2, Download, Search 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useSWR from "swr";
import { useWealthStore } from "@/store/useWealthStore";
import { calculatePortfolioGap } from "@/lib/gap-analysis";
import { simulateScenario } from "@/lib/scenario-engine";
import { calculateMarketStress } from "@/lib/risk-engine";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function AssetPriceRow({ asset }: { asset: any }) {
  const type = asset.symbol === 'BTC' || asset.symbol === 'ETH' ? 'crypto' : 'stock';
  const { data, isValidating } = useSWR(`/api/wealth-core/market/quote?symbol=${asset.symbol}&type=${type}`, fetcher, { 
    refreshInterval: 60000 
  });

  const currentPrice = data?.currentPrice || asset.averagePrice;

  return (
    <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 flex justify-between items-center group hover:border-brand-emerald/30 transition-all">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs group-hover:bg-brand-emerald/20 transition-colors">{asset.symbol[0]}</div>
        <div className="text-left">
          <p className="text-sm font-bold text-white">{asset.symbol}</p>
          <p className="text-xs text-slate-500">{asset.amount} Units</p>
        </div>
      </div>
      <div className="text-right relative">
        <p className={`text-sm font-black transition-all ${isValidating ? 'opacity-50 scale-95' : 'text-white'}`}>
          ${currentPrice.toLocaleString()}
        </p>
        <p className="text-[10px] text-brand-emerald font-bold">+2.4%</p>
      </div>
    </div>
  );
}


export default function WealthAcceleratorModule() {
  const { assets } = useWealthStore(); 
  const [activeTab, setActiveTab] = useState<"intelligence" | "gap" | "scenarios">("intelligence");
  const [scenario, setScenario] = useState<'bull' | 'bear' | 'stagnant'>('bull');
  const [marketVolatility, setMarketVolatility] = useState(25);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const targetAllocations = [
    { asset: 'BTC', allocation: '20' },
    { asset: 'S&P 500', allocation: '50' },
    { asset: 'Gold', allocation: '10' },
    { asset: 'Cash', allocation: '20' },
  ];

  const enrichedAssets = assets.map(a => ({
    ...a,
    currentPrice: a.averagePrice 
  }));

  const gapResults = calculatePortfolioGap(enrichedAssets, targetAllocations);
  const simulationResults = simulateScenario(enrichedAssets, scenario);
  const stressReport = calculateMarketStress(marketVolatility);

  const calculateRebalanceScore = () => {
    if (gapResults.length === 0) return 0;
    const totalGap = gapResults.reduce((acc, gap) => acc + Math.abs(gap.gap), 0);
    const score = Math.max(0, 100 - (totalGap / gapResults.length));
    return Math.round(score);
  };

  const rebalanceScore = calculateRebalanceScore();

  if (!isClient) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button 
          onClick={() => setActiveTab("intelligence")}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${activeTab === "intelligence" ? "bg-brand-emerald text-brand-navy-dark border-brand-emerald shadow-lg shadow-brand-emerald/20" : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"}`}
        >
          <TrendingUp className="w-5 h-5" /> <span className="font-bold">Market Intelligence</span>
        </button>
        <button 
          onClick={() => setActiveTab("gap")}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${activeTab === "gap" ? "bg-brand-emerald text-brand-navy-dark border-brand-emerald shadow-lg shadow-brand-emerald/20" : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"}`}
        >
          <Target className="w-5 h-5" /> <span className="font-bold">Gap Analysis</span>
        </button>
        <button 
          onClick={() => setActiveTab("scenarios")}
          className={`p-4 rounded-2xl border transition-all flex items-center gap-3 ${activeTab === "scenarios" ? "bg-brand-emerald text-brand-navy-dark border-brand-emerald shadow-lg shadow-brand-emerald/20" : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"}`}
        >
          <Zap className="w-5 h-5" /> <span className="font-bold">Scenario Simulator</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "intelligence" && (
          <motion.div 
            key="intelligence" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6"
          >
            <div className="xl:col-span-1 p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Market Stress</h3>
                <Shield className="text-brand-emerald" />
              </div>
              <div className="p-6 rounded-2xl bg-brand-emerald/5 border border-brand-emerald/20 text-center space-y-4">
                <div className="text-4xl font-black text-white">{stressReport.label}</div>
                <div className="text-sm text-slate-400 font-medium">{stressReport.recommendation}</div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                  <span>Volatility Index</span>
                  <span>{marketVolatility}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={marketVolatility} 
                  onChange={(e) => setMarketVolatility(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-emerald" 
                />
              </div>
            </div>

            <div className="xl:col-span-2 p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingUp className="text-brand-emerald" /> Asset Live-Feed
              </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrichedAssets.map(asset => (
                  <AssetPriceRow key={asset.id} asset={asset} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "gap" && (
          <motion.div 
            key="gap" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Target className="text-brand-emerald" /> Strategic Gap Analysis</h3>
              <div className="p-2 bg-brand-emerald/10 rounded-lg border border-brand-emerald/20 text-brand-emerald text-xs font-bold">
                Current Portfolio vs. Blueprint
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    Based on your current assets and target allocation, here is the precise action plan to optimize your wealth accumulation.
                  </p>
                  <div className="space-y-3">
                    {gapResults.map(gap => (
                      <div key={gap.asset} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 group hover:border-brand-emerald/50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg text-xs font-bold ${gap.action === 'BUY' ? 'bg-brand-emerald/20 text-brand-emerald' : gap.action === 'SELL' ? 'bg-rose-500/20 text-rose-500' : 'bg-slate-700 text-slate-400'}`}>
                            {gap.action}
                          </div>
                          <span className="font-bold text-white">{gap.asset}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-white">{gap.suggestedAmount > 0 ? `+${gap.suggestedAmount.toLocaleString()}` : gap.suggestedAmount.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-500 uppercase">Suggested Adjustment</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-brand-emerald/5 border border-brand-emerald/20 space-y-6">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs uppercase font-bold mb-2">Portfolio Rebalance Score</p>
                    <div className="text-6xl font-black text-white">{rebalanceScore}<span className="text-xl text-slate-500">%</span></div>
                  </div>
                  <div className="w-full max-w-md space-y-4">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                      <span>S&P 500</span>
                      <span>{gapResults.find(g => g.asset === 'S&P 500')?.currentPercent.toFixed(1)}% / 50%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-emerald" style={{ width: `${gapResults.find(g => g.asset === 'S&P 500')?.currentPercent}%` }} />
                    </div>
                  </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "scenarios" && (
          <motion.div 
            key="scenarios" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-8"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3"><Zap className="text-brand-emerald" /> Fortune Stress-Test Simulator</h3>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  Simulate how your portfolio reacts to different market regimes using the <strong className="text-white">Scenario Engine</strong>.
                </p>
                <div className="space-y-3">
                  {simulationResults.map(res => (
                    <div key={res.id} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">{res.symbol}</span>
                        <span className={`text-xs font-bold ${res.simulatedChange > 0 ? 'text-brand-emerald' : 'text-rose-500'}`}>
                          {res.simulatedChange > 0 ? '+' : ''}{res.simulatedChange.toFixed(1)}%
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-white">${res.simulatedPrice.toLocaleString()}</p>
                        <p className="text-[10px] text-slate-500 uppercase">Projected Value</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-brand-emerald/10 border border-brand-emerald/20 text-center space-y-6">
                <div className="text-slate-400 uppercase text-xs font-bold mb-2">Projected Total Impact</div>
                <div className="text-5xl font-black text-white">$245,000</div>
                <div className="flex items-center justify-center gap-2 text-brand-emerald font-bold text-sm bg-brand-emerald/20 px-3 py-1 rounded-full w-fit mx-auto">
                  <ArrowUpRight className="w-4 h-4" /> Delta: +12.4%
                </div>
                <button className="w-full py-3 rounded-xl bg-brand-emerald text-brand-navy-dark font-black text-sm hover:scale-105 transition-all">
                  Download Stress Report
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
