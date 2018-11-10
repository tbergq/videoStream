export const sendResponse = (statusCode, body, res) =>
  res.status(statusCode).json(body);

export const last = array => array[array.length - 1];

export const replaceDotsWithSpace = input => input.replace(/\./g, ' ');
