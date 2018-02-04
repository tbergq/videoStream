import moviePlayerController from '../movie-player.controller';

jest.mock('../../utils/get-html.js', () => jest.fn(() => 'html stuff'));
jest.mock('../../services/nework.service.js', () => ({
  getPrivateIp: () => new Promise((resolve) => {
    resolve('ok');
  }),
}));

describe('moviePlayerController', () => {
  it('should call res.send with the response from gethtml', async () => {
    const res = {
      send: jest.fn(),
    };
    const query = {
      movie: '',
      subtitleUrl: '',
    };
    await moviePlayerController({ query }, res);

    expect(res.send).toHaveBeenCalledWith('html stuff');
  });
});
