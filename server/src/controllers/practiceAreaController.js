const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const practiceAreaService = require('../services/practiceAreaService');

exports.create = catchAsync(async (req, res, next) => {
  const result = await practiceAreaService.create(req.body);
  sendResponse(res, 201, 'Practice area created successfully', result);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const { data, pagination } = await practiceAreaService.getAll(req.query);
  sendResponse(res, 200, 'Practice areas retrieved successfully', data, pagination);
});

exports.getPublished = catchAsync(async (req, res, next) => {
  const { data, pagination } = await practiceAreaService.getPublished(req.query);
  sendResponse(res, 200, 'Published practice areas retrieved successfully', data, pagination);
});

exports.getBySlug = catchAsync(async (req, res, next) => {
  const result = await practiceAreaService.getBySlug(req.params.slug);
  sendResponse(res, 200, 'Practice area retrieved successfully', result);
});

exports.update = catchAsync(async (req, res, next) => {
  const result = await practiceAreaService.update(req.params.id, req.body);
  sendResponse(res, 200, 'Practice area updated successfully', result);
});

exports.delete = catchAsync(async (req, res, next) => {
  await practiceAreaService.delete(req.params.id);
  sendResponse(res, 200, 'Practice area deleted successfully', null);
});
