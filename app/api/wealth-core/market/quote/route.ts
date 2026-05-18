import { NextResponse } from 'next/server';
import { fetchFinancialData } from '@/lib/api-client';

export const revalidate = 30;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const type = searchParams.get('type');

  if (!symbol) return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });

  if (type === 'stock') {
    const apiKey = process.env.FINNHUB_API_KEY;
    if (!apiKey) return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    
    const data = await fetchFinancialData(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);
    if (!data) return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });

    return NextResponse.json({
      symbol,
      currentPrice: data.c,
      change24h: data.d,
      changePercent: data.dp,
    });
  } 

  if (type === 'crypto') {
    const cryptoId = symbol === 'BTC' ? 'bitcoin' : symbol === 'ETH' ? 'ethereum' : symbol.toLowerCase();
    const data = await fetchFinancialData(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=usd&include_24hr_change=true`);
    if (!data || !data[cryptoId]) return NextResponse.json({ error: 'Failed to fetch crypto data' }, { status: 500 });

    return NextResponse.json({
      symbol,
      currentPrice: data[cryptoId].usd,
      change24h: data[cryptoId].usd_24h_change,
      changePercent: data[cryptoId].usd_24h_change,
    });

  }

  return NextResponse.json({ error: 'Invalid asset type' }, { status: 400 });
}
