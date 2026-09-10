import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { legacyBlogRedirects } from './src/data/legacy-redirects';

const redirectPaths = new Set([
  ...legacyBlogRedirects.map((slug) => `https://kristaps.me/${slug}/`),
  'https://kristaps.me/blog/tx.origin-vs-msg.sender/',
]);

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
        if (/^https:\/\/kristaps\.me\/tags\/.+/i.test(page)) return false;
        if (/^https:\/\/kristaps\.me\/index\/?$/i.test(page)) return false;
        return true;
      },
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
