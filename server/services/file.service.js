import fs from 'fs';
import last from 'lodash/last';

export const MOVIE_PATH = '/Users/tronbe/Movies';

const getFileType = (fileName) => {
  const fileNameSplitted = fileName.split('.');
  return last(fileNameSplitted);
};

const getSubtitleUrl = (path) => {
  const fileNameSplitted = path.split('.');
  fileNameSplitted[fileNameSplitted.length - 1] = 'vtt';

  const fileName = fileNameSplitted.join('.');

  const exist = fs.existsSync(fileName);
  return exist ? fileName : '';
};

export const readAllMovies = (path = MOVIE_PATH) => {
  const files = fs.readdirSync(path);
  const outFiles = [];

  files.forEach((file) => {
    if (
      file.indexOf('.') === 0 /* ||
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
        name: file,
        fileType,
        fullPath: `${path}/${file}`,
        subtitleUrl: getSubtitleUrl(`${path}/${file}`),
      });
    }
  });

  return outFiles;
};
