import scrapeSubtitles from '../../services/subtitle-scraper.service';
import { sendResponse } from '../../utils/helpers';
import { getFile } from '../../services/request';
import { writeFileBufferToMoviePath } from '../../services/file.service';

export const getSubtitles = async (req, res) => {
  const subtitles = await scrapeSubtitles(req.query.query);

  return sendResponse(200, subtitles, res);
};

export const downloadSubtitles = async (req, res) => {
  const { url, moviePath } = req.query;
  const fileBuffer = await getFile(url);
  writeFileBufferToMoviePath(fileBuffer, moviePath);
  return sendResponse(200, null, res);
};
