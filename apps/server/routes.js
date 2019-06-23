// @flow

import movies from './api/movies';
import subtitles from './api/subtitles';

export default function createRoutes(app: any) {
  app.use('/api/movies', movies);
  app.use('/api/subtitles', subtitles);
}
