import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/** Match Publish tag paths: lowercase, spaces → hyphens, strip other punctuation. */
export function slugifyTag(tag) {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match?.[1] ?? '';
}

function parseDate(value) {
  if (!value) return undefined;
  const date = new Date(value.trim());
  return Number.isNaN(date.getTime()) ? undefined : date;
}

/**
 * Build lastmod maps and substantial tag URLs (≥3 posts) for the sitemap.
 * Kept as plain ESM so `astro.config.mjs` can import it at config time.
 */
export function collectSitemapData(site = 'https://kristaps.me') {
  const blogDir = join(process.cwd(), 'src/content/blog');
  const lastmodByPath = new Map();
  const tagCounts = new Map();
  const tagLastmod = new Map();

  for (const file of readdirSync(blogDir).filter((name) => name.endsWith('.md'))) {
    const raw = readFileSync(join(blogDir, file), 'utf8');
    const front = parseFrontmatter(raw);
    const slug = file.replace(/\.md$/, '');
    const updated = parseDate(front.match(/^updated:\s*(.+)$/m)?.[1]);
    const date = parseDate(front.match(/^date:\s*(.+)$/m)?.[1]);
    const lastmod = updated ?? date;
    if (lastmod) {
      lastmodByPath.set(`/blog/${slug}/`, lastmod);
    }

    const tagsLine = front.match(/^tags:\s*(.+)$/m)?.[1];
    if (!tagsLine) continue;

    for (const tag of tagsLine.split(',').map((part) => part.trim()).filter(Boolean)) {
      const key = slugifyTag(tag);
      tagCounts.set(key, (tagCounts.get(key) ?? 0) + 1);
      if (lastmod) {
        const prev = tagLastmod.get(key);
        if (!prev || lastmod > prev) tagLastmod.set(key, lastmod);
      }
    }
  }

  const substantialTagUrls = new Set();
  for (const [slug, count] of tagCounts) {
    if (count < 3) continue;
    const path = `/tags/${slug}/`;
    substantialTagUrls.add(`${site}${path}`);
    const lastmod = tagLastmod.get(slug);
    if (lastmod) lastmodByPath.set(path, lastmod);
  }

  // Static page lastmod from source file mtime when available.
  const staticSources = [
    ['/', 'src/pages/index.astro'],
    ['/about/', 'src/pages/about.astro'],
    ['/blog/', 'src/pages/blog/index.astro'],
    ['/talks/', 'src/pages/talks.astro'],
    ['/projects/', 'src/pages/projects.astro'],
    ['/tags/', 'src/pages/tags/index.astro'],
  ];
  for (const [path, rel] of staticSources) {
    if (lastmodByPath.has(path)) continue;
    try {
      lastmodByPath.set(path, statSync(join(process.cwd(), rel)).mtime);
    } catch {
      // ignore missing paths
    }
  }

  // Project detail pages.
  try {
    const projectsMtime = statSync(join(process.cwd(), 'src/data/projects.ts')).mtime;
    const projectsRaw = readFileSync(join(process.cwd(), 'src/data/projects.ts'), 'utf8');
    for (const match of projectsRaw.matchAll(/slug:\s*'([^']+)'/g)) {
      lastmodByPath.set(`/projects/${match[1]}/`, projectsMtime);
    }
  } catch {
    // ignore
  }

  return { lastmodByPath, substantialTagUrls };
}
