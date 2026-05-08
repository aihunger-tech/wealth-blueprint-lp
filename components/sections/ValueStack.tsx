"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { VALUE_STACK } from "@/constants";
import { BookOpen, Zap, Target, CheckCircle2 } from "lucide-react";

const ValueStack = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  // Mapping icons to the value items
  const iconMap: Record<string, React.ReactNode> = {
    "The Core Guides": <BookOpen className="w-6 h-6 text-brand-gold" />,
    "Strategic Frameworks": <Zap className="w-6 h-6 text-brand-gold" />,
    "Wealth Tools": <Target className="w-6 h-6 text-brand-gold" />,
  };

  return (
    <section id="strategies" className="py-24 w-full bg-brand-dark/50 relative">
      {/* Subtle background element to break the black */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise')] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            The Architecture of <span className="text-gold-gradient">Wealth</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            We don't just give you information. We provide a systematized blueprint 
            designed to remove guesswork and maximize your financial velocity.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {VALUE_STACK.map((item, index) => (
            <motion.div variants={itemVariants} key={index}>
              <Card className="p-8 h-full flex flex-col group">
                <div className="mb-6 p-3 w-fit rounded-xl bg-brand-black border border-zinc-800 group-hover:border-brand-gold transition-colors duration-300">
                  {iconMap[item.title] || <Target className="w-6 h-6 text-brand-gold" />}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {item.title}
                </h3>
                
                <p className="text-zinc-400 leading-relaxed mb-8 flex-grow">
                  {item.description}
                </p>

                {/* The Outcome Section - This is the Conversion Trigger */}
                <div className="pt-6 border-t border-zinc-800 group-hover:border-brand-gold/30 transition-colors duration-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold block mb-1">
                        The Outcome
                      </span>
                      <span className="text-zinc-200 font-medium text-sm">
                        {item.outcome}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueStack;
