const mongoose = require('mongoose');
const slugify = require('slugify');

const caseStudySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
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
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      required: true,
    },
    featuredImage: String,
    practiceArea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PracticeArea',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
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

caseStudySchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

caseStudySchema.index({ isPublished: 1 });
caseStudySchema.index({ category: 1 });

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);
module.exports = CaseStudy;
