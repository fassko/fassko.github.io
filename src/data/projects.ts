export type ProjectCategory = 'web3' | 'ai' | 'ios';

export interface Project {
  title: string;
  description: string;
  image?: string;
  link?: string;
  tags?: string[];
  categories?: ProjectCategory[];
}

export const projectFilters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'all' },
  { id: 'web3', label: 'web3' },
  { id: 'ai', label: 'ai' },
  { id: 'ios', label: 'ios' },
];

export const projects: Project[] = [
  {
    title: 'Flare Network',
    description:
      "Developer Relations across Flare's product suite — FAssets (trustless bridging for Bitcoin and XRP), the Data Connector (verified external data on-chain), Smart Accounts (DeFi from an XRPL wallet) and Confidential Compute (TEE-based off-chain computation). Building developer tools, writing documentation, running hackathons and technical onboarding for the agent and builder ecosystem.",
    image: 'flare-devhub.jpg',
    link: 'https://flare.network',
    tags: ['solidity', 'typescript', 'protocol'],
    categories: ['web3'],
  },
  {
    title: 'Flare AI Skills',
    description:
      'Agent skills that give AI coding assistants like Cursor and Claude Code structured domain knowledge of Flare, for accurate, context-aware help building on the network.',
    image: 'flare-ai-skills.jpg',
    link: 'https://dev.flare.network/network/guides/flare-ai-skills',
    tags: ['ai', 'agents', 'devrel'],
    categories: ['ai', 'web3'],
  },
  {
    title: 'Latvia Weather',
    description:
      'Live weather observations across Latvia from national meteorology and road data sources.',
    image: 'weather-latvia-com.jpg',
    link: 'https://latvia-weather.com/en',
    tags: ['web'],
  },
  {
    title: 'Salto X',
    description:
      'Tokenised employee ownership for remote companies — Solidity contracts on Polygon and a Next.js client.',
    image: 'salto-x-dashboard-nft.png',
    link: 'https://www.saltox.co/',
    tags: ['solidity', 'nextjs', 'web3'],
    categories: ['web3'],
  },
  {
    title: 'Sharentic',
    description:
      'On-demand rental platform built with SwiftUI and Firebase, with Stripe payments and an internal ops dashboard.',
    image: 'sharentic.png',
    tags: ['ios', 'swiftui'],
    categories: ['ios'],
  },
  {
    title: 'Vaal Dashboard',
    description:
      'Securitization tooling for capital markets — attract financing based on asset quality.',
    image: 'vaal-dashboard.png',
    tags: ['react', 'fintech'],
  },
  {
    title: 'Vibur',
    description:
      'Awareness calendar for pleasant and unpleasant events — short in-the-moment prompts.',
    image: 'vibur.png',
    tags: ['ios', 'swiftui'],
    categories: ['ios'],
  },
  {
    title: 'Qminder Apple TV',
    description: 'Queue displays over websockets using the Qminder Swift API.',
    image: 'qminder-apple-tv.png',
    link: 'https://www.qminder.com',
    tags: ['tvos', 'websockets'],
    categories: ['ios'],
  },
  {
    title: 'Qminder iPad',
    description:
      'Self-service sign-in for customers — native GPU animations with a JavaScript bridge.',
    image: 'qminder-sign-in.png',
    link: 'https://www.qminder.com',
    tags: ['ios', 'ipad'],
    categories: ['ios'],
  },
  {
    title: 'Dodies.lv',
    description: 'Outdoor trails map for Latvia — offline-friendly SwiftUI hiking guide.',
    image: 'dodies.png',
    tags: ['ios', 'swiftui', 'maps'],
    categories: ['ios'],
  },
  {
    title: 'Augi & Draugi',
    description: 'Map guide to plant-based dining across Latvia.',
    image: 'augidraugi.png',
    tags: ['ios'],
    categories: ['ios'],
  },
  {
    title: 'Hashberg',
    description: 'Organize hashtags by topic, copy them anywhere, and sync with iCloud.',
    image: 'hashberg.png',
    link: 'https://apps.apple.com/us/app/hashberg-easy-hashtag-manager/id1549468659',
    tags: ['ios'],
    categories: ['ios'],
  },
];
