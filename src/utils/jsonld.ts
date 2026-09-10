import { siteConfig } from '@/site.config';

export const personId = `${siteConfig.url}/#person`;

const knowsAbout = [
  'x402',
  'AI agents',
  'stablecoins',
  'Flare',
  'Flare Network',
  'Solidity',
  'Web3',
  'blockchain',
  'Flare Confidential Compute',
] as const;

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    jobTitle: 'Developer Relations Engineer Lead',
    description: siteConfig.description,
    image: siteConfig.ogImage,
    homeLocation: {
      '@type': 'Place',
      name: 'Riga, Latvia',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Riga',
        addressCountry: 'LV',
      },
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Flare Network',
      url: 'https://flare.network',
    },
    knowsAbout: [...knowsAbout],
    sameAs: [...siteConfig.sameAs],
  };
}

export function personRef() {
  return {
    '@type': 'Person',
    '@id': personId,
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: 'Developer Relations Engineer Lead',
  };
}

export function eventJsonLd(talk: {
  date: string;
  title: string;
  event: string;
  description?: string;
  video?: string;
  location?: { name: string; city: string; country: string };
}) {
  const event: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: talk.title,
    startDate: talk.date,
    description: talk.description ?? `${talk.title} at ${talk.event}`,
    eventAttendanceMode: talk.location
      ? 'https://schema.org/OfflineEventAttendanceMode'
      : 'https://schema.org/OnlineEventAttendanceMode',
    performer: personRef(),
    organizer: {
      '@type': 'Organization',
      name: talk.event,
    },
    url: `${siteConfig.url}/talks/`,
  };

  if (talk.location) {
    event.location = {
      '@type': 'Place',
      name: talk.location.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: talk.location.city,
        addressCountry: talk.location.country,
      },
    };
  } else if (talk.video) {
    event.location = {
      '@type': 'VirtualLocation',
      url: talk.video.replace('/embed/', '/watch?v='),
    };
  }

  if (talk.video) {
    event.recordedIn = {
      '@type': 'VideoObject',
      name: talk.title,
      embedUrl: talk.video,
    };
  }

  return event;
}
