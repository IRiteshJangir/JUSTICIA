const { z } = require('zod');

const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.enum(['draft', 'published']).optional()
});

const updateBlogSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.enum(['draft', 'published']).optional()
});

module.exports = {
  createBlogSchema,
  updateBlogSchema
};
