"use client";
import React, { useState } from "react";
import DashboardSidebar from "./components/DashboardSidebar";
import WealthAcceleratorModule from "./modules/accelerator/WealthAcceleratorModule";
import CommandCenter from "./modules/command/CommandCenter";
import AIAdvisor from "./modules/ai/AIAdvisor";
import WealthAuditModule from "./modules/audit/WealthAuditModule";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [activeModule, setActiveModule] = useState<"audit" | "command" | "accelerator" | "ai">("command");

  const renderModule = () => {
    switch (activeModule) {
      case "accelerator": 
        return (
          <ErrorBoundary name="Wealth Accelerator">
            <WealthAcceleratorModule />
          </ErrorBoundary>
        );
      case "audit": 
        return (
          <ErrorBoundary name="Wealth Audit">
            <WealthAuditModule />
          </ErrorBoundary>
        );
      case "command": 
        return (
          <ErrorBoundary name="Command Center">
            <CommandCenter />
          </ErrorBoundary>
        );
      case "ai": 
        return (
          <ErrorBoundary name="AI Advisor">
            <AIAdvisor />
          </ErrorBoundary>
        );
      default: 
        return (
          <ErrorBoundary name="Wealth Audit">
            <WealthAuditModule />
          </ErrorBoundary>
        );
    }
  };

  return (
    <div className="flex h-screen bg-brand-navy-dark overflow-hidden">
      <DashboardSidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-navy-gradient opacity-50 pointer-events-none -z-10" />
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
