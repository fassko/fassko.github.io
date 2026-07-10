import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '@/site.config';
import { postSlug } from '@/utils/post';

export async function GET(context: { site: URL | string | undefined }) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/blog/${postSlug(post.id)}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
