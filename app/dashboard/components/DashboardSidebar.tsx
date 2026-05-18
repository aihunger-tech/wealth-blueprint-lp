"use client";
import React, { useState } from "react";

import { LayoutDashboard, Wallet, TrendingUp, ShieldCheck, BrainCircuit, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useWealthStore } from "@/store/useWealthStore";

type ModuleId = "audit" | "command" | "accelerator" | "ai";

interface DashboardSidebarProps {
  activeModule: ModuleId;
  setActiveModule: (id: ModuleId) => void;
}

export default function DashboardSidebar({ activeModule, setActiveModule }: DashboardSidebarProps) {
  const modules: { id: ModuleId; label: string; icon: any }[] = [
    { id: "command", label: "Command Center", icon: Wallet },
    { id: "accelerator", label: "Accelerator", icon: TrendingUp },
    { id: "audit", label: "Wealth Audit", icon: ShieldCheck },
    { id: "ai", label: "AI Advisor", icon: BrainCircuit },
  ];



  return (
    <div className="w-64 h-screen bg-brand-navy-dark border-r border-slate-800 flex flex-col">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-emerald rounded-lg flex items-center justify-center text-brand-navy-dark font-black">W</div>
          <span className="font-black text-xl tracking-tight">Wealth OS</span>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {modules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActiveModule(mod.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeModule === mod.id 
              ? "bg-brand-emerald text-brand-navy-dark font-bold shadow-lg shadow-brand-emerald/20" 
              : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <mod.icon className="w-5 h-5" />
            <span>{mod.label}</span>
          </button>
        ))}

      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-all">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
