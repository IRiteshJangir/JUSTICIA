const TeamMember = require('../models/TeamMember');
const AppError = require('../utils/AppError');

class TeamService {
  async create(data) {
    return await TeamMember.create(data);
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let filter = {};
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { designation: { $regex: query.search, $options: 'i' } }
      ];
    }
    
    const total = await TeamMember.countDocuments(filter);
    const data = await TeamMember.find(filter)
      .sort('order -createdAt')
      .skip(skip)
      .limit(limit);
    
    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async getPublished() {
    const data = await TeamMember.find({ isPublished: true }).sort('order -createdAt');
    return { data };
  }

  async getById(id) {
    const member = await TeamMember.findById(id);
    if (!member) {
      throw new AppError('Team member not found', 404);
    }
    return member;
  }

  async update(id, data) {
    const member = await TeamMember.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    if (!member) {
      throw new AppError('Team member not found', 404);
    }
    return member;
  }

  async delete(id) {
    const member = await TeamMember.findByIdAndDelete(id);
    if (!member) {
      throw new AppError('Team member not found', 404);
    }
    return null;
  }
}

module.exports = new TeamService();
