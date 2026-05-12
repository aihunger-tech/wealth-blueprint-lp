"use client";

import React from "react";
import { Check, Lock, Zap, ShoppingCart, ShieldCheck } from "lucide-react";

/**
 * PAYMENT CONFIGURATION
 * Replace these placeholders with your LemonSqueezy checkout links.
 */
const PRODUCT_LINKS = {
  debtExit: "",      
  smartInvest: "",   
  wealthAccel: "",   
  masterBundle: "",  
};

const INDIVIDUAL_PRODUCTS = [
  {
    id: "debtExit",
    name: "Debt-Exit Strategy",
    price: "9",
    description: "Complete the debt-kill framework.",
    feature: "Debt Repayment Map",
  },
  {
    id: "smartInvest",
    name: "Smart Invest Tool",
    price: "15",
    description: "Age-based allocation calculator.",
    feature: "Asset Allocation Matrix",
  },
  {
    id: "wealthAccel",
    name: "Wealth Accelerator",
    price: "7",
    description: "Elite research on high-yield assets.",
    feature: "Market Opportunity List",
  },
];

export default function Pricing() {
  
  const handleUnlock = (productId: keyof typeof PRODUCT_LINKS) => {
    const url = PRODUCT_LINKS[productId];
    
    if (url && url !== "") {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      alert("This blueprint is being finalized and will be available shortly. Stay tuned!");
    }
  };

  return (
    <section id="pricing" className="px-6 py-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
          Unlock Your <span className="text-brand-gold">Wealth Vault</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Choose the level of access you need. Every blueprint is delivered instantly 
          to your email upon secure checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
        
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {INDIVIDUAL_PRODUCTS.map((product, index) => (
            <div 
              key={index} 
              className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all flex flex-col"
            >
              <div className="mb-6 p-3 w-fit rounded-xl bg-slate-800 text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {product.description}
              </p>
              <div className="mt-auto">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-white">${product.price}</span>
                  <span className="text-slate-500 text-xs uppercase font-bold">USD</span>
                </div>
                <button 
                  onClick={() => handleUnlock(product.id as keyof typeof PRODUCT_LINKS)}
                  className="w-full py-3 rounded-full bg-slate-800 text-white font-bold text-sm hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 group"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Unlock Tool
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1 relative">
          <div className="absolute inset-0 bg-brand-gold/20 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="relative p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-brand-gold shadow-[0_0_40px_rgba(217,119,6,0.2)] flex flex-col">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-gold text-brand-black text-[10px] font-black uppercase tracking-tighter">
              Complete Bundle
            </div>
            
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4 text-brand-gold">
                <Zap className="w-10 h-10 animate-pulse" />
              </div>
              <h3 className="text-2xl font-extrabold mb-2">Master Blueprint</h3>
              <p className="text-slate-400 text-sm">All tools + Lifetime Updates</p>
            </div>

            <div className="space-y-4 mb-10">
              {INDIVIDUAL_PRODUCTS.map((p, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-gold" />
                  <span>{p.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 text-sm text-brand-gold font-bold">
                <Check className="w-4 h-4" />
                <span>Priority Support</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-slate-500 line-through text-lg font-medium">$31</span>
                <span className="text-4xl font-black text-white">$27</span>
              </div>
              <span className="text-[10px] text-brand-gold uppercase font-bold tracking-widest">One-time payment</span>
            </div>

            <button 
              onClick={() => handleUnlock('masterBundle')}
              className="w-full py-4 rounded-full bg-brand-gold text-brand-black font-black text-lg hover:scale-105 transition-all active:scale-95 shadow-lg shadow-brand-gold/30"
            >
              Unlock All Now
            </button>

            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-medium uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3 text-brand-gold" />
                Secure Digital Delivery
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-medium uppercase tracking-wider">
                <Zap className="w-3 h-3 text-brand-gold" />
                Instant Access
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
