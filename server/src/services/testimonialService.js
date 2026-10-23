const Testimonial = require('../models/Testimonial');
const AppError = require('../utils/AppError');

class TestimonialService {
  async create(data) {
    return await Testimonial.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let filter = {};
    if (query.search) {
      filter.$or = [
        { clientName: { $regex: query.search, $options: 'i' } },
        { content: { $regex: query.search, $options: 'i' } }
      ];
    }
    
    const total = await Testimonial.countDocuments(filter);
    const data = await Testimonial.find(filter)
      .sort('order -createdAt')
      .skip(skip)
      .limit(limit);
    
    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async getPublished() {
    const data = await Testimonial.find({ isPublished: true }).sort('order -createdAt');
    return { data };
  }

  async update(id, data) {
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    return testimonial;
  }

  async delete(id) {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }
    return null;
  }
}

module.exports = new TestimonialService();
