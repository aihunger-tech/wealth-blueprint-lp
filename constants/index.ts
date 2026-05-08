export const SITE_CONFIG = {
  name: "The Wealth Blueprint",
  description: "Master Your Money. Outsmart the Market.",
  baseUrl: "https://blueprint-lp.vercel.app/", 
};

export const LINKS = {
  checkoutBasic: "https://blueprint-lp.vercel.app/checkout?tier=basic",
  checkoutPro: "https://blueprint-lp.vercel.app/checkout?tier=pro",
  checkoutElite: "https://blueprint-lp.vercel.app/checkout?tier=elite",
  generalAccess: "https://blueprint-lp.vercel.app/", 
};

export const HERO_SECTION = {
  title: "Master Your Money. Outsmart the Market.",
  subtitle: "Stop guessing with your finances. Access the real strategies used by disciplined investors to build sustainable wealth and exit the rat race.",
  cta: "Get Instant Access",
};

export const SOCIAL_PROOF = {
  stats: [
    { label: "Active Users", value: "12,000+" },
    { label: "Guides Downloaded", value: "45K+" },
    { label: "Wealth Generated", value: "$10M+" },
  ],
  testimonials: [
    {
      name: "Alexander Thorne",
      role: "Private Equity Analyst",
      text: "The blueprint provided a level of clarity I couldn't find in any textbook. My asset allocation is finally optimized.",
      rating: 5,
    },
    {
      name: "Sarah Jenkins",
      role: "Entrepreneur",
      text: "From financial chaos to a structured wealth engine in 3 months. The system actually works.",
      rating: 5,
    },
  ],
};

export const VALUE_STACK = [
  {
    title: "The Core Guides",
    description: "Step-by-step PDF blueprints covering everything from debt elimination to advanced portfolio scaling.",
    outcome: "Complete financial clarity in under 48 hours.",
  },
  {
    title: "Strategic Frameworks",
    description: "Proprietary models for risk management and tax optimization.",
    outcome: "Stop leaking money to inflation and inefficient taxes.",
  },
  {
    title: "Wealth Tools",
    description: "Access to the same calculators and trackers used in the Wealth Control Center.",
    outcome: "Predict your financial freedom date with mathematical precision.",
  },
];

export const PRICING_TIERS = [
  {
    name: "Basic Guide",
    price: "$49",
    description: "The foundational blueprint for financial stability.",
    features: ["Core Financial PDF", "Budgeting Framework", "Debt Exit Strategy"],
    highlight: false,
    cta: "Start Now",
    link: "checkoutBasic", // References LINKS.checkoutBasic
  },
  {
    name: "Pro Bundle",
    price: "$149",
    description: "The complete toolkit for active wealth accumulation.",
    features: ["All Basic Guides", "Investment Strategy Guide", "Portfolio Tracker Templates", "Exclusive Community Access"],
    highlight: true,
    cta: "Get the Bundle",
    link: "checkoutPro", // References LINKS.checkoutPro
  },
  {
    name: "Elite Course",
    price: "$499",
    description: "Master-level education for high-net-worth scaling.",
    features: ["Everything in Pro", "Full Video Course", "1-on-1 Strategy Call", "Lifetime Updates"],
    highlight: false,
    cta: "Join the Elite",
    link: "checkoutElite", // References LINKS.checkoutElite
  },
];

export const FAQ = [
  {
    question: "Do I need prior experience in investing?",
    answer: "No. The Wealth Blueprint is designed to take you from zero to expert, regardless of your starting point.",
  },
  {
    question: "Does this work with small amounts of capital?",
    answer: "Absolutely. In fact, the system is designed to show you how to scale small amounts into significant wealth.",
  },
];
