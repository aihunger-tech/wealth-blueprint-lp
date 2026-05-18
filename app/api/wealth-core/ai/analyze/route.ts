import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'NVIDIA API Key missing' }, { status: 500 });

  try {
    const { prompt, context } = await request.json();
    
    const systemPrompt = `You are an elite Institutional Wealth Manager. 
    Analyze the following financial data and provide concise, professional, and actionable advice.
    Portfolio Data: ${JSON.stringify(context)}`;

    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-405b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('NVIDIA API Error:', errorData);
      throw new Error(`NVIDIA API call failed: ${response.status}`);
    }
    
    const data = await response.json();
    const aiText = data.choices[0]?.message?.content || "I couldn't generate a response. Please try again.";
    
    return NextResponse.json({ text: aiText });

  } catch (error: any) {
    console.error('AI Analysis Route Error:', error);
    return NextResponse.json({ error: error.message || 'AI Analysis Error' }, { status: 500 });
  }
}
