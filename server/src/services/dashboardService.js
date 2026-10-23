const Appointment = require('../models/Appointment');
const ContactEnquiry = require('../models/ContactEnquiry');
const PracticeArea = require('../models/PracticeArea');
const CaseStudy = require('../models/CaseStudy');
const Blog = require('../models/Blog');

class DashboardService {
  async getStats() {
    const [appointments, enquiries, practiceAreas, caseStudies, blogs] = await Promise.all([
      Appointment.countDocuments(),
      ContactEnquiry.countDocuments(),
      PracticeArea.countDocuments(),
      CaseStudy.countDocuments(),
      Blog.countDocuments()
    ]);
    
    return {
      appointments,
      enquiries,
      practiceAreas,
      caseStudies,
      blogs
    };
  }

  async getAnalytics() {
    // Recent items
    const [recentAppointments, recentEnquiries] = await Promise.all([
      Appointment.find().sort('-createdAt').limit(5),
      ContactEnquiry.find().sort('-createdAt').limit(5)
    ]);
    
    // Monthly appointments for last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyAppointments = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);
    
    return {
      recentAppointments,
      recentEnquiries,
      monthlyAppointments
    };
  }
}

module.exports = new DashboardService();
