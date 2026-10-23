const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const blogService = require('../services/blogService');

exports.create = catchAsync(async (req, res, next) => {
  // Set author to the logged-in user
  req.body.author = req.user.id;
  const result = await blogService.create(req.body);
  sendResponse(res, 201, 'Blog created successfully', result);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const { data, pagination } = await blogService.getAll(req.query);
  sendResponse(res, 200, 'Blogs retrieved successfully', data, pagination);
});

exports.getPublished = catchAsync(async (req, res, next) => {
  const { data, pagination } = await blogService.getPublished(req.query);
  sendResponse(res, 200, 'Published blogs retrieved successfully', data, pagination);
});

exports.getBySlug = catchAsync(async (req, res, next) => {
  const result = await blogService.getBySlug(req.params.slug);
  sendResponse(res, 200, 'Blog retrieved successfully', result);
});

exports.update = catchAsync(async (req, res, next) => {
  const result = await blogService.update(req.params.id, req.body);
  sendResponse(res, 200, 'Blog updated successfully', result);
});

exports.delete = catchAsync(async (req, res, next) => {
  await blogService.delete(req.params.id);
  sendResponse(res, 200, 'Blog deleted successfully', null);
});
