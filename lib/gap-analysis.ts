import { PortfolioAsset } from '@/types';

export interface AllocationGap {
  asset: string;
  currentPercent: number;
  targetPercent: number;
  gap: number;
  action: 'BUY' | 'SELL' | 'HOLD';
  suggestedAmount: number;
  priority: 'High' | 'Medium' | 'Low';
}

export interface BlueprintPersona {
  name: string;
  allocations: { asset: string, allocation: number }[];
}

export const BLUEPRINT_PERSONAS: Record<string, BlueprintPersona> = {
  AGGRESSIVE: {
    name: 'Aggressive Growth',
    allocations: [
      { asset: 'BTC', allocation: 40 },
      { asset: 'S&P 500', allocation: 40 },
      { asset: 'Gold', allocation: 10 },
      { asset: 'Cash', allocation: 10 },
    ]
  },
  BALANCED: {
    name: 'Balanced Wealth',
    allocations: [
      { asset: 'BTC', allocation: 10 },
      { asset: 'S&P 500', allocation: 50 },
      { asset: 'Gold', allocation: 20 },
      { asset: 'Cash', allocation: 20 },
    ]
  },
  PRESERVATION: {
    name: 'Wealth Preservation',
    allocations: [
      { asset: 'BTC', allocation: 2 },
      { asset: 'S&P 500', allocation: 30 },
      { asset: 'Gold', allocation: 30 },
      { asset: 'Cash', allocation: 38 },
    ]
  }
};

export function calculatePortfolioGap(
  currentAssets: PortfolioAsset[], 
  targetAllocations: { asset: string, allocation: string | number }[]
): AllocationGap[] {
  const totalValue = currentAssets.reduce((sum, a) => sum + (a.amount * (a.currentPrice || a.averagePrice)), 0);
  if (totalValue === 0) return [];

  const currentMap = new Map<string, number>();
  currentAssets.forEach(a => {
    const value = a.amount * (a.currentPrice || a.averagePrice);
    const percent = (value / totalValue) * 100;
    currentMap.set(a.symbol, percent);
  });

  return targetAllocations.map(target => {
    const current = currentMap.get(target.asset) || 0;
    const targetPercent = typeof target.allocation === 'string' ? parseInt(target.allocation) : target.allocation;
    const gap = targetPercent - current;

    let action: 'BUY' | 'SELL' | 'HOLD' = 'HOLD';
    let priority: 'High' | 'Medium' | 'Low' = 'Low';

    if (gap > 10) {
      action = 'BUY';
      priority = gap > 20 ? 'High' : 'Medium';
    } else if (gap < -10) {
      action = 'SELL';
      priority = gap < -20 ? 'High' : 'Medium';
    }

    const currentVal = (totalValue * (current / 100));
    const targetVal = (totalValue * (targetPercent / 100));
    const suggestedAmount = targetVal - currentVal;

    return {
      asset: target.asset,
      currentPercent: current,
      targetPercent,
      gap,
      action,
      suggestedAmount,
      priority
    };
  });
}
