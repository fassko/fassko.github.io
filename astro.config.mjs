import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { legacyBlogRedirects } from './src/data/legacy-redirects';
import { collectSitemapData } from './src/utils/sitemap-data.mjs';

const redirectPaths = new Set([
  ...legacyBlogRedirects.map((slug) => `https://kristaps.me/${slug}/`),
  'https://kristaps.me/blog/tx.origin-vs-msg.sender/',
]);

const { lastmodByPath, substantialTagUrls } = collectSitemapData('https://kristaps.me');

/** Add loading/decoding hints to Markdown content images (below-fold). */
function rehypeLazyImages() {
  return (tree) => {
    const walk = (node) => {
      if (!node || typeof node !== 'object') return;
      if (node.type === 'element' && node.tagName === 'img') {
        node.properties ??= {};
        if (node.properties.loading == null) node.properties.loading = 'lazy';
        if (node.properties.decoding == null) node.properties.decoding = 'async';
      }
      if (Array.isArray(node.children)) {
        for (const child of node.children) walk(child);
      }
    };
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://kristaps.me',
  output: 'static',
  trailingSlash: 'always',
  // Astro 7 defaults to JSX whitespace (strips newlines around tags).
  // HTML-aware compression keeps spaces around inline links in prose.
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => {
        if (redirectPaths.has(page)) return false;
        if (/^https:\/\/kristaps\.me\/index\/?$/i.test(page)) return false;
        // Strategy A: indexable tags (≥3 posts) stay in the sitemap; thin tags stay out.
        if (/^https:\/\/kristaps\.me\/tags\/.+/i.test(page)) {
          return substantialTagUrls.has(page);
        }
        return true;
      },
      serialize(item) {
        const path = new URL(item.url).pathname;
        const lastmod = lastmodByPath.get(path);
        if (lastmod) item.lastmod = lastmod;
        return item;
      },
    }),
  ],
  markdown: {
    // Astro 7 defaults to Sätteri; rehype plugins require the unified processor.
    processor: unified({
      rehypePlugins: [rehypeLazyImages],
    }),
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
