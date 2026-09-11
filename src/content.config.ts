import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    /** Shorter SERP title; H1 still uses `title` when set. */
    seoTitle: z.string().optional(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    description: z.string().optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
    tags: z
      .union([z.array(z.string()), z.string()])
      .optional()
      .transform((value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value;
        return value.split(',').map((tag) => tag.trim()).filter(Boolean);
      }),
  }),
});

export const collections = { blog };
