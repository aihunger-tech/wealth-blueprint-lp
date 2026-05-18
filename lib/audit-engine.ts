import { PortfolioAsset, Goal, Transaction } from '@/types';

export interface AuditFinding {
  id: string;
  pillar: 'Liquidity' | 'Diversification' | 'Alignment' | 'Efficiency';
  status: 'Critical' | 'Warning' | 'Healthy';
  message: string;
  impact: number; // 0 to 100
  suggestion: string;
}

export interface AuditResult {
  overallScore: number;
  findings: AuditFinding[];
  summary: string;
}

export function runWealthAudit(
  assets: PortfolioAsset[],
  transactions: Transaction[],
  goals: Goal[]
): AuditResult {
  const findings: AuditFinding[] = [];
  
  // 1. Liquidity Audit (Cash vs Total)
  const totalValue = assets.reduce((sum, a) => sum + (a.amount * (a.currentPrice || a.averagePrice)), 0);
  const cashValue = assets.filter(a => a.type === 'cash').reduce((sum, a) => sum + (a.amount * (a.currentPrice || a.averagePrice)), 0);
  const liquidityRatio = totalValue > 0 ? (cashValue / totalValue) * 100 : 0;

  if (liquidityRatio < 5) {
    findings.push({
      id: 'liq-1',
      pillar: 'Liquidity',
      status: 'Critical',
      message: 'Emergency fund is dangerously low.',
      impact: 30,
      suggestion: 'Increase cash reserves to at least 5-10% of total portfolio.'
    });
  } else if (liquidityRatio < 15) {
    findings.push({
      id: 'liq-2',
      pillar: 'Liquidity',
      status: 'Warning',
      message: 'Liquidity is below optimal levels.',
      impact: 10,
      suggestion: 'Consider moving some volatile assets into a high-yield savings account.'
    });
  } else {
    findings.push({
      id: 'liq-3',
      pillar: 'Liquidity',
      status: 'Healthy',
      message: 'Liquidity is well-balanced.',
      impact: 0,
      suggestion: 'Maintain current cash levels for stability.'
    });
  }

  // 2. Diversification Audit
  const assetTypes = assets.map(a => a.type);
  const uniqueTypes = new Set(assetTypes).size;
  
  if (uniqueTypes < 3) {
    findings.push({
      id: 'div-1',
      pillar: 'Diversification',
      status: 'Warning',
      message: 'High concentration risk detected.',
      impact: 20,
      suggestion: 'Diversify into other asset classes (e.g., add Stocks if you only hold Crypto).'
    });
  } else {
    findings.push({
      id: 'div-2',
      pillar: 'Diversification',
      status: 'Healthy',
      message: 'Assets are well-diversified.',
      impact: 0,
      suggestion: 'Continue periodic rebalancing to maintain this spread.'
    });
  }

  // 3. Goal Alignment
  const totalGoalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalGoalCurrent = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const alignment = totalGoalTarget > 0 ? (totalGoalCurrent / totalGoalTarget) * 100 : 0;

  if (alignment < 20) {
    findings.push({
      id: 'aln-1',
      pillar: 'Alignment',
      status: 'Critical',
      message: 'Major gap in goal funding.',
      impact: 25,
      suggestion: 'Review your monthly contributions. Increase savings rate to meet deadlines.'
    });
  } else {
    findings.push({
      id: 'aln-2',
      pillar: 'Alignment',
      status: 'Healthy',
      message: 'On track to meet financial goals.',
      impact: 0,
      suggestion: 'Keep current contribution pace.'
    });
  }

  // 4. Efficiency (Leakage)
  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  if (monthlyExpenses > 5000) { // Example threshold
    findings.push({
      id: 'eff-1',
      pillar: 'Efficiency',
      status: 'Warning',
      message: 'High expenditure burn rate.',
      impact: 15,
      suggestion: 'Audit your "Entertainment" and "Other" categories to find leaks.'
    });
  } else {
    findings.push({
      id: 'eff-2',
      pillar: 'Efficiency',
      status: 'Healthy',
      message: 'Expense management is efficient.',
      impact: 0,
      suggestion: 'Maintain a strict budget to accelerate wealth growth.'
    });
  }

  const totalPenalty = findings.reduce((sum, f) => sum + f.impact, 0);
  const overallScore = Math.max(0, 100 - totalPenalty);

  return {
    overallScore,
    findings,
    summary: overallScore > 80 
      ? 'Your financial foundation is institutional-grade. Focus on optimization.' 
      : overallScore > 50 
      ? 'Your portfolio is stable but has significant optimization gaps.' 
      : 'Critical vulnerabilities detected. Immediate structural rebalancing required.'
  };
}
