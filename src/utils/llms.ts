import { getCollection, type CollectionEntry } from 'astro:content';
import { projects } from '@/data/projects';
import { socialItems } from '@/data/social';
import { siteConfig } from '@/site.config';
import { absoluteUrl } from '@/utils/seo';
import { postSlug } from '@/utils/post';

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
    'Personal site of Kristaps Grinbergs — Developer Relations Engineer Lead at Flare Network, based in Riga. Writing on Web3, Solidity, Swift/SwiftUI, and AI. Previously smart contracts at Salto X and technical co-founder at Qminder.',
    '',
  ];
}

function pagesSection(): string[] {
  return [
    '## Pages',
    '',
    linkLine('Home', '/', 'Overview, featured projects, and recent posts'),
    linkLine('About', '/about/', 'Background, roles, and contact'),
    linkLine('Projects', '/projects/', 'Web3, AI, and iOS work'),
    linkLine('Talks', '/talks/', 'Conference talks and workshops'),
    linkLine('Blog', '/blog/', 'All articles'),
    '',
  ];
}

function projectsSection(): string[] {
  const lines = ['## Projects', ''];
  for (const project of projects) {
    const href = project.link ?? '/projects/';
    lines.push(linkLine(project.title, href, project.description));
  }
  lines.push('');
  return lines;
}

function blogSection(posts: CollectionEntry<'blog'>[]): string[] {
  const lines = ['## Blog', ''];
  for (const post of posts) {
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
    parts.push(post.body.trim());
    parts.push('');
    parts.push('---');
    parts.push('');
  }

  parts.push(...optionalSection());

  return parts.join('\n').trimEnd().concat('\n');
}
