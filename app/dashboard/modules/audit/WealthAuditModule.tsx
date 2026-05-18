"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, 
  Search, ArrowRight, Loader2, BarChart3, 
  Zap, Target, Wallet 
} from "lucide-react";
import { useWealthStore } from "@/store/useWealthStore";
import { runWealthAudit } from "@/lib/audit-engine";
import { Button } from "@/components/ui/Button";

export default function WealthAuditModule() {
  const { assets, transactions, goals } = useWealthStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditData, setAuditData] = useState<any>(null);

  const handleStartAudit = () => {
    setIsAnalyzing(true);
    // Simulate a deep scan for UX effect
    setTimeout(() => {
      const results = runWealthAudit(assets, transactions, goals);
      setAuditData(results);
      setIsAnalyzing(false);
    }, 2500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      case 'Warning': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Healthy': return 'text-brand-emerald bg-brand-emerald/10 border-brand-emerald/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {!auditData && !isAnalyzing && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="p-12 rounded-3xl bg-slate-900/50 border border-slate-800 text-center space-y-8"
        >
          <div className="flex justify-center">
            <div className="p-6 bg-brand-emerald/10 rounded-full text-brand-emerald animate-pulse">
              <ShieldCheck size={64} />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-black text-white">Wealth Health Diagnostic</h2>
            <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
              Our engine will analyze your liquidity, diversification, and goal alignment 
              against institutional benchmarks to identify critical vulnerabilities.
            </p>
          </div>
          <Button 
            onClick={handleStartAudit} 
            className="px-8 py-6 rounded-2xl bg-brand-emerald text-brand-navy-dark font-black text-lg hover:scale-105 transition-all"
          >
            Start Full System Audit
          </Button>
        </motion.div>
      )}

      {isAnalyzing && (
        <div className="p-20 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center space-y-6">
          <Loader2 className="w-12 h-12 text-brand-emerald animate-spin" />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold text-white">Scanning Financial DNA...</h3>
            <p className="text-slate-500 text-sm">Analyzing liquidity ratios and goal trajectories</p>
          </div>
        </div>
      )}

      {auditData && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="xl:col-span-1 p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-800" />
                <circle 
                  cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                  strokeDasharray={553} 
                  strokeDashoffset={553 - (553 * auditData.overallScore) / 100}
                  className="text-brand-emerald transition-all duration-1000 ease-out" 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white">{auditData.overallScore}%</span>
                <span className="text-xs text-slate-500 uppercase font-bold">Health Score</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Diagnostic Summary</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{auditData.summary}</p>
            </div>
            <Button 
              onClick={() => setAuditData(null)}
              className="w-full py-3 rounded-xl bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 transition-all"
            >
              Re-Run Analysis
            </Button>
          </motion.div>

          <div className="xl:col-span-2 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <BarChart3 className="text-brand-emerald" /> Detailed Vulnerability Report
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {auditData.findings.map((finding: any) => (
                  <motion.div 
                    key={finding.id}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700 flex flex-col gap-4 hover:border-brand-emerald/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg text-xs font-bold border ${getStatusColor(finding.status)}`}>
                          {finding.status}
                        </div>
                        <span className="font-bold text-white">{finding.pillar}</span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">Impact: {finding.impact}%</span>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm text-slate-300">{finding.message}</p>
                      <div className="p-3 rounded-xl bg-brand-emerald/5 border border-brand-emerald/10 flex items-start gap-3">
                        <Zap className="w-4 h-4 text-brand-emerald mt-1" />
                        <p className="text-xs text-slate-400 leading-relaxed">
                          <strong className="text-brand-emerald">Action:</strong> {finding.suggestion}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
