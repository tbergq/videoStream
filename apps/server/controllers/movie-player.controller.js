// @flow

import { last } from 'ramda';
import type { $Request, $Response } from 'express';
import path from 'path';

import getHtml from '../utils/get-html';
import { getPrivateIp } from '../services/network.service';
import { replaceDotsWithSpace } from '../utils/helpers';

const port = process.env.PORT || 3300;

export default async function moviePlayerController(
  req: $Request,
  res: $Response,
) {
  const { movie, subtitleUrl } = req.query;
  const ip = await getPrivateIp();
  if (typeof movie !== 'string') {
    throw new Error('Expected movie of type string.');
  }
  if (typeof subtitleUrl !== 'string') {
    throw new Error('Expected subtitleUrl to be of type string.');
  }
  const moviePathArray = movie.split(path.sep);
  const initialState = {
    moviePlayer: {
      moviePath: encodeURIComponent(movie),
      movieName:
        movie != null && replaceDotsWithSpace(last(moviePathArray) ?? ''),
      subtitleUrl: encodeURIComponent(subtitleUrl),
      serverAddress: `${ip}:${port}`,
    },
  };

  const html = getHtml(
    [
      '<script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>',
      `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
        initialState,
      ).replace(/</g, '\\u003c')}</script>`,
      '<script src="movie-player.bundle.js"></script>',
    ].join(''),
    'Cast screen',
  );
  res.send(html);
}
