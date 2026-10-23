const mongoose = require('mongoose');
const slugify = require('slugify');

const blogCategorySchema = new mongoose.Schema(
  {
    name: {
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
    description: String,
  },
  {
    timestamps: true,
  }
);

blogCategorySchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const BlogCategory = mongoose.model('BlogCategory', blogCategorySchema);
module.exports = BlogCategory;
