import getHtml from './get-html';
import { getPrivateIp } from '../services/nework.service';

const port = process.env.PORT || 3300;

export default async function moviePlayerController(req, res) {
  const { movie, subtitleUrl } = req.query;
  const ip = await getPrivateIp();
  const initialState = {
    moviePlayer: {
      moviePath: encodeURIComponent(movie),
      subtitleUrl: encodeURIComponent(subtitleUrl),
      serverAddress: `${ip}:${port}`,
    },
  };

  const html = getHtml([
    '<script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>',
    `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>`,
    '<script src="movie-player.bundle.js"></script>',
  ].join(''), 'Cast screen');
  res.send(html);
}
