import { NextResponse } from 'next/server';
import { fetchFinancialData } from '@/lib/api-client';

export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'business';
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) return NextResponse.json({ error: 'API Key missing' }, { status: 500 });

  try {
    const data = await fetchFinancialData(
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&apikey=${apiKey}`
    );
    
    if (!data) throw new Error('No data returned');

    const articles = data.articles.map((art: any) => ({
      id: art.url,
      title: art.title,
      summary: art.description,
      url: art.url,
      source: art.source.name,
      publishedAt: art.publishedAt,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      imageUrl: art.image,
    }));

    return NextResponse.json(articles);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch news' }, { status: 500 });
  }
}
