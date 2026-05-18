"use client";
import React, { useState } from 'react';
import { useWealthStore } from '@/store/useWealthStore';
import { LucideIcon, TrendingUp, Wallet, Target, ArrowUpCircle, ArrowDownCircle, Trash2 } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

// Utility for currency formatting
const formatCurrency = (num: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

function GoalModal({ isOpen, onClose, onAddGoal, existingGoals }: { isOpen: boolean, onClose: () => void, onAddGoal: (goal: any) => void, existingGoals: any[] }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '',
    deadline: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.targetAmount) return;
    onAddGoal({
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount || '0'),
      deadline: formData.deadline,
    });
    setFormData({ name: '', targetAmount: '', currentAmount: '', deadline: new Date().toISOString().split('T')[0] });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">Set Strategic Goal</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Goal Name</label>
            <input 
              type="text" placeholder="e.g. Retirement Fund" 
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-1 ring-brand-emerald"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Target Amount</label>
              <input 
                type="number" placeholder="50000" 
                value={formData.targetAmount} onChange={e => setFormData({...formData, targetAmount: e.target.value})}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-1 ring-brand-emerald"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Current Savings</label>
              <input 
                type="number" placeholder="1000" 
                value={formData.currentAmount} onChange={e => setFormData({...formData, currentAmount: e.target.value})}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-1 ring-brand-emerald"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase">Target Date</label>
            <input 
              type="date" 
              value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:ring-1 ring-brand-emerald"
            />
          </div>
          <Button type="submit" className="w-full py-4 rounded-xl bg-brand-emerald text-brand-navy-dark font-black">
            Create Strategy Goal
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

function StatCard({ title, amount, icon: Icon, type }: { title: string, amount: number, icon: any, type: 'income' | 'expense' | 'balance' }) {
  const colors = {
    income: "text-brand-emerald bg-brand-emerald/10 border-brand-emerald/20",
    expense: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    balance: "text-white bg-white/10 border-white/20",
  };

  return (
    <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex items-center gap-5 transition-all hover:scale-[1.02]">
      <div className={`p-4 rounded-2xl border ${colors[type]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-white">{formatCurrency(amount)}</p>
      </div>
    </div>
  );
}

export default function CommandCenter() {
  const { 
    transactions, categories, budgets, goals,
    addTransaction, deleteTransaction, updateBudget, updateGoal, deleteGoal, addGoal
  } = useWealthStore();
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);


  const summary = (() => {
    const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  })();

  const timelineData = React.useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayTransactions = transactions.filter(t => t.date === date);
      const income = dayTransactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
      const expense = dayTransactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
      return { date, income, expense };
    });
  }, [transactions]);

  const categoryData = React.useMemo(() => {
    const breakdown: Record<string, number> = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
    });
    return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const COLORS = ['#10B981', '#F43F5E', '#6366F1', '#F59E0B', '#8B5CF6', '#06B6D4', '#EF4444'];

    return (
      <>
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Overview & Chart */}
          <div className="xl:col-span-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard title="Net Balance" amount={summary.balance} icon={Wallet} type="balance" />
              <StatCard title="Total Income" amount={summary.income} icon={ArrowUpCircle} type="income" />
              <StatCard title="Total Expenses" amount={summary.expenses} icon={ArrowDownCircle} type="expense" />
            </div>
    
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-6">Financial Intelligence Trend</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }} />
                    <Area type="monotone" dataKey="income" stroke="#10B981" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                    <Area type="monotone" dataKey="expense" stroke="#F43F5E" fillOpacity={0} strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
                <h3 className="text-lg font-bold text-white mb-6">Expense Distribution</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {categoryData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', color: '#fff' }} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
    
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-white mb-4">Budget Efficiency</h3>
                <div className="space-y-4">
                  {categories.map(cat => {
                    const limit = budgets[cat] || 0;
                    const current = transactions.filter(t => t.category === cat && t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
                    const percent = limit > 0 ? Math.min((current / limit) * 100, 100) : 0;
                    if (limit === 0 && current === 0) return null;
                    return (
                      <div key={cat} className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                          <span>{cat}</span>
                          <span>{formatCurrency(current)} / {formatCurrency(limit)}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${percent > 90 ? 'bg-rose-500' : percent > 70 ? 'bg-yellow-500' : 'bg-brand-emerald'}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
    
          {/* Right Column: Actions & Goals */}
          <div className="xl:col-span-4 space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-6">Quick Transaction</h3>
              <TransactionForm 
                onSuccess={() => {}} 
                categories={categories} 
                addTransaction={addTransaction} 
              />
            </div>
    
            <div className="p-6 rounded-3 la-slate-900/50 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Strategic Goals</h3>
                <Button 
                  variant="outline" size="sm" className="rounded-full text-xs border-brand-emerald text-brand-emerald hover:bg-brand-emerald hover:text-brand-navy-dark transition-all"
                  onClick={() => setIsGoalModalOpen(true)}
                >
                  + New Goal
                </Button>
              </div>
              <div className="space-y-4">
                {goals.map(goal => (
                  <div key={goal.id} className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-white">{goal.name}</span>
                      <span className="text-xs text-slate-500 font-medium">{Math.round((goal.currentAmount/goal.targetAmount)*100)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-emerald transition-all" 
                        style={{ width: `${(goal.currentAmount/goal.targetAmount)*100}%` }} 
                      />
                    </div>
                    <div className="flex justify-between text-[10px] uppercase font-black text-slate-500">
                      <span>${goal.currentAmount}</span>
                      <span>Target: ${goal.targetAmount}</span>
                    </div>
                  </div>
                ))}
                {goals.length === 0 && <p className="text-center text-slate-500 text-sm italic py-4">No goals set yet.</p>}
              </div>
            </div>
    
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 overflow-hidden">
              <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-3">
                {transactions.slice(0, 5).map(t => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-brand-emerald/10 text-brand-emerald' : 'bg-rose-500/10 text-rose-500'}`}>
                        {t.type === 'income' ? <ArrowUpCircle size={14} /> : <ArrowDownCircle size={14} />}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{t.title}</p>
                        <p className="text-[10px] text-slate-500 uppercase">{t.category}</p>
                      </div>
                    </div>
                    <div className={`text-xs font-black ${t.type === 'income' ? 'text-brand-emerald' : 'text-rose-500'}`}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <GoalModal 
          isOpen={isGoalModalOpen} 
          onClose={() => setIsGoalModalOpen(false)} 
          onAddGoal={addGoal} 
          existingGoals={goals} 
        />
      </>
    );
}


function TransactionForm({ categories, addTransaction, onSuccess }: { categories: string[], addTransaction: any, onSuccess: () => void }) {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount),
      type,
    });
    setFormData({ title: '', amount: '', category: categories[0] || '', date: new Date().toISOString().split('T')[0], description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex p-1 bg-slate-800 rounded-xl w-fit mb-4">
        <button 
          type="button" 
          onClick={() => setType('income')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${type === 'income' ? 'bg-brand-emerald text-brand-navy-dark' : 'text-slate-400 hover:text-white'}`}
        >
          Income
        </button>
        <button 
          type="button" 
          onClick={() => setType('expense')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${type === 'expense' ? 'bg-brand-emerald text-brand-navy-dark' : 'text-slate-400 hover:text-white'}`}
        >
          Expense
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input 
          type="text" 
          placeholder="Title" 
          value={formData.title} 
          onChange={e => setFormData({...formData, title: e.target.value})}
          className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:ring-1 ring-brand-emerald"
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={formData.amount} 
          onChange={e => setFormData({...formData, amount: e.target.value})}
          className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:ring-1 ring-brand-emerald"
        />
      </div>
      <select 
        value={formData.category} 
        onChange={e => setFormData({...formData, category: e.target.value})}
        className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs outline-none focus:ring-1 ring-brand-emerald"
      >
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <button 
        type="submit"
        className="w-full py-2 rounded-lg bg-brand-emerald text-brand-navy-dark font-bold text-xs hover:opacity-90 transition-all"
      >
        Save Transaction
      </button>
    </form>
  );
}
