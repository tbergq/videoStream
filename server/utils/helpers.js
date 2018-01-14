export const sendResponse = (statusCode, body, res) => {
  return res.status(statusCode).json(body);
}