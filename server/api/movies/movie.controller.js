import fs from 'fs';

import { sendResponse } from '../../utils/helpers';
import { readAllMovies, getStream, deleteMovieAndSubtitles, getFileType } from '../../services/file.service';

export const fetchAllMovies = (req, res) => {
  const files = readAllMovies();

  return sendResponse(200, files, res);
};

export const destroy = (req, res) => {
  deleteMovieAndSubtitles(req.params.path);
  return sendResponse(200, null, res);
};

export const stream = (req, res) => {
  const filePath = req.params.path;
  const fileType = getFileType(filePath);

  if (fileType === 'vtt') {
    return res.sendFile(filePath);
  }

  const stat = fs.statSync(filePath);
  const total = stat.size;
  const { headers: { range } } = req;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const partialstart = parts[0];
    const partialend = parts[1];

    const start = parseInt(partialstart, 10);
    const end = partialend ? parseInt(partialend, 10) : total - 1;
    const chunksize = (end - start) + 1;

    const movieStream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    });
    return movieStream.pipe(res);
  }
  res.writeHead(200, {
    'Content-Length': total,
    'Content-Type': 'video/mp4',
  });
  const movieStreamAll = getStream(filePath);
  return movieStreamAll.pipe(res);
};

