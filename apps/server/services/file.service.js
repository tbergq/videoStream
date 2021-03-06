// @flow

import fs from 'fs';
import { last } from 'ramda';
import srt2vtt from 'srt-to-vtt';
import filetype from 'file-type';
import os from 'os';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const { MOVIE_PATH: moviePath } = process.env;
export const MOVIE_PATH = moviePath ?? '';

export const isHiddenFile = (filename: string) => filename.indexOf('.') === 0;
export const isDeleted = (filePath: string) => !fs.existsSync(filePath);
export const changeFileType = (file: string, newFileType: string) => {
  const fileSplit = file.split('.');
  fileSplit[fileSplit.length - 1] = newFileType;
  return fileSplit.join('.');
};

export const getFileType = (fileName: string) => last(fileName.split('.'));

export const getSubtitleUrl = (path: string) => {
  const fileName = changeFileType(path, 'vtt');

  const exist = fs.existsSync(fileName);
  return exist ? fileName : '';
};

export const readAllMovies = (path: string = MOVIE_PATH) => {
  const files = fs.readdirSync(path);
  const outFiles = [];

  files.forEach(file => {
    if (
      isHiddenFile(
        file,
      ) /* ||
      this.currentlyConverting.indexOf(`${path}/${file}`) >= 0 */
    ) {
      // Don't return files starting with . altso known as hidden files
      // Don't return files currently in conversion
      return;
    }

    const stat = fs.statSync(`${path}/${file}`);
    const isDirectory = stat.isDirectory();
    const isFile = stat.isFile();
    const fileType = isFile ? getFileType(file) : null;

    if (isDirectory) {
      const recursiveFiles = readAllMovies(`${path}/${file}`);
      recursiveFiles.forEach(item => outFiles.push(item));
    } else if (fileType === 'mkv' || fileType === 'mp4') {
      outFiles.push({
        name: file.replace(/\./g, ' '),
        fileType,
        fullPath: `${path}/${file}`,
        subtitleUrl: getSubtitleUrl(`${path}/${file}`),
      });
    }
  });

  return outFiles;
};

export const getStream = (path: string, options?: { ... }) =>
  fs.createReadStream(path, options ?? {});

export const convertSrtToVtt = (filePath: string) => {
  const vttFileName = changeFileType(filePath, 'vtt');

  fs.createReadStream(filePath)
    .pipe(srt2vtt())
    .pipe(fs.createWriteStream(vttFileName));
};

export const deleteFileIfExists = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

export const deleteMovieAndSubtitles = (filePath: string) => {
  const srt = changeFileType(filePath, 'srt');
  const vtt = changeFileType(filePath, 'vtt');
  deleteFileIfExists(filePath);
  deleteFileIfExists(vtt);
  deleteFileIfExists(srt);
};

export const writeFileBufferToMoviePath = (
  fileBuffer: string,
  filePath: string,
) => {
  const { ext } = filetype(fileBuffer);
  const tmpFilePath = `${os.tmpdir()}/tmpSub.${ext}`;
  const tmpFilePathExtracted = `${os.tmpdir()}/tmpSubExtracted`;
  fs.writeFileSync(tmpFilePath, fileBuffer);

  let unpackCommand = '';

  if (ext === 'zip') {
    unpackCommand = `unzip ${tmpFilePath} -d ${tmpFilePathExtracted}`;
  } else if (ext === 'rar') {
    execSync(`mkdir tmpSubExtracted`, { cwd: os.tmpdir() });
    unpackCommand = `unrar e ${tmpFilePath} ${tmpFilePathExtracted}`;
  }

  execSync(unpackCommand, { stdio: 'inherit' });
  const files = fs.readdirSync(tmpFilePathExtracted);
  const subtitle = files.find(file => getFileType(file) === 'srt') ?? '';
  const vttPath = changeFileType(filePath, 'vtt');

  fs.createReadStream(`${tmpFilePathExtracted}/${subtitle}`)
    .pipe(srt2vtt())
    .pipe(fs.createWriteStream(vttPath));

  execSync(`rm -rf ${tmpFilePathExtracted}`);
  fs.unlinkSync(tmpFilePath);

  return vttPath;
};
