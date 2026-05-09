"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import ValueStack from "@/components/sections/ValueStack";
import Pricing from "@/components/sections/Pricing";
import Preview from "@/components/sections/Preview";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import { ShieldCheck } from "lucide-react";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This simulates the "Analyzing your Reality Check" process
    // It creates a psychological bridge between the previous app and this LP
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-black text-white">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute w-16 h-16 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin"></div>
          <ShieldCheck className="w-8 h-8 text-brand-gold animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Analyzing Your Reality Check...</h2>
        <p className="text-slate-400 animate-pulse">Generating your personalized wealth blueprint</p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-brand-black text-white selection:bg-brand-gold selection:text-brand-black">
      {/* Global Background Gradient */}
      <div className="fixed inset-0 bg-dark-gradient pointer-events-none -z-10" />
      
      {/* Navigation */}
      <Navbar />

      {/* Sections Container */}
      <div className="flex flex-col transition-opacity duration-1000 opacity-100">
        {/* Hero Section - We will upgrade this in Step 1.2 */}
        <Hero />
        
        {/* Trust Layer - We will upgrade this in Step 1.3 */}
        <SocialProof />
        
        {/* Desire Layer (Gap Analysis) - We will upgrade this in Step 1.4 */}
        <ValueStack />
        
        {/* Proof Layer - We will upgrade this in Step 1.5 */}
        <Preview />
        
        {/* Monetization Layer (The Vault) - We will upgrade this in Step 1.6 */}
        <Pricing />
        
        {/* Objection Layer - We will upgrade this in Step 1.7 */}
        <FAQ />
        
        {/* Exit Layer - We will upgrade this in Step 1.8 */}
        <Footer />
      </div>
    </main>
  );
}
