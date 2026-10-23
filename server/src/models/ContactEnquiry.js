const mongoose = require('mongoose');

const contactEnquirySchema = new mongoose.Schema(
  {
    name: {
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
    phone: String,
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded', 'closed'],
      default: 'new',
    },
    adminNotes: String,
  },
  {
    timestamps: true,
  }
);

contactEnquirySchema.index({ status: 1 });

const ContactEnquiry = mongoose.model('ContactEnquiry', contactEnquirySchema);
module.exports = ContactEnquiry;
