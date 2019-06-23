// @flow

import type { $Request, $Response } from 'express';

import scrapeSubtitles from '../../services/subtitle-scraper.service';
import { sendResponse } from '../../utils/helpers';
import { getFile } from '../../services/request';
import { writeFileBufferToMoviePath } from '../../services/file.service';

export const getSubtitles = async (req: $Request, res: $Response) => {
  if (typeof req.query.query !== 'string') {
    throw new Error('Expected query to be of type string.');
  }
  const subtitles = await scrapeSubtitles(req.query.query);

  return sendResponse(200, subtitles, res);
};

export const downloadSubtitles = async (req: $Request, res: $Response) => {
  const { url, moviePath } = req.query;
  if (typeof url !== 'string') {
    throw new Error('Expected url to be of type string.');
  }
  if (typeof moviePath !== 'string') {
    throw new Error('Expected moviePath to be of type string.');
  }
  const fileBuffer = await getFile(url);
  const srtPath = writeFileBufferToMoviePath(
    fileBuffer,
    decodeURIComponent(moviePath),
  );
  return sendResponse(200, { subtitleUrl: encodeURIComponent(srtPath) }, res);
};
