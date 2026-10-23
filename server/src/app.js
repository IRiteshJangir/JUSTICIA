const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { apiLimiter } = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/AppError');

// Import all routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const practiceAreaRoutes = require('./routes/practiceAreaRoutes');
const caseStudyRoutes = require('./routes/caseStudyRoutes');
const blogRoutes = require('./routes/blogRoutes');
const blogCategoryRoutes = require('./routes/blogCategoryRoutes');
const contactRoutes = require('./routes/contactRoutes');
const faqRoutes = require('./routes/faqRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const teamRoutes = require('./routes/teamRoutes');
const settingRoutes = require('./routes/settingRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        process.env.CLIENT_URL,
        'http://localhost:5173',
        'http://localhost:3000',
      ].filter(Boolean);
      
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app');
      
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(null, true); // Allow during initial setup/testing
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
app.use('/api', apiLimiter);

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/practice-areas', practiceAreaRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/blog-categories', blogCategoryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'JUSTICIA API is running' }));

// 404 handler
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
