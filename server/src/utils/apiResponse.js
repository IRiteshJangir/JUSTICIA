const sendResponse = (res, statusCode, message, data = null, pagination = null) => {
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
};

module.exports = sendResponse;
