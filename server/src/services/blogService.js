const Blog = require('../models/Blog');
const AppError = require('../utils/AppError');

class BlogService {
  async create(data) {
    return await Blog.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let filter = {};
    if (query.search) {
      filter.$or = [
        { title: { $regex: query.search, $options: 'i' } }
      ];
    }
    
    const total = await Blog.countDocuments(filter);
    const data = await Blog.find(filter)
      .populate('category', 'name')
      .populate('author', 'name avatar')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);
    
    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async getPublished(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let filter = { status: 'published' };
    if (query.category) filter.category = query.category;
    if (query.tag) filter.tags = query.tag;
    
    const total = await Blog.countDocuments(filter);
    const data = await Blog.find(filter)
      .populate('category', 'name')
      .populate('author', 'name avatar')
      .sort('-publishedAt')
      .skip(skip)
      .limit(limit);
    
    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async getBySlug(slug) {
    const blog = await Blog.findOne({ slug })
      .populate('category')
      .populate('author', 'name avatar');
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }
    return blog;
  }

  async update(id, data) {
    const blog = await Blog.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }
    return blog;
  }

  async delete(id) {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      throw new AppError('Blog not found', 404);
    }
    return null;
  }
}

module.exports = new BlogService();
