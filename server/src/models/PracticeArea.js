const mongoose = require('mongoose');
const slugify = require('slugify');

const practiceAreaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'scale',
    },
    image: String,
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

practiceAreaSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

practiceAreaSchema.index({ isPublished: 1 });

const PracticeArea = mongoose.model('PracticeArea', practiceAreaSchema);
module.exports = PracticeArea;
