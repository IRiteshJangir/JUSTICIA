const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    designation: String,
    content: {
      type: String,
      required: true,
    },
    avatar: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
module.exports = Testimonial;
