const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const appointmentService = require('../services/appointmentService');

exports.create = catchAsync(async (req, res, next) => {
  const result = await appointmentService.create(req.body);
  sendResponse(res, 201, 'Appointment created successfully', result);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const { data, pagination } = await appointmentService.getAll(req.query);
  sendResponse(res, 200, 'Appointments retrieved successfully', data, pagination);
});

exports.getById = catchAsync(async (req, res, next) => {
  const result = await appointmentService.getById(req.params.id);
  sendResponse(res, 200, 'Appointment retrieved successfully', result);
});

exports.updateStatus = catchAsync(async (req, res, next) => {
  const { status, adminNotes } = req.body;
  const result = await appointmentService.updateStatus(req.params.id, status, adminNotes);
  sendResponse(res, 200, 'Appointment status updated successfully', result);
});

exports.delete = catchAsync(async (req, res, next) => {
  await appointmentService.delete(req.params.id);
  sendResponse(res, 200, 'Appointment deleted successfully', null);
});
