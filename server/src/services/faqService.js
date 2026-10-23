const FAQ = require('../models/FAQ');
const AppError = require('../utils/AppError');

class FAQService {
  async create(data) {
    return await FAQ.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;
    
    let filter = {};
    if (query.search) {
      filter.$or = [
        { question: { $regex: query.search, $options: 'i' } },
        { answer: { $regex: query.search, $options: 'i' } }
      ];
    }
    
    const total = await FAQ.countDocuments(filter);
    const data = await FAQ.find(filter)
      .sort('order')
      .skip(skip)
      .limit(limit);
    
    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async getPublished(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 100;
    const skip = (page - 1) * limit;
    
    let filter = { isPublished: true };
    if (query.category) filter.category = query.category;
    
    const total = await FAQ.countDocuments(filter);
    const data = await FAQ.find(filter)
      .sort('order')
      .skip(skip)
      .limit(limit);
    
    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async update(id, data) {
    const faq = await FAQ.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }
    return faq;
  }

  async delete(id) {
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }
    return null;
  }
}

module.exports = new FAQService();
