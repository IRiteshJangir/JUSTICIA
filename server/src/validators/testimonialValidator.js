const { z } = require('zod');

const createTestimonialSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  content: z.string().min(1, 'Content is required'),
  designation: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  isPublished: z.boolean().optional()
});

const updateTestimonialSchema = z.object({
  clientName: z.string().optional(),
  content: z.string().optional(),
  designation: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
  isPublished: z.boolean().optional()
});

module.exports = {
  createTestimonialSchema,
  updateTestimonialSchema
};
