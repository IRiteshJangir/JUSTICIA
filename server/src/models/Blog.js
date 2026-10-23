const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    featuredImage: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogCategory',
    },
    tags: [String],
    seoTitle: String,
    metaDescription: String,
    readingTime: Number,
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: Date,
  },
  {
    timestamps: true,
  }
);

blogSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

blogSchema.pre('save', function (next) {
  if (this.isModified('content') || this.isNew) {
    const words = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(words / 200);
  }
  next();
});

blogSchema.index({ status: 1 });
blogSchema.index({ category: 1 });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
