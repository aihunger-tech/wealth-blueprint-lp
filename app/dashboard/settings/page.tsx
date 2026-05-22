"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    currency: "USD",
    notifications: true,
  });

  const handleSave = () => {
    alert("Settings updated successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex items-center justify-between mb-8"
      >
        <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        <Button onClick={handleSave} className="bg-brand-emerald text-brand-navy-dark font-bold flex items-center gap-2">
          <Save className="w-4 h-4" /> Save Changes
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="text-brand-emerald" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name} 
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 ring-brand-emerald/50 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                <input 
                  type="email" 
                  value={profile.email} 
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white focus:ring-2 ring-brand-emerald/50 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="text-brand-emerald" /> Security
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                <span className="text-slate-300">Change Password</span>
                <Button variant="outline" size="sm" className="text-white border-slate-600">Update</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Globe className="text-brand-emerald" /> Preferences
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Currency</label>
                <select 
                  value={profile.currency} 
                  onChange={(e) => setProfile({...profile, currency: e.target.value})}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                <span className="text-slate-300 text-sm">Email Notifications</span>
                <input 
                  type="checkbox" 
                  checked={profile.notifications}
                  onChange={(e) => setProfile({...profile, notifications: e.target.checked})}
                  className="w-4 h-4 accent-brand-emerald"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
