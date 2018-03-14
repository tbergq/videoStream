import request from 'supertest';
import app from '../app';

jest.mock('../services/file.service.js');

describe('App', () => {
  it('Should respond with 404 to unknown paths', async () => {
    const response = await request(app).get('/this/path/does/not/exists');
    expect(response.statusCode).toBe(404);
  });
  describe('Test the root path', () => {
    it('Should respond the GET method', async () => {
      const response = await request(app).get('/');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test the /movie-player path', () => {
    it('Should respond the GET method', async () => {
      const response = await request(app).get('/movie-player');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test the /api/movies path', () => {
    it('Should respond the GET method', async () => {
      const response = await request(app).get('/api/movies');
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Test the /api/movies/:path path', () => {
    it('Should respond the DELETE method', async () => {
      const response = await request(app).delete(
        `/api/movies/${encodeURIComponent(
          '/Users/tronbe/Movies/tester/Vikings.S05E04.The Plan.srt',
        )}`,
      );
      expect(response.statusCode).toBe(200);
    });
  });
  describe('Test the /api/subtitles path', () => {
    it('Should respond the GET method', async () => {
      const response = await request(app).get(`/api/subtitles?query=lol`);
      expect(response.statusCode).toBe(200);
    });
  });
});
