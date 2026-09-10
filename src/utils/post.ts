import type { CollectionEntry } from 'astro:content';

/** Collection `id` is the URL slug in the Content Layer API. */
export function postSlug(post: CollectionEntry<'blog'> | string): string {
  if (typeof post === 'string') {
    return post.replace(/\.md$/, '');
  }
  return post.id.replace(/\.md$/, '');
}
