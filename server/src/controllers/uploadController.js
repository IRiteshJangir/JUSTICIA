const catchAsync = require('../utils/catchAsync');
const sendResponse = require('../utils/apiResponse');
const uploadService = require('../services/uploadService');
const AppError = require('../utils/AppError');

exports.upload = catchAsync(async (req, res, next) => {
  if (!req.file) {
    throw new AppError('Please provide a file to upload', 400);
  }
  
  const result = await uploadService.uploadImage(req.file);
  sendResponse(res, 200, 'File uploaded successfully', result);
});

exports.deleteImage = catchAsync(async (req, res, next) => {
  const { publicId } = req.body;
  if (!publicId) {
    throw new AppError('Please provide publicId', 400);
  }
  
  await uploadService.deleteImage(publicId);
  sendResponse(res, 200, 'Image deleted successfully', null);
});
