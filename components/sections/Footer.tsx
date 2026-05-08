import React from "react";
import { SITE_CONFIG } from "@/constants";
import { Link } from "lucide-react"; // Note: Using Lucide Link icon here, not NextJS Link

const Footer = () => {
  return (
    <footer className="py-12 w-full border-t border-zinc-900 bg-brand-black">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gold-gradient rounded-sm rotate-45" />
          <span className="font-bold text-white">{SITE_CONFIG.name}</span>
        </div>
        
        <div className="flex items-center gap-8 text-sm text-zinc-500">
          <a href="#" className="hover:text-brand-gold transition-colors">Terms</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Contact</a>
        </div>

        <div className="text-zinc-600 text-xs">
          © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
