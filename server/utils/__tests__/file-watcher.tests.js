import fs from 'fs';
import { fileHandler, watchHandler } from '../file-watcher';
import { convertSrtToVtt } from '../../services/file.service';

jest.mock('../../services/file.service.js', () => ({
  getFileType: (input) => {
    const splitInput = input.split('.');
    return splitInput[splitInput.length - 1];
  },
  convertSrtToVtt: jest.fn(),
}));
jest.mock('fs', () => ({
  statSync: (input) => {
    switch (input) {
      case 'test.srt':
        return {
          isFile: () => true,
          isDirectory: () => false,
        };
      default:
        return null;
    }
  },
}));

describe('File watcher', () => {
  describe('fileHandler', () => {
    it('should call convertSrtToVtt when passed file of type srt', () => {
      fileHandler('test.srt');
      expect(convertSrtToVtt).toHaveBeenCalled();
    });
  });

  describe('watchHandler', () => {
    it('should call fileHandler if passed a file', () => {
      watchHandler('test.srt');
      expect(convertSrtToVtt).toHaveBeenCalled();
    });
  });
});

