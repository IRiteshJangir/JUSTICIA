const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    practiceArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PracticeArea',
      required: true,
    },
    preferredDate: {
      type: Date,
      required: true,
    },
    preferredTime: {
      type: String,
      required: true,
    },
    consultationType: {
      type: String,
      enum: ['online', 'offline'],
      required: true,
    },
    caseDescription: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rejected', 'completed', 'cancelled'],
      default: 'pending',
    },
    adminNotes: String,
  },
  {
    timestamps: true,
  }
);

appointmentSchema.index({ status: 1 });
appointmentSchema.index({ preferredDate: 1 });
appointmentSchema.index({ email: 1 });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
