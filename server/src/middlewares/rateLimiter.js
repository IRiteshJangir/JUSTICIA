const rateLimit = require('express-rate-limit');

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
      success: false,
      message: 'Too many requests from this IP, please try again in 15 minutes.'
  }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 10 requests per `window`
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
      success: false,
      message: 'Too many authentication attempts from this IP, please try again in 15 minutes.'
  }
});

module.exports = {
    generalLimiter,
    apiLimiter: generalLimiter,
    authLimiter
};
