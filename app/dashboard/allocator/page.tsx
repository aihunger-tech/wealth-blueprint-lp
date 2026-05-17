"use client";

import React, { useEffect, useState } from "react";
import { isDevMode } from "@/lib/auth-dev";
import { useRouter } from "next/navigation";
import { PieChart, ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AllocatorPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isDevMode()) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return <div className="min-h-screen bg-brand-navy-dark flex items-center justify-center text-white">Loading...</div>;

  return (
    <main className="min-h-screen bg-brand-navy-dark text-white flex">
       <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
       <div className="flex-1 p-8">
         <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-all">
           <ArrowLeft className="w-4 h-4" /> Back to Dashboard
         </Link>
         <div className="max-w-4xl">
           <h1 className="text-3xl font-bold mb-4">Strategic Allocator</h1>
           <p className="text-slate-400 mb-8">Optimize your asset distribution based on your risk profile.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
               <PieChart className="w-8 h-8 text-brand-emerald mb-4" />
               <h3 className="font-bold text-lg mb-2">Asset Mix</h3>
               <p className="text-sm text-slate-500">Analyze current stock vs bond ratio.</p>
             </div>
             <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
               <TrendingUp className="w-8 h-8 text-brand-emerald mb-4" />
               <h3 className="font-bold text-lg mb-2">Growth Projection</h3>
               <p className="text-sm text-slate-500">Estimated returns for next 12 months.</p>
             </div>
             <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
               <div className="w-8 h-8 text-brand-emerald mb-4 flex items-center justify-center font-bold">!</div>
               <h3 className="font-bold text-lg mb-2">Risk Warning</h3>
               <p className="text-sm text-slate-500">Diversification score: Optimal.</p>
             </div>
           </div>
         </div>
       </div>
    </main>
  );
}