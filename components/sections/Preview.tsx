"use client";

import React from "react";
import { Eye, FileText, Layers, Zap, Lock, CheckCircle2, ChevronRight } from "lucide-react";

const PREVIEW_ASSETS = [
  {
    title: "The Debt-Exit Strategy",
    type: "Research PDF",
    previewColor: "from-blue-500/20 to-slate-900",
    secrets: [
      "The 'Payment Cascade' method to kill interest",
      "Psychological triggers to avoid relapse",
      "Credit score acceleration hacks",
      "The 24-hour emergency fund blueprint"
    ],
    icon: <FileText className="w-6 h-6 text-blue-400" />
  },
  {
    title: "Wealth Accelerator Suite",
    type: "Interactive Dashboard",
    previewColor: "from-emerald-500/20 to-slate-900",
    secrets: [
      "Dynamic Asset Allocation matrix",
      "Compound Growth Projector",
      "Strategic Tax Leakage Analysis",
      "Institutional 'Sleeper' strategies"
    ],
    icon: <Zap className="w-6 h-6 text-emerald-400" />
  },
  {
    title: "Master Wealth Library",
    type: "Elite Research",
    previewColor: "from-purple-500/20 to-slate-900",
    secrets: [
      "Top 3 under-valued asset classes for 2024",
      "Compound interest acceleration maps",
      "The Wealth-Velocity formula",
      "Institutional capital efficiency models"
    ],
    icon: <Layers className="w-6 h-6 text-purple-400" />
  }
];

export default function Preview() {
  return (
    <section className="px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald text-[10px] font-bold uppercase tracking-widest mb-4">
          <Eye className="w-3 h-3" />
          <span>Sneak Peek</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white">
          Peek Inside the <span className="text-brand-emerald">Wealth Vault</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          We don't believe in blind faith. Here is exactly what you are unlocking 
          when you secure your blueprint.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {PREVIEW_ASSETS.map((asset, index) => (
          <div 
            key={index} 
            className="group relative bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-brand-emerald/30 transition-all duration-500"
          >
            <div className={`h-64 relative overflow-hidden bg-gradient-to-b ${asset.previewColor} flex items-center justify-center p-8`}>
              <div className="w-full h-full bg-slate-950 rounded-lg border border-slate-700 shadow-2xl p-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[8px] text-slate-500 ml-auto font-mono">SECURE_ACCESS_V1.0</span>
                </div>
                
                <div className="space-y-3">
                  <div className="h-2 w-3/4 bg-slate-800 rounded" />
                  <div className="h-2 w-full bg-slate-800 rounded" />
                  <div className="h-2 w-5/6 bg-slate-800 rounded" />
                  <div className="h-12 w-full bg-brand-emerald/10 border border-brand-emerald/20 rounded-md mt-4 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-brand-emerald" />
                  </div>
                  <div className="h-2 w-2/3 bg-slate-800 rounded" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 p-3 bg-slate-900 rounded-2xl border border-slate- la transition-all cursor-pointer">
                {asset.icon}
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold group-hover:text-brand-emerald transition-colors text-white">
                  {asset.title}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-500 bg-slate-800 px-2 py-1 rounded">
                  {asset.type}
                </span>
              </div>

              <div className="space-y-4">
                {asset.secrets.map((secret, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <span>{secret}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-medium text-slate-500 italic">Full access included in vault</span>
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-brand-emerald group-hover:text-brand-navy-dark transition-all cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
