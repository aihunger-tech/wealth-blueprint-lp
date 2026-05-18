export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  gnewsApiKey: process.env.GNEWS_API_KEY!,
  finnhubApiKey: process.env.FINNHUB_API_KEY!,
  cmcApiKey: process.env.CMC_API_KEY!,
  nvidiaApiKey: process.env.NVIDIA_API_KEY!,
};

export function validateEnv() {
  const required = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'GNEWS_API_KEY',
    'FINNHUB_API_KEY',
    'CMC_API_KEY',
    'NVIDIA_API_KEY',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(`Missing environment variables: ${missing.join(', ')}`);
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing critical environment variables: ${missing.join(', ')}`);
    }
  }
}
