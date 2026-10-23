const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const blogCategoryService = require('../services/blogCategoryService');

exports.create = catchAsync(async (req, res, next) => {
  const result = await blogCategoryService.create(req.body);
  sendResponse(res, 201, 'Blog category created successfully', result);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const result = await blogCategoryService.getAll();
  sendResponse(res, 200, 'Blog categories retrieved successfully', result);
});

exports.update = catchAsync(async (req, res, next) => {
  const result = await blogCategoryService.update(req.params.id, req.body);
  sendResponse(res, 200, 'Blog category updated successfully', result);
});

exports.delete = catchAsync(async (req, res, next) => {
  await blogCategoryService.delete(req.params.id);
  sendResponse(res, 200, 'Blog category deleted successfully', null);
});
