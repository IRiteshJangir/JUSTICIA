const { z } = require("zod");

const createAppointmentSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  practiceArea: z.string().min(1, "Practice area is required"),
  preferredDate: z.string().min(1, "Preferred date is required"),
  preferredTime: z.string().min(1, "Preferred time is required"),
  consultationType: z.enum(["online", "offline"]),
  caseDescription: z.string().min(1, "Case description is required"),
});

const updateStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "rejected", "completed", "cancelled"]),
  adminNotes: z.string().optional(),
});

module.exports = {
  createAppointmentSchema,
  updateStatusSchema,
};
