import { getSubtitles } from '../subtitles.controller';
import { sendResponse } from '../../../utils/helpers';
import scrapeSubtitles from '../../../services/subtitle-scraper.service';

jest.mock('../../../utils/helpers', () => ({
  sendResponse: jest.fn(),
}));
jest.mock('../../../services/subtitle-scraper.service', () =>
  jest.fn(() => 'scraped'),
);

describe('Subtitles controller', () => {
  it('should call scrapeSubtitles', async () => {
    await getSubtitles({ query: { query: 'lol' } }, {});

    expect(scrapeSubtitles).toHaveBeenCalledWith('lol');
    expect(sendResponse).toHaveBeenCalledWith(200, 'scraped', {});
  });
});
