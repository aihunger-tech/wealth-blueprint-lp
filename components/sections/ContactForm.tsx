"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
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
  );
}