const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const testimonialService = require('../services/testimonialService');

exports.create = catchAsync(async (req, res, next) => {
  const result = await testimonialService.create(req.body);
  sendResponse(res, 201, 'Testimonial created successfully', result);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const { data, pagination } = await testimonialService.getAll(req.query);
  sendResponse(res, 200, 'Testimonials retrieved successfully', data, pagination);
});

exports.getPublished = catchAsync(async (req, res, next) => {
  const { data } = await testimonialService.getPublished();
  sendResponse(res, 200, 'Published testimonials retrieved successfully', data);
});

exports.update = catchAsync(async (req, res, next) => {
  const result = await testimonialService.update(req.params.id, req.body);
  sendResponse(res, 200, 'Testimonial updated successfully', result);
});

exports.delete = catchAsync(async (req, res, next) => {
  await testimonialService.delete(req.params.id);
  sendResponse(res, 200, 'Testimonial deleted successfully', null);
});
