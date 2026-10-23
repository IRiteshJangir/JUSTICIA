const { z } = require('zod');

const createTeamSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  designation: z.string().min(1, 'Designation is required'),
  specialization: z.string().min(1, 'Specialization is required'),
  experience: z.string().min(1, 'Experience is required'),
  biography: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    email: z.string().optional()
  }).optional(),
  order: z.number().optional(),
  isPublished: z.boolean().optional()
});

const updateTeamSchema = z.object({
  name: z.string().optional(),
  designation: z.string().optional(),
  specialization: z.string().optional(),
  experience: z.string().optional(),
  biography: z.string().optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    email: z.string().optional()
  }).optional(),
  order: z.number().optional(),
  isPublished: z.boolean().optional()
});

module.exports = {
  createTeamSchema,
  updateTeamSchema
};
