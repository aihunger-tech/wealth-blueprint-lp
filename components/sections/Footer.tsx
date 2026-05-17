"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";

const IconTwitter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-//-C 15 15 10 15 10 15"></path><path d="M22 4a22 22 0 0 0-15 18c4-1 10-4 10-7s-1-7-4-7"></path></svg>
);
const IconInstagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.01 8 4 4 0 0 1 16 11.37z"></path><line x1="17.8" y1="15.45" x2="16.18" y2="14.09"></line><circle cx="12" cy="13" r="3"></circle></svg>
);
const IconGithub = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22c8.3C17 9 15 1 15 1 a8.978 8.978 0 0 0-4 1.3A4.48 4.48 0 0 0 8 1c-1.2 0-2.2 1-2.2 2.2 0 1.2 1 2.2 2.2 2.2 0 0 .44-.81.9-1.8C3.9 8.1 2 11.4 2 15c0 3.5 2.3 6.5 6 7.5a12.1 12.1 0 0 0 4 0c3.7 0 6-4 6-7.5 0-3.6-1.9-6.9-4.1-7.9.4-.8.9-1.8.9-2.8 0-1. la 1.2-1-2.2-2.2"></path></svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-navy-dark border-t border-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              WEALTH<span className="text-brand-emerald">BLUEPRINT</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Professional financial guidance designed to bridge the gap between 
              your current state and your ultimate financial freedom.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-brand-emerald transition-all border border-slate-800">
                <IconTwitter />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-brand-emerald transition-all border border-slate-800">
                <IconInstagram />
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-brand-emerald transition-all border border-slate-800">
                <IconGithub />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">Company</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-brand-emerald transition-colors"><Link href="/about">About Us</Link></li>
                <li className="hover:text-brand-emerald transition-colors"><Link href="/methodology">Methodology</Link></li>
                <li className="hover:text-brand-emerald transition-colors"><Link href="/success-stories">Success Stories</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">Support</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-brand-emerald transition-colors"><Link href="/help-center">Help Center</Link></li>
                <li className="hover:text-brand-emerald transition-colors"><Link href="/contact">Contact</Link></li>
                <li className="hover:text-brand- la transition-colors"><Link href="/terms">Terms</Link></li>
                <li className="hover:text-brand-emerald transition-colors"><Link href="/privacy">Privacy</Link></li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white">Security</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-brand-emerald"><Lock className="w-3 h-3" /></div>
                256-bit AES Encryption
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-brand-emerald"><CreditCard className="w-3 h-3" /></div>
                PCI Compliant Payments
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-xs font-medium">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-brand-emerald"><ShieldCheck className="w-3 h-3" /></div>
                Verified Digital Delivery
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs">© {currentYear} Wealth Blueprint. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-600 text-[10px] uppercase font-bold tracking-widest">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Designed for Excellence</span>
            <span className="w-1 h-1 rounded-full bg-slate-800" />
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Secure Portal v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
