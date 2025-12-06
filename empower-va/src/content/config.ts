import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.string().or(z.date()).transform((val) => new Date(val)),
        author: z.string().default('Nicola Berry'),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        categories: z.array(z.string()).optional(),
        excerpt: z.string().optional(),
    }),
});

export const collections = {
    blog: blogCollection,
};
// Trigger rebuild (final)
