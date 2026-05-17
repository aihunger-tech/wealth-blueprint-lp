"use client";

import React from "react";
import { Check, Lock, Zap, ShoppingCart, ShieldCheck, BookOpen, TrendingUp, Activity, Rocket } from "lucide-react";

/**
 * PAYMENT CONFIGURATION
 * Replace these placeholders with your checkout links.
 */
const PRODUCT_LINKS = {
  marketing: "",      
  debtExit: "",   
  lifeOpt: "",   
  startup: "",      
  investWealth: "",   
  masterBundle: "",  
};

const BUDGET_PRODUCTS = [
  {
    id: "marketing",
    name: "Marketing Blueprint",
    price: "2.99",
    description: "Master the art of high-conversion personal branding.",
    benefit: "Growth Framework",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    id: "debtExit",
    name: "Debt-Exit Strategy",
    price: "2.99",
    description: "The ultimate framework to kill debt and reclaim cashflow.",
    benefit: "Debt-Kill Map",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: "lifeOpt",
    name: "Life-Optimization",
    price: "2.99",
    description: "Systems for productivity and peak financial performance.",
    benefit: "Performance Matrix",
    icon: <Activity className="w-6 h-6" />,
  },
  {
    id: "startup",
    name: "Startup Guide",
    price: "2.99",
    description: "How to launch a lean, profitable micro-business from zero.",
    benefit: "Lean Launchpad",
    icon: <BookOpen className="w-6 h-6" />,
  },
];

export default function Pricing() {
  
  const handleUnlock = (productId: keyof typeof PRODUCT_LINKS) => {
    const url = PRODUCT_LINKS[productId];
    if (url && url !== "") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (productId === "investWealth") {
      // Redirect to registration first, then dashboard
      window.location.href = "/register";
    } else {
      alert("This asset is being finalized and will be available shortly. Stay tuned!");
    }
  };


  return (
    <section id="pricing" className="px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white">
          Unlock Your <span className="text-brand-emerald">Wealth Vault</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Premium financial research and strategic frameworks. Choose a specific focal point or secure the entire library.
        </p>
      </div>

      {/* Budget Products Section (4 x 2.99) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {BUDGET_PRODUCTS.map((product) => (
          <div key={product.id} className="relative p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-brand-emerald/50 transition-all flex flex-col group">
            <div className="mb-4 p-3 w-fit rounded-2xl bg-brand-navy-dark border border-slate-700 text-brand-emerald">
              {product.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">{product.description}</p>
            <div className="mt-auto">
              <div className="text-2xl font-black text-white mb-4">
                ${product.price} <span className="text-[10px] text-slate-500 uppercase font-bold">One-time</span>
              </div>
              <button 
                onClick={() => handleUnlock(product.id as keyof typeof PRODUCT_LINKS)}
                className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold text-sm hover:bg-brand-emerald hover:text-brand-navy-dark transition-all flex items-center justify-center gap-2"
              >
                Access Now
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* The Professional Combo (Smart Invest + Wealth Accel) */}
      <div className="mb-12 p-8 rounded-3xl bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 border border-slate-700 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4">
          <div className="px-3 py-1 rounded-full bg-brand-emerald/20 text-brand-emerald text-[10px] font-bold uppercase tracking-widest border border-brand-emerald/30">
            Professional Suite
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-3">Investment & Wealth Accelerator</h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Our most powerful combination: The <strong>Smart Investment Tool</strong> (dynamic allocation) paired with the 
              <strong>Wealth Accelerator</strong> (elite high-yield research) into one cohesive growth engine.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-3 h-3 text-brand-emerald" /> Allocation Matrix
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Check className="w-3 h-3 text-brand-emerald" /> Velocity Framework
              </div>
              <div className="flex items-center gap-2 text- la text-slate-300">
                <Check className="w-3 h-3 text-brand-emerald" /> Asset Class Analysis
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 min-w-[200px]">
            <div className="text-4xl font-black text-white">${"4.99"}</div>
            <button 
              onClick={() => handleUnlock("investWealth")}
              className="w-full py-4 rounded-full bg-brand-emerald text-brand-navy-dark font-black text-lg hover:scale-105 transition-all shadow-lg shadow-brand-emerald/20 flex items-center justify-center gap-2"
            >
              Get the Suite
              <Zap className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Master Bundle */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-brand-emerald shadow-[0_0_40px_rgba(16,185,129,0.2)] relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-brand-emerald/5 pointer-events-none" />
        <div className="relative z-10">
          <span className="px-4 py-1 rounded-full bg-brand-emerald text-brand-navy-dark text-[10px] font-black uppercase tracking-tighter">
            Ultimate Value
          </span>
          <h2 className="text-3xl font-bold text-white mt-6 mb-2">The Complete Wealth Library</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Every single framework, PDF guide, and strategic tool in one single secure vault.
          </p>
          <button 
            onClick={() => handleUnlock("masterBundle")}
            className="px-12 py-4 rounded-full bg-white text-brand-navy-dark font-black text-xl hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            Unlock Everything for $12.99
          </button>
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-brand-emerald" />
              Instant Access
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <div className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-brand-emerald" />
              Secure Payment
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
