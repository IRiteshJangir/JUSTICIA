const ContactEnquiry = require('../models/ContactEnquiry');
const AppError = require('../utils/AppError');
const sendEmail = require('../config/email');

class ContactService {
  async create(data) {
    const enquiry = await ContactEnquiry.create(data);
    
    try {
      await sendEmail({
        to: 'admin@justicia.com', // Replace with dynamic admin email if needed
        subject: `New Contact Enquiry: ${data.subject}`,
        html: `<p>New enquiry from ${data.name} (${data.email})</p><p>Message: ${data.message}</p>`
      });
    } catch (error) {
      console.error('Email sending failed:', error);
    }
    
    return enquiry;
  }

  async getAll(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    
    let filter = {};
    if (query.status) filter.status = query.status;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } },
        { subject: { $regex: query.search, $options: 'i' } }
      ];
    }
    
    const total = await ContactEnquiry.countDocuments(filter);
    const data = await ContactEnquiry.find(filter)
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);
    
    return {
      data,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    };
  }

  async getById(id) {
    const enquiry = await ContactEnquiry.findById(id);
    if (!enquiry) {
      throw new AppError('Enquiry not found', 404);
    }
    return enquiry;
  }

  async updateStatus(id, status, adminNotes) {
    const enquiry = await ContactEnquiry.findById(id);
    if (!enquiry) {
      throw new AppError('Enquiry not found', 404);
    }
    
    enquiry.status = status;
    if (adminNotes !== undefined) {
      enquiry.adminNotes = adminNotes;
    }
    await enquiry.save();
    return enquiry;
  }

  async delete(id) {
    const enquiry = await ContactEnquiry.findByIdAndDelete(id);
    if (!enquiry) {
      throw new AppError('Enquiry not found', 404);
    }
    return null;
  }
}

module.exports = new ContactService();
