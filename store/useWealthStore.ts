'use client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Transaction, FinanceState, Goal, PortfolioAsset, PortfolioState, INITIAL_PORTFOLIO } from '@/types';

interface WealthStore extends FinanceState, PortfolioState {
  // Finance extensions
  goals: Goal[];
  budgets: Record<string, number>;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, currentAmount: number) => void;
  deleteGoal: (id: string) => void;
  updateBudget: (category: string, amount: number) => void;
  getSummary: () => { totalBalance: number; totalIncome: number; totalExpenses: number };

  // Portfolio extensions
  updateAsset: (id: string, amount: number, price: number) => void;
  addAsset: (asset: PortfolioAsset) => void;
  removeAsset: (id: string) => void;
}

export const useWealthStore = create<WealthStore>()(
  persist(
    (set, get) => ({
      // Finance Initial State
      transactions: [],
      goals: [],
      budgets: {},
      categories: ['Food', 'Rent', 'Salary', 'Entertainment', 'Shopping', 'Health', 'Other'],

      // Portfolio Initial State
      assets: INITIAL_PORTFOLIO.assets,

      // Finance Actions
      addTransaction: (transaction) => 
        set((state) => ({
          transactions: [{ ...transaction, id: crypto.randomUUID() }, ...state.transactions],
        })),

      deleteTransaction: (id) => 
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      updateTransaction: (id, updatedFields) => 
        set((state) => ({
          transactions: state.transactions.map((t) => t.id === id ? { ...t, ...updatedFields } : t),
        })),

      setTransactions: (transactions) => set({ transactions }),

      addGoal: (goal) => set((state) => ({
        goals: [{ ...goal, id: crypto.randomUUID() }, ...state.goals]
      })),

      updateGoal: (id, currentAmount) => set((state) => ({
        goals: state.goals.map(g => g.id === id ? { ...g, currentAmount } : g)
      })),

      deleteGoal: (id) => set((state) => ({
        goals: state.goals.filter(g => g.id !== id)
      })),

      updateBudget: (category, amount) => set((state) => ({
        budgets: { ...state.budgets, [category]: amount }
      })),

      getSummary: () => {
        const { transactions } = get();
        const income = transactions.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
        const expenses = transactions.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
        return { totalIncome: income, totalExpenses: expenses, totalBalance: income - expenses };
      },

      // Portfolio Actions
      updateAsset: (id, amount, price) => set((state) => ({
        assets: state.assets.map(a => a.id === id ? { ...a, amount, averagePrice: price } : a)
      })),

      addAsset: (asset) => set((state) => ({
        assets: [...state.assets, asset]
      })),

      removeAsset: (id) => set((state) => ({
        assets: state.assets.filter(a => a.id !== id)
      })),
    }),
    {
      name: 'wealth-accelerator-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
