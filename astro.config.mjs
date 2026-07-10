import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://kristaps.me',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
