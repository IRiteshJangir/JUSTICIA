const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
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

// Serve static client build if present
const clientDist = path.join(__dirname, '../../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
}

// Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'JUSTICIA API is running' }));

// Root status endpoint
app.get('/', (req, res) => {
  if (fs.existsSync(path.join(clientDist, 'index.html'))) {
    return res.sendFile(path.join(clientDist, 'index.html'));
  }
  res.status(200).json({
    success: true,
    message: '🏛️ JUSTICIA Advocates & Legal Consultants API is running successfully',
    environment: process.env.NODE_ENV || 'production',
    endpoints: {
      health: '/api/health',
      settings: '/api/settings',
      practiceAreas: '/api/practice-areas/public',
      caseStudies: '/api/case-studies/public',
      blogs: '/api/blogs/public',
      faqs: '/api/faqs/public',
      team: '/api/team/public',
      testimonials: '/api/testimonials/public',
    },
    note: 'This is the backend REST API server. The interactive frontend website is hosted on Vercel.',
  });
});

// SPA catch-all for frontend routes (if client build is present)
app.get('*', (req, res, next) => {
  if (!req.originalUrl.startsWith('/api') && fs.existsSync(path.join(clientDist, 'index.html'))) {
    return res.sendFile(path.join(clientDist, 'index.html'));
  }
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use(errorHandler);

module.exports = app;
