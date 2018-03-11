import fs from 'fs';
import {
  isHiddenFile,
  changeFileType,
  getFileType,
  getSubtitleUrl,
  readAllMovies,
  deleteFileIfExists,
} from '../file.service';

jest.mock('fs', () => ({
  existsSync: input => {
    if (input.indexOf('exists.vtt') >= 0) {
      return true;
    }
    return false;
  },
  readdirSync: () => ['exists.mkv', 'lol.mp4', 'knask.vtt', '.DS_Store'],
  statSync: () => ({
    isDirectory: () => false,
    isFile: () => true,
  }),
  unlinkSync: jest.fn(),
}));
jest.mock('srt-to-vtt');

describe('File service', () => {
  beforeEach(() => {
    fs.unlinkSync = jest.fn();
  });

  describe('isHiddenFile', () => {
    it('should return true if file starts with .', () => {
      expect(isHiddenFile('.DS_Store')).toEqual(true);
    });

    it('should return false if file does not starts with .', () => {
      expect(isHiddenFile('test.mp4')).toEqual(false);
    });
  });

  describe('changeFileType', () => {
    it('should change the file type', () => {
      const mp4 = 'test.mp4';
      const vtt = 'test.vtt';
      expect(changeFileType(mp4, 'vtt')).toEqual(vtt);
    });
  });

  describe('getFileType', () => {
    it('it should return the filetype', () => {
      const mp4 = 'test.mp4';
      expect(getFileType(mp4)).toEqual('mp4');
    });
  });

  describe('getSubtitleUrl', () => {
    it('should return the subtitle url for a movie if it exists', () => {
      const subUrl = getSubtitleUrl('exists.mkv');
      expect(subUrl).toEqual('exists.vtt');
    });

    it('should return empty string if subtitle url for movie does not exists', () => {
      const subUrl = getSubtitleUrl('does_not_exist.mkv');
      expect(subUrl).toEqual('');
    });
  });

  describe('readAllMovies', () => {
    const movies = readAllMovies('testDir');
    expect(movies).toEqual([
      {
        name: 'exists.mkv',
        fileType: 'mkv',
        fullPath: 'testDir/exists.mkv',
        subtitleUrl: 'testDir/exists.vtt',
      },
      {
        name: 'lol.mp4',
        fileType: 'mp4',
        fullPath: 'testDir/lol.mp4',
        subtitleUrl: '',
      },
    ]);
  });

  describe('deleteFileIfExists', () => {
    it('should delete file if it exists', () => {
      deleteFileIfExists('exists.vtt');
      expect(fs.unlinkSync).toHaveBeenCalled();
    });

    it('should not call unlikSync if file does not exist', () => {
      deleteFileIfExists('nope.vtt');
      expect(fs.unlinkSync).not.toHaveBeenCalled();
    });
  });
});
