"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, LayoutDashboard, LogOut, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import WealthAccelerator from "@/components/dashboard/WealthAccelerator";
import { isDevMode } from "@/lib/auth-dev";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isDevMode()) {
        // In a real app, you'd check Supabase session here
        // For now, if not in dev mode and no session, redirect to login
        const session = false; // Placeholder for actual session check
        if (!session) {
          router.push("/login");
          return;
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen bg-brand-navy-dark flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark flex">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      {/* Sidebar */}
      <aside className="w-64 h-screen border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col p-6">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="w-8 h-8 bg-brand-emerald rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-brand-navy-dark" />
          </div>
          <span className="font-black tracking-tight text-xl">WEALTH<span className="text-brand-emerald">BP</span></span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className="flex items-center gap-3 p-3 rounded-xl bg-brand-emerald/10 text-brand-emerald font-bold">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="/dashboard/allocator" className="flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <TrendingUp className="w-5 h-5" /> Strategic Allocator
          </Link>
          <Link href="/dashboard/audit" className="flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
            <ShieldCheck className="w-5 h-5" /> Audit Profile
          </Link>
        </nav>

        <div className="mt-auto space-y-4">
          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Member Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-emerald" />
              <span className="text-sm font-bold">Premium Access</span>
            </div>
          </div>
          <Link href="/login" className="flex items-center gap-3 p-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="w-5 h-5" /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-8 overflow-y-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Financial Command Center</h1>
            <p className="text-slate-400">Welcome back. Your strategic blueprint is active.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-500 uppercase">Portfolio Health</p>
              <p className="text-brand-emerald font-bold italic">OPTIMIZED</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold">
              JD
            </div>
          </div>
        </header>

        <div className="flex-1 max-w-6xl">
          <WealthAccelerator />
        </div>
      </div>
    </main>
  );
}
