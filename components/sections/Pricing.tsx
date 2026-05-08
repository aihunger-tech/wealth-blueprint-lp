"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PRICING_TIERS, LINKS } from "@/constants";
import { Check, Crown, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="pricing" className="py-20 md:py-24 w-full relative overflow-hidden px-4">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Choose Your <span className="text-gold-gradient">Wealth Path</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg px-4"
          >
            Invest in your financial education today. Get instant access to the 
            blueprints and tools used by the top 1% of disciplined investors.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto items-center"
        >
          {PRICING_TIERS.map((tier, index) => (
            <motion.div variants={itemVariants} key={index} className="relative px-2 sm:px-0">
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="px-4 py-1 rounded-full bg-gold-gradient text-brand-black text-xs font-bold uppercase tracking-widest flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-brand-black" /> Most Popular
                  </span>
                </div>
              )}

              <Card 
                highlight={tier.highlight} 
                className={cn(
                  "p-6 md:p-8 flex flex-col h-full transition-all duration-300",
                  tier.highlight ? "sm:scale-105 z-10 border-brand-gold/40" : "hover:scale-102"
                )}
              >
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    {tier.name === "Elite Course" ? <Crown className="w-5 h-5 text-brand-gold" /> : <Zap className="w-5 h-5 text-brand-gold" />}
                    <h3 className="text-lg md:text-xl font-bold text-white">{tier.name}</h3>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-extrabold text-white">{tier.price}</span>
                    <span className="text-zinc-500 text-xs md:text-sm">/once</span>
                  </div>
                  <p className="text-zinc-400 mt-3 text-xs md:text-sm leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mb-10 flex-grow">
                  {tier.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3 text-xs md:text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={tier.highlight ? "premium" : "outline"} 
                  size="lg" 
                  className="w-full py-3 md:py-4" 
                  asChild
                >
                  <Link href={(LINKS as any)[tier.link]}>
                    {tier.cta}
                  </Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
