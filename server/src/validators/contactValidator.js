const { z } = require('zod');

const createContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required')
});

const updateContactStatusSchema = z.object({
  status: z.enum(['new', 'read', 'responded', 'closed']),
  adminNotes: z.string().optional()
});

module.exports = {
  createContactSchema,
  updateContactStatusSchema
};
