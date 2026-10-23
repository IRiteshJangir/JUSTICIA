const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const caseStudyService = require('../services/caseStudyService');

exports.create = catchAsync(async (req, res, next) => {
  const result = await caseStudyService.create(req.body);
  sendResponse(res, 201, 'Case study created successfully', result);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const { data, pagination } = await caseStudyService.getAll(req.query);
  sendResponse(res, 200, 'Case studies retrieved successfully', data, pagination);
});

exports.getPublished = catchAsync(async (req, res, next) => {
  const { data, pagination } = await caseStudyService.getPublished(req.query);
  sendResponse(res, 200, 'Published case studies retrieved successfully', data, pagination);
});

exports.getBySlug = catchAsync(async (req, res, next) => {
  const result = await caseStudyService.getBySlug(req.params.slug);
  sendResponse(res, 200, 'Case study retrieved successfully', result);
});

exports.update = catchAsync(async (req, res, next) => {
  const result = await caseStudyService.update(req.params.id, req.body);
  sendResponse(res, 200, 'Case study updated successfully', result);
});

exports.delete = catchAsync(async (req, res, next) => {
  await caseStudyService.delete(req.params.id);
  sendResponse(res, 200, 'Case study deleted successfully', null);
});
