"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import ValueStack from "@/components/sections/ValueStack";
import Pricing from "@/components/sections/Pricing";
import Preview from "@/components/sections/Preview";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import FadeIn from "@/components/ui/FadeIn";
import { ShieldCheck } from "lucide-react";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  const loadingMessages = [
    "Syncing with Wealth Check data...",
    "Analyzing Income-to-Debt ratios...",
    "Identifying strategic wealth gaps...",
    "Generating your personalized blueprint...",
  ];

  useEffect(() => {
    // Cycle through loading messages every 700ms
    const textInterval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 700);

    // Total loading time: 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-black text-white">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute w-16 h-16 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin"></div>
          <ShieldCheck className="w-8 h-8 text-brand-gold animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold mb-2 tracking-tight">Processing Your Data</h2>
        <p className="text-slate-400 animate-pulse font-mono text-sm">
          {loadingMessages[loadingStep]}
        </p>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-brand-black text-white selection:bg-brand-gold selection:text-brand-black">
      {/* Global Background Gradient */}
      <div className="fixed inset-0 bg-dark-gradient pointer-events-none -z-10" />
      
      <Navbar />

      {/* Use motion.div for a smooth global fade-in upon loading completion */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
        className="flex flex-col"
      >
        {/* 
            Each section is wrapped in <FadeIn />. 
            The 'delay' prop ensures they enter in a staggered sequence 
            if they appear in the same viewport.
        */}
        <FadeIn>
          <Hero />
        </FadeIn>
        
        <FadeIn>
          <SocialProof />
        </FadeIn>
        
        <FadeIn>
          <ValueStack />
        </FadeIn>
        
        <FadeIn>
          <Preview />
        </FadeIn>
        
        <FadeIn>
          <Pricing />
        </FadeIn>
        
        <FadeIn>
          <FAQ />
        </FadeIn>
        
        <Footer />
      </motion.div>
    </main>
  );
}
