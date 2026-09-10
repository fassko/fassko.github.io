import { getCollection, type CollectionEntry } from 'astro:content';
import { projectHref, projectPages } from '@/data/projects';
import { socialItems } from '@/data/social';
import { siteConfig } from '@/site.config';
import { absoluteUrl } from '@/utils/seo';
import { postSlug } from '@/utils/post';

const FEATURED_POSTS = ['x402-ai-agent-stablecoin-payments'];

function linkLine(title: string, href: string, note?: string): string {
  const url =
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:')
      ? href
      : absoluteUrl(href);
  return note ? `- [${title}](${url}): ${note}` : `- [${title}](${url})`;
}

async function sortedPosts(): Promise<CollectionEntry<'blog'>[]> {
  return (await getCollection('blog')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );
}

function siteIntro(): string[] {
  return [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.description}`,
    '',
    'Kristaps Grinbergs is Developer Relations Engineer Lead at Flare Network, based in Riga. He ships x402 payment integrations, AI agents that pay with stablecoins, Flare Confidential Compute (TEE) demos, and Flare AI Skills for coding agents.',
    '',
  ];
}

function pagesSection(): string[] {
  return [
    '## Pages',
    '',
    linkLine('About', '/about/', 'Background, Flare, x402, AI agents, and contact'),
    linkLine('Home', '/', 'Overview and recent posts'),
    linkLine('Talks', '/talks/', 'AI Connect, W3N, DappCon TEEs, EthCC, Flare Builders x402 workshop'),
    linkLine('Projects', '/projects/', 'Index of Web3, AI, and iOS work'),
    linkLine('Blog', '/blog/', 'All articles'),
    '',
  ];
}

function projectsSection(): string[] {
  const lines = ['## Projects', ''];
  for (const project of projectPages()) {
    const href = projectHref(project) ?? '/projects/';
    lines.push(linkLine(project.title, href, project.description));
  }
  lines.push('');
  return lines;
}

function blogSection(posts: CollectionEntry<'blog'>[]): string[] {
  const bySlug = new Map(posts.map((post) => [postSlug(post), post]));
  const featured = FEATURED_POSTS.map((slug) => bySlug.get(slug)).filter(
    (post): post is CollectionEntry<'blog'> => Boolean(post),
  );

  const lines = ['## Writing', ''];
  for (const post of featured) {
    const note = post.data.description?.trim() || undefined;
    lines.push(linkLine(post.data.title, `/blog/${postSlug(post)}/`, note));
  }
  lines.push('');
  return lines;
}

function optionalSection(): string[] {
  const lines = [
    '## Optional',
    '',
    linkLine('llms-full.txt', '/llms-full.txt', 'Full post bodies, including older Solidity and SwiftUI'),
    linkLine('SwiftUI posts', '/tags/swiftui/', 'iOS and SwiftUI notes'),
    linkLine('Solidity posts', '/tags/solidity/', 'Language and ERC tutorials'),
    linkLine('RSS feed', '/feed.xml', 'Subscribe to new posts'),
    linkLine('Tags', '/tags/', 'Browse posts by topic'),
  ];

  const socialLabels: Record<string, string> = {
    email: 'Email',
    linkedin: 'LinkedIn',
    x: 'X (Twitter)',
    github: 'GitHub',
    telegram: 'Telegram',
  };

  for (const item of socialItems) {
    const label = socialLabels[item.id] ?? item.text;
    lines.push(linkLine(label, item.link, item.text));
  }

  lines.push('');
  return lines;
}

/** Curated index for `/llms.txt` (llmstxt.org). */
export async function renderLlmsTxt(): Promise<string> {
  const posts = await sortedPosts();
  return [
    ...siteIntro(),
    ...pagesSection(),
    ...projectsSection(),
    ...blogSection(posts),
    ...optionalSection(),
  ]
    .join('\n')
    .trimEnd()
    .concat('\n');
}

/** Full corpus for `/llms-full.txt` — same overview plus post bodies. */
export async function renderLlmsFullTxt(): Promise<string> {
  const posts = await sortedPosts();
  const parts = [
    ...siteIntro(),
    ...pagesSection(),
    ...projectsSection(),
    '## Blog posts',
    '',
  ];

  for (const post of posts) {
    const url = absoluteUrl(`/blog/${postSlug(post)}/`);
    const date = post.data.date.toISOString().slice(0, 10);
    parts.push(`### ${post.data.title}`);
    parts.push('');
    parts.push(`- URL: ${url}`);
    parts.push(`- Date: ${date}`);
    if (post.data.tags.length) {
      parts.push(`- Tags: ${post.data.tags.join(', ')}`);
    }
    if (post.data.description) {
      parts.push(`- Summary: ${post.data.description}`);
    }
    parts.push('');
    parts.push((post.body ?? '').trim());
    parts.push('');
    parts.push('---');
    parts.push('');
  }

  parts.push(...optionalSection());

  return parts.join('\n').trimEnd().concat('\n');
}
