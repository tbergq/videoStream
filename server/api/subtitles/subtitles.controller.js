import scrapeSubtitles from '../../services/subtitle-scraper.service';
import { sendResponse } from '../../utils/helpers';

export const getSubtitles = async (req, res) => {
  const subtitles = await scrapeSubtitles(req.query.query);

  return sendResponse(200, subtitles, res);
};
