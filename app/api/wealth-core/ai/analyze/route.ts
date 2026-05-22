import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) return NextResponse.json({ error: 'NVIDIA API Key missing' }, { status: 500 });

  try {
    const { prompt, context } = await request.json();
    
    const systemPrompt = `You are a friendly, expert Wealth Assistant. 
    Your goal is to have a natural conversation with the user, help them analyze their finances, and offer strategic growth advice.
    
    Style:
    - Professional yet conversational.
    - Concise and clear.
    - Proactive: suggest next steps or ask clarifying questions.

    CAPABILITY: You have full administrative access to the user's portfolio and financial records.
    - When a user asks to modify data, you MUST provide a valid JSON object as your entire response.
    - DO NOT wrap the JSON in markdown code blocks (like \`\`\`json).
    - DO NOT add any text before or after the JSON.
    - If no action is requested, you may respond with a JSON object containing only the "text" field.
    
    SUPPORTED ACTIONS:
    1. UPDATE_ASSET: Add or update an asset.
       Params: { "symbol": "BTC", "amount": 0.5, "price": 65000 }
    2. UPDATE_GOAL: Create or update a financial goal.
       Params: { "name": "Retirement", "targetAmount": 1000000, "currentAmount": 5000, "deadline": "2040-01-01" }
    3. ADD_TRANSACTION: Record a new income or expense.
       Params: { "title": "Salary", "amount": 5000, "type": "income", "category": "Salary", "date": "2026-05-20", "description": "Monthly pay" }
    4. DELETE_ASSET/DELETE_GOAL/DELETE_TRANSACTION: Remove data using "symbol", "name", or "id".
       Params: { "symbol": "BTC" } or { "id": "uuid" }

    REQUIRED OUTPUT FORMAT:
    {
      "text": "Your conversational response here",
      "action": { "type": "ACTION_NAME", "params": { ... } } or null
    }
    
    Current Portfolio Context: ${JSON.stringify(context)}`;



    const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-70b-instruct',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('NVIDIA API Error:', errorData);
      throw new Error(`NVIDIA API call failed: ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.choices[0]?.message?.content || "I couldn't generate a response.";
    
    try {
      // Try to parse if the AI returned JSON string
      const parsed = JSON.parse(content);
      return NextResponse.json(parsed);
    } catch {
      // Fallback if AI returned plain text
      return NextResponse.json({ text: content, action: null });
    }

  } catch (error: any) {
    console.error('AI Analysis Route Error:', error);
    return NextResponse.json({ error: error.message || 'AI Analysis Error' }, { status: 500 });
  }
}
