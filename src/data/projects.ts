export interface Project {
  title: string;
  description: string;
  image?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    title: 'Flare Network — FAssets',
    description:
      'Developer Relations Engineer Lead on FAssets: trustless use of Bitcoin, XRP and other non-smart-contract chains on Flare. Ran closed and open betas, onboarded agents, shipped guides and tooling, and supported conferences and hackathons across Europe and Southeast Asia.',
    link: 'https://flare.network',
  },
  {
    title: 'Salto X',
    description:
      'Token incentive plans for remote companies: mint a company token, distribute and manage on-chain incentives on Salto X. Built Solidity contracts on Polygon and a Next.js client with Hardhat and OpenZeppelin Defender.',
    image: 'salto-x-dashboard-nft.png',
    link: 'https://saltox.co',
  },
  {
    title: 'Sharentic iOS app',
    description:
      'Sharentic helps you live lightly, without compromise. Built with SwiftUI and Firebase, with Stripe payments and an internal ops dashboard.',
    image: 'sharentic.png',
  },
  {
    title: 'Vaal Dashboard',
    description:
      'Securitization tooling for capital markets — attract financing based on asset quality. Built with React and Material UI on loan-tape data.',
    image: 'vaal-dashboard.png',
  },
  {
    title: 'Vibur iOS app',
    description:
      'Awareness calendar for pleasant and unpleasant events — short in-the-moment prompts to notice feelings as they happen.',
    image: 'vibur.png',
    link: 'https://apps.apple.com/us/app/vibur/id1592169625',
  },
  {
    title: 'Qminder Apple TV app',
    description:
      'Native Apple TV waiting-list display using the Qminder Swift API, websockets and reactive UI updates.',
    image: 'qminder-apple-tv.png',
  },
  {
    title: 'Qminder iPad app',
    description:
      'Self-service sign-in for customers — native GPU animations with a JavaScript bridge to the Qminder backend.',
    image: 'qminder-sign-in.png',
  },
  {
    title: 'Dodies.lv iOS app',
    description:
      'Outdoor planning for Latvia — marked trails, birdwatching towers, parks, campsites and picnic sites on a map.',
    image: 'dodies.png',
    link: 'https://itunes.apple.com/lv/app/dodies-lv/id1080800199?mt=8',
  },
  {
    title: 'Augi & Draugi iOS app',
    description:
      'Map guide to plant-based dining — locations that serve multiple plant-based dishes so everyone has a choice.',
    image: 'augidraugi.png',
    link: 'https://apps.apple.com/lv/app/augi-draugi/id1475145259',
  },
  {
    title: 'Latvia Weather',
    description:
      'Live weather observations across Latvia from national meteorology and road data sources.',
    image: 'weatherlatvia.png',
    link: 'https://latvia-weather.com/',
  },
  {
    title: 'Hashberg - easy hashtag manager',
    description:
      'Organize hashtags by topic, copy them anywhere, and sync across devices with iCloud.',
    image: 'hashberg.png',
    link: 'https://apps.apple.com/us/app/hashberg-easy-hashtag-manager/id1549468659',
  },
];
