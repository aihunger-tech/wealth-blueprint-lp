"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Auth logic will be implemented here using Supabase
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-brand-navy-dark text-white flex items-center justify-center p-6 selection:bg-brand-emerald selection:text-brand-navy-dark">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h1>
          <p className="text-slate-400 text-sm">Continue your path to financial mastery</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                required 
                placeholder="name@company.com" 
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border la-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <label className="flex items-center gap-2 cursor-pointer hover:text-slate-300 transition-colors">
              <input type="checkbox" className="w-3 h-3 rounded border-slate-700 bg-slate-800 text-brand-emerald focus:ring-0" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-brand-emerald hover:underline">
              Forgot Password?
            </Link>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <Button 
            className="w-full py-6 text-lg font-bold shadow-lg shadow-brand-emerald/20" 
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Login to Dashboard"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          <p className="text-center text-slate-500 text-sm mt-6">
            Don't have an account yet?{" "}
            <Link href="/register" className="text-brand-emerald hover:underline font-medium">
              Create free account
            </Link>
          </p>
        </form>
      </motion.div>
    </main>
  );
}
