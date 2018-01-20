import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import createRoutes from './routes';

const port = process.env.PORT || 3300;
const app = express();

app.use(express.static('dist'));
app.use(morgan('dev'));
createRoutes(app);

app.get('/', (req, res) => {
  const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html')).toString();
  const html = indexHtml.replace('%script%', '<script src="movies.bundle.js"></script>');
  res.send(html);
});

app.get('/movie-player', (req, res) => {
  const { movie, subtitleUrl } = req.query;
  const initialState = {
    moviePlayer: {
      moviePath: encodeURIComponent(movie),
      subtitleUrl: encodeURIComponent(subtitleUrl),
    },
  };
  const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html')).toString();
  const html = indexHtml.replace(
    '%script%',
    [
      `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script>`,
      '<script src="movie-player.bundle.js"></script>',
    ].join(''),
  );
  res.send(html);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); // eslint-disable-line
