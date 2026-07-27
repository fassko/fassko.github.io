import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
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

