import React from "react";
import { motion } from "framer-motion";
import { Scale, Database, Zap } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export const metadata = {
  title: "Our Methodology | The Science of Wealth",
  description: "Explore the strategic frameworks and research-backed methodology we use to optimize asset allocation and minimize wealth leakage.",
};

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <FadeIn>
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold tracking-tight mb-6">Our Methodology</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              We employ a rigorous three-tier analysis process to ensure every recommendation 
              is backed by data and aligned with real-world applicability.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-12">
          {[
            {
              step: "01",
              title: "Quantitative Data Harvesting",
              icon: <Database className="w-6 h-6 text-brand-emerald" />,
              desc: "We analyze thousands of historical data points across asset classes, inflation cycles, and interest rate regimes to identify recurring wealth-generation patterns."
            },
            {
              step: "02",
              title: "Risk-Adjusted Filtering",
              icon: <Scale className="w-6 h-6 text-brand-emerald" />,
              desc: "Not all growth is good growth. We filter every strategy through a risk-adjusted lens, discarding any method that exposes the principal to unacceptable volatility."
            },
            {
              step: "03",
              title: "Execution Mapping",
              icon: <Zap className="w-6 h-6 text-brand-emerald" />,
              desc: "We translate theoretical models into actionable blueprints. If a strategy cannot be executed by an individual without institutional software, it is discarded."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="bg-brand-emerald text-brand-navy-dark font-black w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
                <p className="text-slate-400 text-lg leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}