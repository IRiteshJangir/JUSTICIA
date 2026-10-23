const CaseStudy = require('../models/CaseStudy');
const AppError = require('../utils/AppError');

class CaseStudyService {
  async create(data) {
    return await CaseStudy.create(data);
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
    
    const total = await CaseStudy.countDocuments(filter);
    const data = await CaseStudy.find(filter)
      .populate('practiceArea', 'title')
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
    
    let filter = { isPublished: true };
    if (query.practiceArea) filter.practiceArea = query.practiceArea;
    
    const total = await CaseStudy.countDocuments(filter);
    const data = await CaseStudy.find(filter)
      .populate('practiceArea', 'title')
      .sort('-publishedAt')
      .skip(skip)
      .limit(limit);
    
    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async getBySlug(slug) {
    const caseStudy = await CaseStudy.findOne({ slug }).populate('practiceArea');
    if (!caseStudy) {
      throw new AppError('Case study not found', 404);
    }
    return caseStudy;
  }

  async update(id, data) {
    const caseStudy = await CaseStudy.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!caseStudy) {
      throw new AppError('Case study not found', 404);
    }
    return caseStudy;
  }

  async delete(id) {
    const caseStudy = await CaseStudy.findByIdAndDelete(id);
    if (!caseStudy) {
      throw new AppError('Case study not found', 404);
    }
    return null;
  }
}

module.exports = new CaseStudyService();
