"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { FileText, Layout, PlayCircle, Layers } from "lucide-react";

const Preview = () => {
  const mockups = [
    {
      title: "The Asset Map",
      desc: "Visualizing your net worth and burn rate.",
      icon: <Layout className="w-5 h-5" />,
      color: "bg-brand-gold/10",
    },
    {
      title: "Debt Exit Strategy",
      desc: "The mathematical sequence for debt elimination.",
      icon: <FileText className="w-5 h-5" />,
      color: "bg-zinc-800",
    },
    {
      title: "Portfolio Scaling",
      desc: "Advanced diversification and risk models.",
      icon: <Layers className="w-5 h-5" />,
      color: "bg-brand-gold/20",
    },
    {
      title: "Video Masterclass",
      desc: "Step-by-step execution of the blueprint.",
      icon: <PlayCircle className="w-5 h-5" />,
      color: "bg-zinc-800",
    },
  ];

  return (
    <section className="py-24 w-full bg-brand-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            A Peek <span className="text-gold-gradient">Inside the Blueprint</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            No fluff. No filler. Just high-signal frameworks designed for immediate implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockups.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 group cursor-pointer">
                <div className={cn("aspect-[4/3] rounded-lg mb-4 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-95", item.color)}>
                   {/* Abstract "Page" lines to simulate a PDF/Course */}
                   <div className="absolute inset-0 p-4 flex flex-col gap-2 opacity-30">
                      <div className="h-2 w-full bg-white/20 rounded" />
                      <div className="h-2 w-3/4 bg-white/20 rounded" />
                      <div className="h-2 w-5/6 bg-white/20 rounded" />
                      <div className="h-2 w-1/2 bg-white/20 rounded" />
                      <div className="mt-4 h-12 w-full bg-white/10 rounded-lg" />
                   </div>
                   <div className="relative z-10 p-3 rounded-full bg-brand-black border border-zinc-800 text-brand-gold group-hover:text-white group-hover:border-brand-gold transition-colors">
                     {item.icon}
                   </div>
                </div>
                <h3 className="text-white font-bold text-center mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-xs text-center leading-relaxed">
                  {item.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default Preview;
