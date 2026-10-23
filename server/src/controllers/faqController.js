const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const faqService = require('../services/faqService');

exports.create = catchAsync(async (req, res, next) => {
  const result = await faqService.create(req.body);
  sendResponse(res, 201, 'FAQ created successfully', result);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const { data, pagination } = await faqService.getAll(req.query);
  sendResponse(res, 200, 'FAQs retrieved successfully', data, pagination);
});

exports.getPublished = catchAsync(async (req, res, next) => {
  const { data, pagination } = await faqService.getPublished(req.query);
  sendResponse(res, 200, 'Published FAQs retrieved successfully', data, pagination);
});

exports.update = catchAsync(async (req, res, next) => {
  const result = await faqService.update(req.params.id, req.body);
  sendResponse(res, 200, 'FAQ updated successfully', result);
});

exports.delete = catchAsync(async (req, res, next) => {
  await faqService.delete(req.params.id);
  sendResponse(res, 200, 'FAQ deleted successfully', null);
});
