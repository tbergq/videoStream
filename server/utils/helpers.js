export const sendResponse = (statusCode, body, res) =>
  res.status(statusCode).json(body);
