"use client";
import React, { useState, useEffect } from "react";
import { 
  TrendingUp, Shield, Zap, Wallet, Target, ArrowUpRight, 
  RefreshCw, AlertCircle, CheckCircle2, Download, Search, PieChart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWealthStore } from "@/store/useWealthStore";
import { calculatePortfolioGap } from "@/lib/gap-analysis";
import { simulateScenario } from "@/lib/scenario-engine";
import { calculateMarketStress } from "@/lib/risk-engine";
import { PortfolioAsset } from "@/types";
import IntelligenceOptimizerTab from "./components/IntelligenceOptimizerTab";
import GapTab from "./components/GapTab";
import ScenariosTab from "./components/ScenariosTab";
import AllocatorTab from "./components/AllocatorTab";
import ProjectorTab from "./components/ProjectorTab";
import OptimizerTab from "./components/OptimizerTab";

type RiskLevel = "Conservative" | "Moderate" | "Aggressive";

export default function WealthAcceleratorModule() {
  const { assets } = useWealthStore(); 
  const [activeTab, setActiveTab] = useState<"intelligence" | "gap" | "scenarios" | "allocator" | "projector" | "optimizer">("intelligence");
  
  // Intelligence / Gap / Scenarios State
  const [scenario, setScenario] = useState<'bull' | 'bear' | 'stagnant'>('bull');
  const [marketVolatility, setMarketVolatility] = useState(25);
  const [targetAllocations, setTargetAllocations] = useState([
    { asset: 'BTC', allocation: 20 },
    { asset: 'S&P 500', allocation: 50 },
    { asset: 'Gold', allocation: 10 },
    { asset: 'Cash', allocation: 20 },
  ]);

  // Allocator / Projector State
  const [age, setAge] = useState(30);
  const [risk, setRisk] = useState<RiskLevel>("Moderate");
  const [capital, setCapital] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [allocation, setAllocation] = useState({ stocks: 0, bonds: 0, cash: 0, alts: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let stockBase = 110 - age;
    stockBase = Math.min(90, Math.max(20, stockBase));
    const modifier = risk === "Aggressive" ? 10 : risk === "Conservative" ? -10 : 0;
    const finalStocks = Math.min(95, Math.max(10, stockBase + modifier));
    const rem = 100 - finalStocks;
    setAllocation({
      stocks: finalStocks,
      bonds: Math.round(rem * 0.6),
      cash: Math.round(rem * 0.2),
      alts: rem - Math.round(rem * 0.6) - Math.round(rem * 0.2),
    });
  }, [age, risk]);

  const enrichedAssets = React.useMemo(() => assets.map(a => ({
    ...a,
    currentPrice: a.currentPrice || a.averagePrice 
  })), [assets]);

  const gapResults = calculatePortfolioGap(enrichedAssets, targetAllocations.map(t => ({ ...t, allocation: t.allocation.toString() })));
  const simulationResults = simulateScenario(enrichedAssets, scenario);
  const stressReport = calculateMarketStress(marketVolatility);

  const calculateRebalanceScore = () => {
    if (gapResults.length === 0) return 0;
    const totalGap = gapResults.reduce((acc, gap) => acc + Math.abs(gap.gap), 0);
    const score = Math.max(0, 100 - (totalGap / gapResults.length));
    return Math.round(score);
  };

  const rebalanceScore = calculateRebalanceScore();
  const totalProjectedValue = simulationResults.reduce((acc, res) => acc + (res.simulatedPrice * (enrichedAssets.find(a => a.symbol === res.symbol)?.amount || 0)), 0);
  const currentTotalValue = enrichedAssets.reduce((acc, a) => acc + (a.currentPrice * a.amount), 0);
  const projectedDelta = currentTotalValue > 0 ? ((totalProjectedValue - currentTotalValue) / currentTotalValue) * 100 : 0;

  if (!isClient) return null;

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
         {[
           { id: "intelligence", label: "Intelligence", icon: TrendingUp },
           { id: "gap", label: "Gap Analysis", icon: Target },
           { id: "scenarios", label: "Scenarios", icon: Zap },
           { id: "allocator", label: "Allocator", icon: PieChart },
           { id: "projector", label: "Projector", icon: Wallet },
         ].map((tab) => (
           <button 
             key={tab.id}
             onClick={() => setActiveTab(tab.id as any)}
             className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${activeTab === tab.id ? "bg-brand-emerald text-brand-navy-dark border-brand-emerald shadow-lg shadow-brand-emerald/20" : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"}`}
           >
             <tab.icon className="w-4 h-4" /> <span className="font-bold text-xs hidden sm:inline">{tab.label}</span>
           </button>
         ))}

      </div>

      <AnimatePresence mode="wait">
        {activeTab === "intelligence" && (
          <motion.div 
            key="intelligence" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          >
            <IntelligenceOptimizerTab 
              assets={enrichedAssets} 
              marketVolatility={marketVolatility} 
              setMarketVolatility={setMarketVolatility} 
              stressReport={stressReport} 
            />
          </motion.div>
        )}

        {activeTab === "gap" && (
          <motion.div 
            key="gap" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          >
            <GapTab 
              gapResults={gapResults} 
              targetAllocations={targetAllocations} 
              setTargetAllocations={setTargetAllocations} 
              rebalanceScore={rebalanceScore} 
            />
          </motion.div>
        )}

        {activeTab === "scenarios" && (
          <motion.div 
            key="scenarios" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          >
            <ScenariosTab 
              simulationResults={simulationResults} 
              scenario={scenario} 
              setScenario={setScenario} 
              totalProjectedValue={totalProjectedValue} 
              projectedDelta={projectedDelta} 
            />
          </motion.div>
        )}

        {activeTab === "allocator" && (
          <motion.div 
            key="allocator" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          >
            <AllocatorTab 
              age={age} 
              setAge={setAge} 
              risk={risk} 
              setRisk={setRisk} 
              allocation={allocation} 
              capital={capital} 
            />
          </motion.div>
        )}

        {activeTab === "projector" && (
          <motion.div 
            key="projector" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          >
            <ProjectorTab 
              capital={capital} 
              setCapital={setCapital} 
              expectedReturn={expectedReturn} 
              setExpectedReturn={setExpectedReturn} 
            />
          </motion.div>
        )}

        {activeTab === "optimizer" && (
          <motion.div 
            key="optimizer" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
          >
            <OptimizerTab 
              assets={enrichedAssets} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
