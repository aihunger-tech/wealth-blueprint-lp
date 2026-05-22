"use client";
import React, { useState } from "react";

import { LayoutDashboard, Wallet, TrendingUp, ShieldCheck, BrainCircuit, Settings, LogOut, Home, X } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useWealthStore } from "@/store/useWealthStore";

type ModuleId = "audit" | "command" | "accelerator" | "ai" | "settings";

interface DashboardSidebarProps {
  activeModule: ModuleId;
  setActiveModule: (id: ModuleId) => void;
}

export default function DashboardSidebar({ activeModule, setActiveModule }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modules: { id: ModuleId; label: string; icon: any }[] = [
    { id: "command", label: "Command Center", icon: Wallet },
    { id: "accelerator", label: "Accelerator", icon: TrendingUp },
    { id: "audit", label: "Wealth Audit", icon: ShieldCheck },
    { id: "ai", label: "AI Advisor", icon: BrainCircuit },
  ];
 
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 rounded-xl bg-brand-emerald text-brand-navy-dark shadow-xl flex items-center gap-2"
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-xs font-bold">Menu</span>
      </button>

      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 h-screen bg-brand-navy-dark border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-emerald rounded-lg flex items-center justify-center text-brand-navy-dark font-black">W</div>
            <span className="font-black text-xl tracking-tight">Wealth OS</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                setActiveModule(mod.id as ModuleId);
                setIsOpen(false);
              }}
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
        
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link 
            href="/" 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white transition-all"
          >
            <Home className="w-5 h-5" />
            <span>Back to Landing Page</span>
          </Link>
        <Link 
          href="/dashboard/settings" 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeModule === 'settings' ? "bg-brand-emerald text-brand-navy-dark font-bold" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>

        {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1]" onClick={() => setIsOpen(false)} />}
      </div>
    </>
  );
}

