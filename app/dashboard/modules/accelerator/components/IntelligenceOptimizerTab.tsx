"use client";
import React from "react";
import { 
  TrendingUp, Shield, Zap, RefreshCw, AlertCircle 
} from "lucide-react";
import useSWR from "swr";
import { fetchFinancialData } from "@/lib/api-client";
import { PortfolioAsset } from "@/types";

function AssetPriceRow({ asset }: { asset: PortfolioAsset }) {
  const type = asset.symbol === 'BTC' || asset.symbol === 'ETH' ? 'crypto' : 'stock';
  const { data, isValidating, error } = useSWR(`/api/wealth-core/market/quote?symbol=${asset.symbol}&type=${type}`, fetchFinancialData, { 
    refreshInterval: 60000 
  });

  if (error) {
    return (
      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs">{asset.symbol[0]}</div>
          <span className="text-sm text-slate-400">{asset.symbol} - Error loading</span>
        </div>
        <AlertCircle className="w-4 h-4 text-rose-500" />
      </div>
    );
  }

  const currentPrice = data?.currentPrice || asset.averagePrice;
  const priceChange = data?.changePercent || 0;
  const isPositive = priceChange >= 0;

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
        {isValidating && !data ? (
          <div className="h-4 w-16 bg-slate-700 animate-pulse rounded-md mb-1 ml-auto" />
        ) : (
          <p className="text-sm font-black text-white">${currentPrice.toLocaleString()}</p>
        )}
        <p className={`text-[10px] font-bold ${isPositive ? 'text-brand-emerald' : 'text-rose-500'}`}>
          {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
        </p>
      </div>
    </div>
  );
}

export default function IntelligenceOptimizerTab({ 
  assets, 
  marketVolatility, 
  setMarketVolatility, 
  stressReport 
}: any) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Market Pulse Section */}
      <div className="xl:col-span-1 space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
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
        
        <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Tax-Efficiency</h3>
            <Zap className="text-brand-emerald" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/40 border border-slate-700">
              <span className="text-sm text-slate-300">Tax Leakage Risk</span>
              <span className="text-sm font-bold text-rose-400">High</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/40 border border-slate-700">
              <span className="text-sm text-slate-300">Harvesting Op.</span>
              <span className="text-sm font-bold text-brand-emerald">Optimal</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-slate-800/40 border border-slate-700">
              <span className="text-sm text-slate-300">Compliance Score</span>
              <span className="text-sm font-bold text-white">94%</span>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-brand-emerald/5 border border-brand-emerald/20">
            <h4 className="text-sm font-bold text-white mb-2">Analyst Note</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Based on your profile, you are currently over-exposed to short-term capital gains. Shift 15% to tax-advantaged vehicles.
            </p>
          </div>
        </div>
      </div>

      {/* Asset Feed Section */}
      <div className="xl:col-span-2 p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="text-brand-emerald" /> Asset Live-Feed
          </h3>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-[10px] font-bold uppercase tracking-widest">
            <RefreshCw className="w-3 h-3 animate-spin" /> Live
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assets.map((asset: any) => (
            <AssetPriceRow key={asset.id} asset={asset} />
          ))}
        </div>
      </div>
    </div>
  );
}
