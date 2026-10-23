const { z } = require('zod');

const createCaseStudySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
  outcome: z.string().min(1, 'Outcome is required'),
  practiceArea: z.string().optional(),
  isPublished: z.boolean().optional()
});

const updateCaseStudySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  outcome: z.string().optional(),
  practiceArea: z.string().optional(),
  isPublished: z.boolean().optional()
});

module.exports = {
  createCaseStudySchema,
  updateCaseStudySchema
};
