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
  integrations: [
    sitemap({
      filter: (page) => {
        if (redirectPaths.has(page)) return false;
        // Individual tag pages are often thin; keep /tags/ only
        if (/^https:\/\/kristaps\.me\/tags\/.+/i.test(page)) return false;
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
