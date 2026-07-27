import type { CollectionEntry } from 'astro:content';

/** Prefer Astro slug (respects frontmatter); fall back to id without extension. */
export function postSlug(post: CollectionEntry<'blog'> | string): string {
  if (typeof post === 'string') {
    return post.replace(/\.md$/, '');
  }
  return post.slug || post.id.replace(/\.md$/, '');
}
