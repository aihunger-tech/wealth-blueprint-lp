"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      <section className="pt-32 pb-20 px-6 max-w-3xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-flex p-3 rounded-full bg-brand-emerald/10 border border-brand-emerald/30 text-brand-emerald mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-slate-500 italic">Last Updated: May 2026</p>
          </div>
        </FadeIn>

        <div className="space-y-10 text-slate-400 leading-relaxed">
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-white font-bold text-xl mb-4">1. Data Collection</h3>
            <p>
              We collect only the information necessary to provide our services. This includes your 
              name, email, and phone number during registration, and specific financial metrics 
              during the audit application process.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-white font-bold text-xl mb-4">2. Use of Financial Data</h3>
            <p>
              Financial data provided during audits is used exclusively to generate your personalized 
              wealth blueprint. We do not sell, rent, or trade your financial information 
              with third-party marketers.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-white font-bold text-xl mb-4">3. Data Security</h3>
 la <p>
              We employ industry-standard encryption and secure database protocols via Supabase 
              to protect your data. However, no method of transmission over the internet is 100% 
              secure, and we encourage users to use strong, unique passwords.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800">
            <h3 className="text-white font-bold text-xl mb-4"> la 4. Your Rights</h3>
            <p>
              You have the right to request a copy of the data we hold about you or request the total 
              deletion of your account and associated records at any time by contacting our 
              support email.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
