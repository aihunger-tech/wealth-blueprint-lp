import React from "react";
import { Mail, MessageSquare, Phone, Send, CheckCircle2 } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import ContactForm from "@/components/sections/ContactForm";

export const metadata = {
  title: "Contact Us | The Wealth Blueprint",
  description: "Get in touch with our team for support or partnership inquiries regarding the Wealth Blueprint framework.",
};

export default function ContactPage() {
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
            <div className="p-6 rounded-3 laC-s- l de l 20 rounded-3xl bg-slate-900/50 border border-slate-800 flex gap-6 items-center group hover:border-brand-emerald/50 transition-all">
               <div className="p-4 rounded-2xl bg-brand-emerald/10 text-brand-emerald">
                 <Mail className="w-6 h-6" />
               </div>
               <div className="flex-1">
                 <h3 className="font-bold text-lg">Email Support</h3>
                 <p className="text-slate-500 text-sm">response within 24-48 hours</p>
                 <p className="text-brand-emerald font-medium mt-1">support@wealthblueprint.com</p>
               </div>
            </div>
            <div className="p-6 rounded-3 laC-s- la s de l 20 rounded-3xl bg-slate-900/50 border border-slate-800 flex gap-6 items-center group hover:border-brand-emerald/50 transition-all">
               <div className="p-4 rounded-2xl bg-brand-emerald/10 text-brand-emerald">
                 <MessageSquare className="w-6 h-6" />
               </div>
               <div className="flex-1">
                 <h3 className="font-bold text-lg">Live Chat</h3>
                 <p className="text-slate-500 text-sm">Direct access to analysts</p>
                 <p className="text-slate-400 text-sm mt-1 italic">Coming Soon</p>
               </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
