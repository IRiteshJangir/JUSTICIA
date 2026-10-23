const BlogCategory = require('../models/BlogCategory');
const AppError = require('../utils/AppError');

class BlogCategoryService {
  async create(data) {
    return await BlogCategory.create(data);
  }

  async getAll() {
    const categories = await BlogCategory.find().sort('name');
    return categories;
  }

  async update(id, data) {
    const category = await BlogCategory.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return category;
  }

  async delete(id) {
    const category = await BlogCategory.findByIdAndDelete(id);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
    return null;
  }
}

module.exports = new BlogCategoryService();
