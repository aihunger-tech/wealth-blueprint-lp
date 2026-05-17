"use client";

import { motion } from "framer-motion";
import React from "react";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="flex flex-col"
    >
      {children}
    </motion.div>
  );
}