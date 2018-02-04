import movieListController from '../movie-list.controller';

jest.mock('../../utils/get-html.js', () => jest.fn(() => 'html stuff'));

describe('movieListController', () => {
  it('should call res.send with the response from gethtml', () => {
    const res = {
      send: jest.fn(),
    };
    movieListController(null, res);

    expect(res.send).toHaveBeenCalledWith('html stuff');
  });
});
