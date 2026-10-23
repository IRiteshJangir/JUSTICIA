const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const settingsService = require('../services/settingsService');

exports.get = catchAsync(async (req, res, next) => {
  const result = await settingsService.get();
  sendResponse(res, 200, 'Settings retrieved successfully', result);
});

exports.update = catchAsync(async (req, res, next) => {
  const result = await settingsService.update(req.body);
  sendResponse(res, 200, 'Settings updated successfully', result);
});
