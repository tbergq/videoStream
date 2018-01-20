import fs from 'fs';

import { sendResponse } from '../../utils/helpers';
import { readAllMovies, getStream } from '../../services/file.service';

export const fetchAllMovies = (req, res) => {
  const files = readAllMovies();

  return sendResponse(200, files, res);
};

export const stream = (req, res) => {
  const filePath = `${req.params.path}`;
  const splitName = req.params.path.split('.');
  const fileType = splitName[splitName.length - 1];
  console.log('filetype is', fileType);
  if (fileType === 'vtt') {
    console.log('should send vtt');
    return res.sendfile(filePath);
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
    console.log(`RANGE: ${start} - ${end} = ${chunksize}`);

    const movieStream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    });
    movieStream.pipe(res);
  } else {
    console.log(`ALL: ${total}`);
    res.writeHead(200, {
      'Content-Length': total,
      'Content-Type': 'video/mp4',
    });
    const movieStreamAll = getStream(filePath);
    movieStreamAll.pipe(res);
  }
};

