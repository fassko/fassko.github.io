import { siteConfig } from '@/site.config';

const DEFAULT_MAX = 160;

/** Strip markdown and truncate for meta description / Open Graph. */
export function seoDescription(raw?: string, max = DEFAULT_MAX): string {
  const fallback = siteConfig.description;
  if (!raw?.trim()) return fallback;

  let text = raw
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
    .replace(/[`*_~#>|]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return fallback;
  if (text.length <= max) return text;

  const truncated = text.slice(0, max - 1);
  const lastSpace = truncated.lastIndexOf(' ');
  const cut = lastSpace > Math.floor(max * 0.6) ? truncated.slice(0, lastSpace) : truncated;
  return `${cut.trimEnd()}…`;
}

export function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return new URL(path, siteConfig.url).href;
}

export function pageTitle(title?: string): string {
  if (!title || title === siteConfig.name) return siteConfig.name;
  return `${title} | ${siteConfig.name}`;
}
