"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { SOCIAL_PROOF } from "@/constants";
import { Star, CheckCircle2 } from "lucide-react";

const SocialProof = () => {
  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="strategies" className="py-24 w-full relative">
      <div className="container mx-auto px-6">
        
        {/* 1. Stats Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {SOCIAL_PROOF.stats.map((stat, index) => (
            <motion.div variants={itemVariants} key={index} className="text-center">
              <div className="text-5xl font-bold text-gold-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-zinc-500 uppercase tracking-widest text-xs font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 2. Testimonials Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Proven Results. <span className="text-brand-gold">Real Wealth.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Join a community of disciplined investors who have transitioned from financial anxiety to absolute control.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        >
          {SOCIAL_PROOF.testimonials.map((testimonial, index) => (
            <motion.div variants={itemVariants} key={index}>
              <Card className="p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="text-zinc-300 text-lg leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-brand-gold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold">{testimonial.name}</div>
                    <div className="text-zinc-500 text-sm">{testimonial.role}</div>
                  </div>
                  <CheckCircle2 className="ml-auto w-5 h-5 text-brand-gold opacity-50" />
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
