export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  description?: string;
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface PortfolioAsset {
  id: string;
  symbol: string;
  amount: number;
  averagePrice: number;
  currentPrice?: number;
  type: 'crypto' | 'stock' | 'cash' | 'gold';
}

export interface FinanceState {
  transactions: Transaction[];
  goals: Goal[];
  budgets: Record<string, number>;
  categories: string[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, updatedTransaction: Partial<Transaction>) => void;
  setTransactions: (transactions: Transaction[]) => void;
}

export interface PortfolioState {
  assets: PortfolioAsset[];
}

export const INITIAL_PORTFOLIO: PortfolioState = {
  assets: [
    { id: 'bitcoin', symbol: 'BTC', amount: 0.5, averagePrice: 45000, type: 'crypto' },
    { id: 'ethereum', symbol: 'ETH', amount: 4.0, averagePrice: 2200, type: 'crypto' },
    { id: 'AAPL', symbol: 'AAPL', amount: 10, averagePrice: 150, type: 'stock' },
  ],
};
