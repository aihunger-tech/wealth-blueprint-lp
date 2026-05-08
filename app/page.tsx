import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import ValueStack from "@/components/sections/ValueStack";
import Pricing from "@/components/sections/Pricing";
import Preview from "@/components/sections/Preview";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-brand-black text-white selection:bg-brand-gold selection:text-brand-black">
      {/* Global Background Gradient */}
      <div className="fixed inset-0 bg-dark-gradient pointer-events-none -z-10" />
      
      {/* Navigation */}
      <Navbar />

      {/* Sections Container */}
      <div className="flex flex-col">
        {/* Hero Section */}
        <Hero />
        
        {/* Trust Layer */}
        <SocialProof />
        
        {/* Desire Layer */}
        <ValueStack />
        
        {/* Proof Layer */}
        <Preview />
        
        {/* Monetization Layer */}
        <Pricing />
        
        {/* Objection Layer */}
        <FAQ />
        
        {/* Exit Layer */}
        <Footer />
      </div>
    </main>
  );
}
