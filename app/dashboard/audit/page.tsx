"use client";

import React, { useEffect, useState } from "react";
import { isDevMode } from "@/lib/auth-dev";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowLeft, FileText, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AuditPage() {
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
           <h1 className="text-3xl font-bold mb-4">Audit Profile</h1>
           <p className="text-slate-400 mb-8">Complete your financial audit to unlock strategic blueprints.</p>
           
           <div className="space-y-6">
             <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-4">
               <ShieldCheck className="w-6 h-6 text-brand-emerald" />
               <div>
                 <h3 className="font-bold mb-1">Identity Verification</h3>
                 <p className="text-sm text-slate-500">Verify your credentials to ensure security.</p>
               </div>
             </div>
             <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-4">
               <FileText className="w-6 h-6 text-brand-emerald" />
               <div>
                 <h3 className="font-bold mb-1">Financial Statements</h3>
                 <p className="text-sm text-slate-500">Upload your most recent brokerage and bank statements.</p>
               </div>
             </div>
             <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-4">
               <AlertCircle className="w-6 h-6 text-red-400" />
               <div>
                 <h3 className="font-bold mb-1">Missing Documents</h3>
                 <p className="text-sm text-slate-500">Your updated 2025 tax return is missing.</p>
               </div>
             </div>
           </div>
         </div>
       </div>
    </main>
  );
}