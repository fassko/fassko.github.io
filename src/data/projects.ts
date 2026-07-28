export type ProjectCategory = 'web3' | 'ai' | 'ios';

export interface Project {
  title: string;
  description: string;
  image?: string;
  link?: string;
  live?: boolean;
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
    title: 'Flare · FAssets',
    description:
      'Trustless bridging for assets with no smart-contract layer of their own — agents, collateral pools and the tooling that keeps them honest.',
    link: 'https://flare.network',
    live: true,
    tags: ['solidity', 'typescript', 'protocol'],
    categories: ['web3'],
  },
  {
    title: 'Salto X',
    description:
      'Tokenised employee ownership for remote companies — Solidity contracts on Polygon and a Next.js client.',
    image: 'salto-x-dashboard-nft.png',
    link: 'https://saltox.co',
    tags: ['solidity', 'nextjs', 'web3'],
    categories: ['web3'],
  },
  {
    title: 'Docs agent',
    description: 'Retrieval over protocol docs — answers grounded in the source, not guesswork.',
    tags: ['ai', 'rag', 'typescript'],
    categories: ['ai'],
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
    link: 'https://apps.apple.com/us/app/vibur/id1592169625',
    tags: ['ios', 'swiftui'],
    categories: ['ios'],
  },
  {
    title: 'Qminder Apple TV',
    description: 'Queue displays over websockets using the Qminder Swift API.',
    image: 'qminder-apple-tv.png',
    tags: ['tvos', 'websockets'],
    categories: ['ios'],
  },
  {
    title: 'Qminder iPad',
    description:
      'Self-service sign-in for customers — native GPU animations with a JavaScript bridge.',
    image: 'qminder-sign-in.png',
    tags: ['ios', 'ipad'],
    categories: ['ios'],
  },
  {
    title: 'Dodies.lv',
    description: 'Outdoor trails map for Latvia — offline-friendly SwiftUI hiking guide.',
    image: 'dodies.png',
    link: 'https://itunes.apple.com/lv/app/dodies-lv/id1080800199?mt=8',
    tags: ['ios', 'swiftui', 'maps'],
    categories: ['ios'],
  },
  {
    title: 'Augi & Draugi',
    description: 'Map guide to plant-based dining across Latvia.',
    image: 'augidraugi.png',
    link: 'https://apps.apple.com/lv/app/augi-draugi/id1475145259',
    tags: ['ios'],
    categories: ['ios'],
  },
  {
    title: 'Latvia Weather',
    description:
      'Live weather observations across Latvia from national meteorology and road data sources.',
    image: 'weatherlatvia.png',
    link: 'https://latvia-weather.com/',
    tags: ['web'],
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
