const { z } = require('zod');

const updateSettingsSchema = z.object({
  siteName: z.string().optional(),
  tagline: z.string().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  contact: z.object({
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    workingHours: z.string().optional(),
    mapEmbedUrl: z.string().optional()
  }).optional(),
  socialLinks: z.object({
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
    youtube: z.string().optional()
  }).optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.union([z.array(z.string()), z.string()]).optional()
  }).optional(),
  statistics: z.object({
    experience: z.coerce.number().optional(),
    casesWon: z.coerce.number().optional(),
    successRate: z.coerce.number().optional(),
    happyClients: z.coerce.number().optional()
  }).optional()
});

module.exports = {
  updateSettingsSchema
};
