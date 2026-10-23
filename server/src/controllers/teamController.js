const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const teamService = require('../services/teamService');

exports.create = catchAsync(async (req, res, next) => {
  const result = await teamService.create(req.body);
  sendResponse(res, 201, 'Team member created successfully', result);
});

exports.getAll = catchAsync(async (req, res, next) => {
  const { data, pagination } = await teamService.getAll(req.query);
  sendResponse(res, 200, 'Team members retrieved successfully', data, pagination);
});

exports.getPublished = catchAsync(async (req, res, next) => {
  const { data } = await teamService.getPublished();
  sendResponse(res, 200, 'Published team members retrieved successfully', data);
});

exports.getById = catchAsync(async (req, res, next) => {
  const result = await teamService.getById(req.params.id);
  sendResponse(res, 200, 'Team member retrieved successfully', result);
});

exports.update = catchAsync(async (req, res, next) => {
  const result = await teamService.update(req.params.id, req.body);
  sendResponse(res, 200, 'Team member updated successfully', result);
});

exports.delete = catchAsync(async (req, res, next) => {
  await teamService.delete(req.params.id);
  sendResponse(res, 200, 'Team member deleted successfully', null);
});
