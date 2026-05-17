import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import SuccessStories from "@/components/sections/SuccessStories";
import ValueStack from "@/components/sections/ValueStack";
import Pricing from "@/components/sections/Pricing";
import Preview from "@/components/sections/Preview";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import FadeIn from "@/components/ui/FadeIn";
import WealthCalculator from "@/components/tools/WealthCalculator";
import PageWrapper from "@/components/ui/PageWrapper";

export const metadata = {
  title: "The Wealth Blueprint | Master Your Money, Outsmart the Market",
  description: "Access the real strategies used by disciplined investors to build sustainable wealth and exit the rat race. Start your financial audit today.",
  openGraph: {
    title: "The Wealth Blueprint",
    description: "The definitive framework for high-net-worth accumulation.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      <Navbar />

      <PageWrapper>
        <FadeIn>
          <Hero />
        </FadeIn>
        
        <FadeIn>
          <SocialProof />
        </FadeIn>
        
        <FadeIn>
          <WealthCalculator />
        </FadeIn>
        
        <FadeIn>
          <SuccessStories />
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
      </PageWrapper>
    </main>
  );
}
