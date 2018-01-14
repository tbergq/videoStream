import fs from 'fs';
import last from 'lodash/last';

const MOVIE_PATH = '/Users/tronbe/Movies';

const getFileType = (fileName) => {
  const fileNameSplitted = fileName.split(".");
  return last(fileNameSplitted);
}

const getSubtitleUrl = (path) => {
  let fileNameSplitted = path.split(".");
  fileNameSplitted[fileNameSplitted.length - 1] = "vtt";
  
  const fileName = fileNameSplitted.join(".");
  
  let exist = fs.existsSync(fileName);
  return exist ? fileName : "";
}

export const readAllMovies = () => {
  const files = fs.readdirSync(MOVIE_PATH);
  let outFiles = [];

  files.forEach(file => {
    if (
      file.indexOf(".") === 0 /* ||
      this.currentlyConverting.indexOf(`${path}/${file}`) >= 0 */
    ) {
      // Don't return files starting with . altso known as hidden files
      // Don't return files currently in conversion
      return;
    }

    const stat = fs.statSync(`${MOVIE_PATH}/${file}`);
    const isDirectory = stat.isDirectory();
    const isFile = stat.isFile();
    const fileType = isFile ? getFileType(file) : null;
    const hasSrt = fs.existsSync();

    if (isDirectory) {
      const recursiveFiles = readAllMovies(`${MOVIE_PATH}/${file}`);
      recursiveFiles.forEach(item => outFiles.push(item));
    } else if (fileType === "mkv" || fileType === "mp4") {
      outFiles.push({
        name: file,
        fileType: fileType,
        fullPath: `${MOVIE_PATH}/${file}`,
        subtitleUrl: getSubtitleUrl(`${MOVIE_PATH}/${file}`)
      });
    }
  });

  return outFiles;
}