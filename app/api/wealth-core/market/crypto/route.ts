import { NextResponse } from 'next/server';
import { fetchFinancialData } from '@/lib/api-client';

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint'); 
  const symbol = searchParams.get('symbol'); 
   
  const apiKey = process.env.CMC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'API Key missing' }, { status: 500 });

  try {
    if (endpoint === 'global-quotes') {
      const data = await fetchFinancialData(
        `https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest`, 
        apiKey
      );
      return NextResponse.json(data);
    }

    if (endpoint === 'latest' && symbol) {
      const data = await fetchFinancialData(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbol}`, 
        apiKey
      );
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'CMC API Error' }, { status: 500 });
  }
}
