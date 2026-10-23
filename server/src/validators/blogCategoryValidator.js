const { z } = require('zod');

const createBlogCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional()
});

const updateBlogCategorySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional()
});

module.exports = {
  createBlogCategorySchema,
  updateBlogCategorySchema
};
