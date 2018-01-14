import { sendResponse } from '../../utils/helpers';
import { readAllMovies } from '../../services/file.service';

export const fetchAllMovies = (req, res) => {
  const files = readAllMovies();

  return sendResponse(200, files, res);
};

export const stream = (req, res) => sendResponse(200, 'not yet implemented', res);

