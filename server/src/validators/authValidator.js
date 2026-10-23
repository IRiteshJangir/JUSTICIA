const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(6, 'New password must be at least 6 characters long'),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

module.exports = {
  loginSchema,
  changePasswordSchema
};
