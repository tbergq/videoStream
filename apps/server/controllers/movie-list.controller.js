// @flow

import type { $Request, $Response } from 'express';

export default function movieListController(req: $Request, res: $Response) {
  res.render('pages/movie-list', { title: 'Movie list' });
}
