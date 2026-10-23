const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    biography: String,
    image: String,
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedin: String,
      email: String,
    },
    order: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
module.exports = TeamMember;
