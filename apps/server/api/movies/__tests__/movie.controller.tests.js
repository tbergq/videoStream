// @flow

import fs from 'fs';

import { fetchAllMovies, destroy, stream } from '../movie.controller';
import { sendResponse } from '../../../utils/helpers';
import { deleteMovieAndSubtitles } from '../../../services/file.service';

jest.mock('../../../services/file.service.js', () => ({
  readAllMovies: () => ['test', 'test2'],
  deleteMovieAndSubtitles: jest.fn(),
  getFileType: input => {
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
      // $FlowExpectedError: Just passing what is needed for test case
      fetchAllMovies(null, null);
      expect(sendResponse).toHaveBeenCalledWith(200, ['test', 'test2'], null);
    });
  });

  describe('destroy', () => {
    it('should call deleteMovieAndSubtitles, then send response', () => {
      // $FlowExpectedError: Just passing what is needed for test case
      destroy({ params: { path: 'path.mp3' } }, null);
      expect(deleteMovieAndSubtitles).toHaveBeenCalledWith('path.mp3');
      expect(sendResponse).toHaveBeenCalledWith(200, null, null);
    });
  });

  describe('stream', () => {
    it('should send file if vtt file is asked for', () => {
      const res = {
        sendFile: jest.fn(),
      };
      // $FlowExpectedError: Just passing what is needed for test case
      stream({ params: { path: 'test.vtt' } }, res);
      expect(res.sendFile).toHaveBeenCalledWith('test.vtt');
    });

    it('should respond this way of range is sent', () => {
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
      // $FlowExpectedError: Just passing what is needed for test case
      stream(req, res);
      expect(res.writeHead).toHaveBeenCalledWith(206, {
        'Accept-Ranges': 'bytes',
        'Content-Length': '-122355612',
        'Content-Range': 'bytes 122355712-99/100',
        'Content-Type': 'video/mp4',
      });
      expect(fs.createReadStream).toHaveBeenCalledWith('test.mp4', {
        end: 99,
        start: 122355712,
      });
    });
  });
});
