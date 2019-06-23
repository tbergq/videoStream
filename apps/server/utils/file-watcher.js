// @flow

import fs from 'fs';

import {
  getFileType,
  convertSrtToVtt,
  isHiddenFile,
  isDeleted,
  MOVIE_PATH,
} from '../services/file.service';

export const fileHandler = (fullPath: string) => {
  switch (getFileType(fullPath)) {
    case 'srt':
      convertSrtToVtt(fullPath);
      break;
    case 'avi':
      // TODO: Add later
      // convertToMp4(fullPath, true, true);
      break;
    default:
      break;
  }
};

export const watchHandler = (fullPath: string) => {
  const stats = fs.statSync(fullPath);
  const isFile = stats.isFile();
  const isDirectory = stats.isDirectory();

  if (isFile) {
    fileHandler(fullPath);
  } else if (isDirectory) {
    const files = fs.readdirSync(fullPath);

    files.forEach(file => {
      watchHandler(`${fullPath}/${file}`);
    });
  }
};

const fileWatcher = () => {
  fs.watch(
    MOVIE_PATH,
    {
      persistent: true,
      recursive: true,
    },
    (eventType, filename) => {
      const fullPath = `${MOVIE_PATH}/${filename}`;

      if (isHiddenFile(filename) || isDeleted(fullPath)) {
        return;
      }
      watchHandler(fullPath);
    },
  );
};

export default fileWatcher;
