const { z } = require('zod');

const createPracticeAreaSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  shortDescription: z.string().min(1, 'Short description is required'),
  icon: z.string().optional(),
  isPublished: z.boolean().optional(),
  order: z.number().optional()
});

const updatePracticeAreaSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  icon: z.string().optional(),
  isPublished: z.boolean().optional(),
  order: z.number().optional()
});

module.exports = {
  createPracticeAreaSchema,
  updatePracticeAreaSchema
};
