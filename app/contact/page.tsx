"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, Send, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Contact Us | The Wealth Blueprint",
  description: "Get in touch with our team for support or partnership inquiries regarding the Wealth Blueprint framework.",
};

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-brand-navy-dark text-white selection:bg-brand-emerald selection:text-brand-navy-dark">
      <div className="fixed inset-0 bg-navy-gradient pointer-events-none -z-10" />
      
      <section className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-6">Contact Us</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Professional communication for professional results. Reach out via your preferred channel.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex gap-6 items-center group hover:border-brand-emerald/50 transition-all">
              <div className="p-4 rounded-2xl bg-brand-emerald/10 text-brand-emerald">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email Support</h3>
                <p className="text-slate-500 text-sm">response within 24-48 hours</p>
                <p className="text-brand-emerald font-medium mt-1">support@wealthblueprint.com</p>
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex gap-6 items-center group hover:border-brand-emerald/50 transition-all">
              <div className="p-4 rounded-2xl bg-brand-emerald/10 text-brand-emerald">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Live Chat</h3>
                <p className="text-slate-500 text-sm">Direct access to analysts</p>
                <p className="text-slate-400 text-sm mt-1 italic">Coming Soon</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
            <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); }}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Name</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Message</label>
                <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-brand-emerald transition-all resize-none" placeholder="How can we help you?" />
              </div>
              {!isSubmitted ? (
                <Button className="w-full py-4 shadow-lg shadow-brand-emerald/20">
                  Send Message <Send className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <div className="p-4 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald flex items-center justify-center gap-2 font-bold">
                  <CheckCircle2 className="w-5 h-5" /> Message Sent Successfully
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
