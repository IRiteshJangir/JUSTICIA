const Appointment = require("../models/Appointment");
const AppError = require("../utils/AppError");
const sendEmail = require("../config/email");

class AppointmentService {
  async create(data) {
    const appointment = await Appointment.create(data);
    return appointment;
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    if (query.status) filter.status = query.status;
    if (query.search) {
      filter.$or = [
        { fullName: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
        { phone: { $regex: query.search, $options: "i" } },
      ];
    }

    const [total, overallTotal, pendingTotal, data] = await Promise.all([
      Appointment.countDocuments(filter),
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: "pending" }),
      Appointment.find(filter)
        .populate("practiceArea", "title")
        .sort("-createdAt")
        .skip(skip)
        .limit(limit),
    ]);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        stats: { total: overallTotal, pending: pendingTotal },
      },
    };
  }

  async getById(id) {
    const appointment = await Appointment.findById(id).populate("practiceArea");
    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }
    return appointment;
  }

  async updateStatus(id, status, adminNotes) {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }

    appointment.status = status;
    if (adminNotes !== undefined) {
      appointment.adminNotes = adminNotes;
    }
    await appointment.save();

    // Send email notification
    try {
      await sendEmail({
        to: appointment.email,
        subject: `Appointment Status Update: ${status}`,
        html: `<p>Dear ${appointment.fullName},</p><p>Your appointment status has been updated to: <strong>${status}</strong>.</p>`,
      });
    } catch (error) {
      console.error("Email sending failed:", error);
    }

    return appointment;
  }

  async delete(id) {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      throw new AppError("Appointment not found", 404);
    }
    return null;
  }
}

module.exports = new AppointmentService();
