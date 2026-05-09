"use client";

import React from "react";
import { ShieldCheck, CreditCard, Lock } from "lucide-react";

// Custom SVG components to avoid lucide-react version conflicts
const IconTwitter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-//-C 15 15 10 15 10 15"></path><path d="M22 4a22 22 0 0 0-15 18c4-1 10-4 10-7s-1-7-4-7"></path></svg>
); // Simplified X/Twitter
const IconInstagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.01 8 4 4 0 0 1 16 11.37z"></path><line x1="17.8" y1="15.45" x2="16.18" y2="14.09"></line><circle cx="12" cy="13" r="3"></circle></svg>
);
const IconGithub = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22c8.3C17 9 15 1 15 1 a8.978 8.978 0 0 0-4 1.3A4.48 4.48 0 0 0 8 1c-1.2 0-2.2 1-2.2 2.2 0 1.2 1 2.2 2.2 2.2 0 0 .44-.81.9-1.8C3.9 8.1 2 11.4 2 15c0 3.5 2.3 6.5 6 7.5a12.1 12.1 0 0 0 4 0c3.7 0 6-4 6-7.5 0-3.6-1.9-6.9-4.1-7.9.4-.8.9-1.8.9-2.8 0-1.2-1-2.2-2.2-2.2"></path></svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-black border-t border-slate-900">
      
      {/* FINAL CTA SECTION */}
      <div className="px-6 py-20 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          Ready to Change Your <span className="text-brand-gold">Financial Reality?</span>
        </h2>
        <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
          Don't let your wealth gaps hold you back. Join 5,000+ others who have 
          unlocked their personalized blueprint to financial freedom.
        </p>
        <button 
          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          className="px-10 py-4 bg-brand-gold text-brand-black font-black rounded-full hover:scale-105 transition-all shadow-lg shadow-brand-gold/20"
        >
          Unlock Your Vault Now
        </button>
      </div>

      {/* MAIN FOOTER CONTENT */}
      <div className="px-6 py-12 bg-slate-950/50 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-extrabold tracking-tighter mb-6">
              WEALTH<span className="text-brand-gold">BLUEPRINT</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Professional-grade financial research and tools designed to close the gap 
              between your current reality and your ultimate wealth goals.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-brand-gold transition-colors" aria-label="Twitter">
                <IconTwitter />
              </a>
              <a href="#" className="text-slate-500 hover:text-brand-gold transition-colors" aria-label="Instagram">
                <IconInstagram />
              </a>
              <a href="#" className="text-slate-500 hover:text-brand-gold transition-colors" aria-label="Github">
                <IconGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Company</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li className="hover:text-brand-gold transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Our Methodology</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Success Stories</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Careers</li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Support</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Help Center</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Contact Support</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-brand-gold transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Trust Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold mb-2">Secure Access</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-brand-gold">
                  <Lock className="w-3 h-3" />
                </div>
                256-bit AES Encryption
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-brand-gold">
                  <CreditCard className="w-3 h-3" />
                </div>
                PCI Compliant Payments
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-brand-gold">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                Verified Digital Delivery
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs">
            © {currentYear} Wealth Blueprint. All rights reserved.
          </p>
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
