const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const dashboardService = require('../services/dashboardService');

exports.getStats = catchAsync(async (req, res, next) => {
  const result = await dashboardService.getStats();
  sendResponse(res, 200, 'Dashboard statistics retrieved successfully', result);
});

exports.getAnalytics = catchAsync(async (req, res, next) => {
  const result = await dashboardService.getAnalytics();
  sendResponse(res, 200, 'Dashboard analytics retrieved successfully', result);
});
