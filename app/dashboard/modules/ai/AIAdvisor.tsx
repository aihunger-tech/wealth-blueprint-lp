"use client";
import React, { useState } from "react";
import { 
  BrainCircuit, Sparkles, Send, Bot, 
  BarChart3, Lightbulb, ShieldAlert, 
  ArrowUpRight, ChevronRight, Wand2, RefreshCw 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWealthStore } from "@/store/useWealthStore";

export default function AIAdvisor() {
  const { assets, transactions, goals } = useWealthStore();
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [chatHistory, setChatHistory] = useState<{role: 'ai' | 'user', content: string}[]>([]);
  const [activeTool, setActiveTool] = useState<"strategy" | "gap" | "risk">("strategy");

  const analyzeWealth = async (tool: "strategy" | "gap" | "risk", customPrompt?: string) => {
    setIsAnalyzing(true);
    
    // Context construction for NVIDIA AI
    const context = {
      portfolio: assets,
      goals: goals,
      recentSpending: transactions.slice(0, 10),
      currentMarket: "Volatile (VIX 24)",
    };

    try {
      const res = await fetch('/api/wealth-core/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: customPrompt || `Run ${tool} analysis on my financial data.`, 
          context 
        }),
      });
      const data = await res.json();
      
      setChatHistory(prev => [...prev, { role: 'user', content: customPrompt || `Triggering ${tool} analysis...` }, { role: 'ai', content: data.text || data.message || "Analysis complete. See the updated strategic roadmap." }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'ai', content: "I encountered an error connecting to the AI core. Please check your NVIDIA API key." }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-full">
      {/* AI Control Panel */}
      <div className="xl:col-span-4 space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-emerald/20 rounded-lg text-brand-emerald">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">AI Strategic Advisor</h3>
          </div>
          
          <p className="text-slate-400 text-sm leading-relaxed">
            Powered by NVIDIA AI. This core analyzes your portfolio gaps and cash flow to provide institutional-grade investment roadmaps.
          </p>

          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => analyzeWealth("strategy")}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between group ${activeTool === "strategy" ? "bg-brand-emerald text-brand-navy-dark border-brand-emerald" : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600"}`}
            >
              <div className="flex items-center gap-3">
                <Wand2 className="w-5 h-5" />
                <span className="font-bold text-sm">Generate Wealth Roadmap</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </button>

            <button 
              onClick={() => analyzeWealth("gap")}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between group ${activeTool === "gap" ? "bg-brand-emerald text-brand-navy-dark border-brand-emerald" : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600"}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-emerald/10 rounded-lg text-brand-emerald">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm">Deep Gap Analysis</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </button>

            <button 
              onClick={() => analyzeWealth("risk")}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between group ${activeTool === "risk" ? "bg-brand-emerald text-brand-navy-dark border-brand-emerald" : "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600"}`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-emerald/10 rounded-lg text-brand-emerald">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm">Risk Stress Test</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
            </button>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-brand-emerald/5 border border-brand-emerald/20 space-y-4">
          <div className="flex items-center gap-2 text-brand-emerald font-bold text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>AI Insight of the Day</span>
          </div>
          <p className="text-white text-sm italic leading-relaxed">
            "Your current allocation is heavily skewed towards growth. With the current market volatility, shifting 5% into hedging assets could increase your risk-adjusted return by 1.2%."
          </p>
        </div>
      </div>

      {/* AI Chat Interface */}
      <div className="xl:col-span-8 flex flex-col h-[calc(100vh-12rem)] bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {chatHistory.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-brand-emerald/10 rounded-full text-brand-emerald">
                <Bot size={48} className="animate-pulse" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">Ready to Optimize</h4>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                  Ask me about your portfolio, request a new strategy, or let me analyze your spending patterns.
                </p>
              </div>
            </div>
          )}
          
          <AnimatePresence>
            {chatHistory.map((msg, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md p-4 rounded-2xl ${
                  msg.role === 'user' 
                  ? 'bg-brand-emerald text-brand-navy-dark font-medium rounded-tr-none' 
                  : 'bg-slate-800 text-white border border-slate-700 rounded-tl-none'
                }`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/80">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) analyzeWealth("strategy", input);
              setInput("");
            }}
            className="relative flex items-center gap-3"
          >
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI Advisor..."
              className="flex-1 p-4 rounded-2xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-2 ring-brand-emerald/50 transition-all"
            />
            <button 
              disabled={isAnalyzing}
              className="p-4 rounded-2xl bg-brand-emerald text-brand-navy-dark hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
