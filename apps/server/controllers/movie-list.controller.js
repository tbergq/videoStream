// @flow

import type { $Request, $Response } from 'express';

import getHtml from '../utils/get-html';

export default function movieListController(req: $Request, res: $Response) {
  const html = getHtml(
    '<script src="movies.bundle.js"></script>',
    'Movie List',
  );
  res.send(html);
}
