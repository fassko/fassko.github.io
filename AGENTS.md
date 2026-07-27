# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **static Astro site** (personal website/blog for Kristaps Grinbergs). There is no backend, database, auth, or external service required for local development. Node 22 is used (matches CI in `.github/workflows/build.yml`).

### Service

| Task | Command | Notes |
|---|---|---|
| Dev server | `npm run dev` | Astro dev server on `http://localhost:4321/`. This is the entire app. |
| Build | `npm run build` | `astro build` + copies `dist/feed.xml` → `dist/feed.rss`. Outputs to `dist/`. |
| Preview built output | `npm run preview` | Serves the built `dist/`. |

### Notes / gotchas

- **No lint script** and no linter/test framework are configured. `npm run build` (Astro's type-aware build) is the closest thing to a check — use it to catch content/type errors.
- Build/dev emits harmless `[Shiki]` warnings for unknown code-fence languages in some blog posts (e.g. `solidy`, `Swift`, `no-highlight`); these fall back to plaintext and are not errors.
- `deploy.sh` and `vercel.json` are for production deploy only (Cloudflare cache purge needs `CF_ZONE`/`CF_API_EMAIL`/`CF_API_KEY`). Not needed for local dev/testing.
