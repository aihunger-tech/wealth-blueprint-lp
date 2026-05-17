import React from "react";
import { ShieldCheck, Target, TrendingUp, Users } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import MotionDiv from "@/components/ui/MotionDiv";

export const metadata = {
  title: "About The Wealth Blueprint | Our Mission",
  description: "Learn about the philosophy and mission behind The Wealth Blueprint and how we help investors achieve financial freedom.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <FadeIn>
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl font-bold tracking-tight mb-6">Our Mission</h1>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Wealth Blueprint was founded on a single principle: that institutional-grade financial 
              strategies should be accessible to the driven individual. We strip away the jargon 
              to provide a clear, research-backed path to sustainable wealth.
            </p>
          </MotionDiv>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            {
              icon: <ShieldCheck className="w-8 h-8 text-brand-emerald" />,
              title: "Integrity First",
              description: "We do not provide guarantees or overpromise. Our approach is based on mathematical probability and historical data, not hype."
            },
            {
              icon: <Target className="w-8 h-8 text-brand-emerald" />,
              title: "Precision Analysis",
              description: "We focus on the 'Wealth Gap'—identifying exactly where your current trajectory falls short of your objective and how to fix it."
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-brand-emerald" />,
              title: "Sustainable Growth",
              description: "Our strategies prioritize long-term stability over short-term speculation, ensuring wealth is not just built, but preserved."
            },
            {
              icon: <Users className="w-8 h-8 text-brand-emerald" />,
              title: "Research-Driven",
              description: "Every resource we sell is the result of hundreds of hours of primary research into global financial markets and capital efficiency."
            }
          ].map((item, idx) => (
            <MotionDiv 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-brand-emerald/50 transition-colors"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed">{item.description}</p>
            </MotionDiv>
          ))}
        </div>
      </section>
    </main>
  );
}