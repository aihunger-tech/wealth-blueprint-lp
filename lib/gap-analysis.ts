import { PortfolioAsset } from '@/types';

export interface AllocationGap {
  asset: string;
  currentPercent: number;
  targetPercent: number;
  gap: number;
  action: 'BUY' | 'SELL' | 'HOLD';
  suggestedAmount: number;
}

export function calculatePortfolioGap(
  currentAssets: PortfolioAsset[], 
  targetAllocations: { asset: string, allocation: string }[]
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
    const targetPercent = parseInt(target.allocation);
    const gap = targetPercent - current;

    let action = 'HOLD';
    if (gap > 5) action = 'BUY';
    else if (gap < -5) action = 'SELL';

    const currentVal = (totalValue * (current / 100));
    const targetVal = (totalValue * (targetPercent / 100));
    const suggestedAmount = targetVal - currentVal;

    return {
      asset: target.asset,
      currentPercent: current,
      targetPercent,
      gap,
      action,
      suggestedAmount
    };
  });
}
