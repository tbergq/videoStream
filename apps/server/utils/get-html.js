// @flow

import fs from 'fs';
import path from 'path';

export default function getHtml(
  scriptReplacement: string,
  titleReplacement: string,
) {
  const indexHtml = fs
    .readFileSync(path.join(__dirname, '..', 'index.html'))
    .toString();
  const html = indexHtml
    .replace('%script%', scriptReplacement)
    .replace('%title%', titleReplacement);
  return html;
}
