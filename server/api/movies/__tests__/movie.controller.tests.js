import fs from 'fs';
import { fetchAllMovies, destroy, stream } from '../movie.controller';
import { sendResponse } from '../../../utils/helpers';
import { deleteMovieAndSubtitles, getStream } from '../../../services/file.service';


jest.mock('../../../services/file.service.js', () => ({
  readAllMovies: () => ['test', 'test2'],
  deleteMovieAndSubtitles: jest.fn(),
  getFileType: (input) => {
    const a = input.split('.');
    return a[a.length - 1];
  },
  getStream: () => ({
    pipe: jest.fn(),
  }),
}));

jest.mock('../../../utils/helpers.js', () => ({
  sendResponse: jest.fn(),
}));

jest.mock('fs', () => ({
  createReadStream: jest.fn(() => ({
    pipe: jest.fn(),
  })),
  statSync: () => ({
    size: 100,
  }),
}));

describe('Movie api controller', () => {
  describe('fetchAllMovies', () => {
    it('should send files to send response', () => {
      fetchAllMovies(null, null);
      expect(sendResponse).toHaveBeenCalledWith(200, ['test', 'test2'], null);
    });
  });

  describe('destroy', () => {
    it('should call deleteMovieAndSubtitles, then send response', () => {
      destroy({ params: { path: 'path.mp3' } }, null);
      expect(deleteMovieAndSubtitles).toHaveBeenCalled();
      expect(sendResponse).toHaveBeenCalledWith(200, null, null);
    });
  });

  describe('stream', () => {
    it('should send file if vtt file is asked for', () => {
      const res = {
        sendFile: jest.fn(),
      };
      stream({ params: { path: 'test.vtt' } }, res);
      expect(res.sendFile).toHaveBeenCalledWith('test.vtt');
    });

    it('should resond this way of range is sent', () => {
      const req = {
        params: {
          path: 'test.mp4',
        },
        headers: {
          range: 'bytes=122355712-',
        },
      };
      const res = {
        writeHead: jest.fn(),
      };

      stream(req, res);
      expect(res.writeHead).toHaveBeenCalled();
      expect(fs.createReadStream).toHaveBeenCalled();
    });
  });
});
