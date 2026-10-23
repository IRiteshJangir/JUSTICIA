const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const contactService = require('../services/contactService');

exports.create = catchAsync(async (req, res, next) => {
  const result = await contactService.create(req.body);
  sendResponse(res, 201, 'Contact enquiry created successfully', result);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const { data, pagination } = await contactService.getAll(req.query);
  sendResponse(res, 200, 'Contact enquiries retrieved successfully', data, pagination);
});

exports.getById = catchAsync(async (req, res, next) => {
  const result = await contactService.getById(req.params.id);
  sendResponse(res, 200, 'Contact enquiry retrieved successfully', result);
});

exports.updateStatus = catchAsync(async (req, res, next) => {
  const { status, adminNotes } = req.body;
  const result = await contactService.updateStatus(req.params.id, status, adminNotes);
  sendResponse(res, 200, 'Contact enquiry status updated successfully', result);
});

exports.delete = catchAsync(async (req, res, next) => {
  await contactService.delete(req.params.id);
  sendResponse(res, 200, 'Contact enquiry deleted successfully', null);
});
