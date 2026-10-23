const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const authService = require('../services/authService');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  sendResponse(res, 200, 'Login successful', result);
});

exports.getMe = catchAsync(async (req, res, next) => {
  const result = await authService.getMe(req.user.id);
  sendResponse(res, 200, 'User details retrieved', result);
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const result = await authService.changePassword(req.user.id, currentPassword, newPassword);
  sendResponse(res, 200, 'Password changed successfully', result);
});

exports.logout = catchAsync(async (req, res, next) => {
  sendResponse(res, 200, 'Logout successful', null);
});
