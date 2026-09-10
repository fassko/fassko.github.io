export type ProjectCategory = 'web3' | 'ai' | 'ios';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  link?: string;
  slug?: string;
  tags?: string[];
  categories?: ProjectCategory[];
  stack?: string[];
  overview?: string[];
  architecture?: { title: string; copy: string }[];
  links?: ProjectLink[];
}

export const projectFilters: { id: 'all' | ProjectCategory; label: string }[] = [
  { id: 'all', label: 'all' },
  { id: 'web3', label: 'web3' },
  { id: 'ai', label: 'ai' },
  { id: 'ios', label: 'ios' },
];

export function projectPath(project: Project): string | undefined {
  return project.slug ? `/projects/${project.slug}/` : undefined;
}

export function projectHref(project: Project): string | undefined {
  return projectPath(project) ?? project.link;
}

export function isExternalProjectHref(project: Project): boolean {
  return !project.slug && Boolean(project.link);
}

export function projectPages(): Project[] {
  return projects.filter((project) => Boolean(project.slug));
}

export const projects: Project[] = [
  {
    title: 'Flare Network',
    description:
      "Developer Relations across Flare's product suite: [FAssets](https://flare.network/products/fassets) (trustless bridging for Bitcoin and XRP), the [Data Connector](https://flare.network/products/flare-data-connector) (verified external data on-chain), [Smart Accounts](https://flare.network/products/flare-smart-accounts) (DeFi from an XRPL wallet) and [Confidential Compute](https://dev.flare.network/fcc/overview) (TEE-based off-chain computation). Building developer tools, writing documentation, running hackathons and technical onboarding for the agent and builder ecosystem, including [x402](https://dev.flare.network/fxrp/token-interactions/x402-payments) payment integrations and [Flare AI Skills](/projects/flare-ai-skills/).",
    image: 'flare-devhub.jpg',
    link: 'https://flare.network',
    tags: ['solidity', 'typescript', 'x402', 'ai'],
    categories: ['web3', 'ai'],
  },
  {
    title: 'Flare AI Skills',
    slug: 'flare-ai-skills',
    description:
      'Agent skills that give AI coding assistants like Cursor, Claude Code, Codex and other coding agents structured domain knowledge of Flare.',
    image: 'flare-ai-skills.jpg',
    link: 'https://dev.flare.network/network/guides/flare-ai-skills',
    tags: ['ai', 'agents', 'devrel'],
    categories: ['ai', 'web3'],
    stack: ['Markdown skills', 'MCP', 'llms.txt', 'Cursor / Claude Code / Codex'],
    overview: [
      'Flare AI Skills package Flare domain knowledge so coding agents stop guessing about FAssets, the Data Connector, Smart Accounts, Confidential Compute, and x402.',
      'The files come from the developer hub: markdown skills, an MCP server, and llms.txt. You drop them into Cursor, Claude Code, Codex, or any agent that reads skill files.',
    ],
    architecture: [
      {
        title: 'What the agent gets',
        copy: 'Structured docs instead of a scraped homepage. Skills describe flows, contract addresses, and gotchas so the model can write against Flare APIs without mixing up Coston and Coston2.',
      },
      {
        title: 'How it is served',
        copy: 'Markdown on the Developer Hub, plus MCP and llms.txt so agents can pull context without a browser. Same source as the human docs.',
      },
    ],
    links: [
      { label: 'Developer Hub guide', href: 'https://dev.flare.network/network/guides/flare-ai-skills' },
      { label: 'x402 weather agent', href: '/projects/x402-agent/' },
      { label: 'Write-up: x402 + AI agents', href: '/blog/x402-ai-agent-stablecoin-payments/' },
    ],
  },
  {
    title: 'x402 Weather Insurance Agent',
    slug: 'x402-agent',
    description:
      'Parametric rainfall insurance on Flare. An AI agent pays per weather API call with x402. The TEE verifies on-chain FeeCollected before calling OpenWeatherMap.',
    link: 'https://github.com/flare-foundation/fce-weather-insurance-x402-agent',
    tags: ['x402', 'ai-agents', 'stablecoins'],
    categories: ['web3', 'ai'],
    stack: ['Solidity', 'Next.js', 'x402 / HTTP 402', 'Flare Confidential Compute', 'OpenAI tools', 'MCP'],
    overview: [
      'A Flare Confidential Compute extension that settles parametric rainfall insurance with OpenWeatherMap data fetched inside a TEE.',
      'The HTTP layer speaks 402. Tokens move on Coston2 with feeToken.transferFrom in the same transaction as getWeather. The enclave will not call OpenWeatherMap until it sees FeeCollected, so the API key never sits in the Next.js process.',
    ],
    architecture: [
      {
        title: 'x402 gateway',
        copy: 'Next.js routes at /x402/weather/fetch and /x402/weather/settle. If allowance is short they return HTTP 402. The client approves, retries, and the gateway calls onlyGateway contract functions.',
      },
      {
        title: 'On-chain fee',
        copy: 'approve sets allowance. _collectFee pulls an ERC-20 (test USDT0 or FXRP) via transferFrom. That is the payment. HTTP 402 is only the invoice.',
      },
      {
        title: 'TEE',
        copy: 'Flare Confidential Compute holds the OpenWeatherMap key, verifies FeeCollected, fetches weather over HTTPS, and returns a signed report. Settlement uses the same loop.',
      },
      {
        title: 'Agent and MCP',
        copy: 'An in-app OpenAI assistant and an MCP server at /api/mcp expose the same paid tools: pool stats, weather fetch, buy policy, settle.',
      },
    ],
    links: [
      { label: 'Source on GitHub', href: 'https://github.com/flare-foundation/fce-weather-insurance-x402-agent' },
      { label: 'Workshop video', href: 'https://www.youtube.com/watch?v=Kk5vuiGZGto' },
      { label: 'Write-up', href: '/blog/x402-ai-agent-stablecoin-payments/' },
      { label: 'x402 on Flare (EIP-3009)', href: 'https://dev.flare.network/fxrp/token-interactions/x402-payments' },
      { label: 'Flare Confidential Compute', href: 'https://dev.flare.network/fcc/overview' },
    ],
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
