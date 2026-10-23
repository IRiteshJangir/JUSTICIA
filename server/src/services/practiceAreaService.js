const PracticeArea = require('../models/PracticeArea');
const AppError = require('../utils/AppError');

class PracticeAreaService {
  async create(data) {
    return await PracticeArea.create(data);
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
    
    const total = await PracticeArea.countDocuments(filter);
    const data = await PracticeArea.find(filter)
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
    const limit = parseInt(query.limit) || 100; // Usually want all for public
    const skip = (page - 1) * limit;
    
    let filter = { isPublished: true };
    
    const total = await PracticeArea.countDocuments(filter);
    const data = await PracticeArea.find(filter)
      .sort('order')
      .skip(skip)
      .limit(limit);
    
    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async getBySlug(slug) {
    const practiceArea = await PracticeArea.findOne({ slug });
    if (!practiceArea) {
      throw new AppError('Practice area not found', 404);
    }
    return practiceArea;
  }

  async update(id, data) {
    const practiceArea = await PracticeArea.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!practiceArea) {
      throw new AppError('Practice area not found', 404);
    }
    return practiceArea;
  }

  async delete(id) {
    const practiceArea = await PracticeArea.findByIdAndDelete(id);
    if (!practiceArea) {
      throw new AppError('Practice area not found', 404);
    }
    return null;
  }
}

module.exports = new PracticeAreaService();
