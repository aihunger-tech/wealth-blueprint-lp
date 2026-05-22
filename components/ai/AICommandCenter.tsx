"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Send, X, Sparkles, Bot, RefreshCw } from "lucide-react";
import { useWealthStore } from "@/store/useWealthStore";

export default function AICommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', content: string}[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('wealth-ai-chat');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse chat history", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wealth-ai-chat', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // Auto-send the voice command after a short pause
      setTimeout(() => {
        handleSend(transcript);
      }, 500);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    
    try {
      recognition.start();
    } catch (e) {
      console.error("Recognition start failed", e);
      setIsListening(false);
    }
  };

  const handleSend = async (customPrompt?: string) => {
    const prompt = customPrompt || input;
    if (!prompt.trim()) return;

    const userMsg = prompt;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsProcessing(true);

    try {
      const res = await fetch('/api/wealth-core/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt, 
          context: { 
            assets: useWealthStore.getState().assets, 
            goals: useWealthStore.getState().goals,
            transactions: useWealthStore.getState().transactions 
          } 
        }),
      });
      const data = await res.json();
      
      if (data.action) {
        const { type, params } = data.action;
        const store = useWealthStore.getState();
        
        if (type === 'UPDATE_ASSET') {
          const asset = store.assets.find(a => a.symbol === params.symbol);
          if (asset) {
            store.updateAsset(asset.id, params.amount, params.price);
          } else {
            store.addAsset({
              id: crypto.randomUUID(),
              symbol: params.symbol,
              amount: params.amount,
              averagePrice: params.price,
              type: params.symbol === 'BTC' || params.symbol === 'ETH' ? 'crypto' : 'stock'
            });
          }
        } else if (type === 'UPDATE_GOAL') {
          const goal = store.goals.find(g => g.name === params.name);
          if (goal) {
            store.updateGoal(goal.id, params.currentAmount);
          } else {
            store.addGoal(params);
          }
        } else if (type === 'ADD_TRANSACTION') {
          store.addTransaction(params);
        } else if (type === 'DELETE_ASSET') {
          const asset = store.assets.find(a => a.symbol === params.symbol);
          if (asset) store.removeAsset(asset.id);
        } else if (type === 'DELETE_GOAL') {
          const goal = store.goals.find(g => g.name === params.name);
          if (goal) store.deleteGoal(goal.id);
        } else if (type === 'DELETE_TRANSACTION') {
          store.deleteTransaction(params.id);
        }
      }
      
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: data.text || "I've processed your request successfully." 
      }]);
    } catch (e) {


      setMessages(prev => [...prev, { role: 'ai', content: "Connection error. Please try again." }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-6 w-[400px] h-[500px] bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Bot className="text-brand-emerald w-5 h-5" />
                <span className="font-bold text-white text-sm">Wealth AI Orchestrator</span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-1 hover:bg-slate-800 rounded-full transition-colors">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
        
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-50">
                  <Sparkles className="w-8 h-8 text-brand-emerald animate-pulse" />
                  <p className="text-slate-400 text-xs">How can I optimize your wealth today?</p>
                </div>
              ) : (
                messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${m.role === 'user' ? 'bg-brand-emerald text-brand-navy-dark font-medium rounded-tr-none' : 'bg-slate-800 text-white border border-slate-700 rounded-tl-none'}`}>
                      {m.content}
                    </div>
                  </div>
                ))
              )}
            </div>
        
            <div className="p-4 bg-slate-900/80 border-t border-slate-800">
              <div className="relative flex items-center gap-2">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Command wealth..."
                  className="flex-1 p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-2 ring-brand-emerald/50 transition-all"
                />
                <div className="flex gap-2">
                  <button 
                    onClick={startListening}
                    className={`p-3 rounded-xl transition-all ${isListening ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleSend()}
                    disabled={isProcessing}
                    className="p-3 rounded-xl bg-brand-emerald text-brand-navy-dark hover:opacity-90 disabled:opacity-50"
                  >
                    {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="w-14 h-14 rounded-full bg-brand-emerald shadow-lg shadow-brand-emerald/30 flex items-center justify-center text-brand-navy-dark hover:shadow-brand-emerald/50 transition-all group"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
      </motion.button>
    </div>
  );
}
