import movies from './api/movies';
import subtitles from './api/subtitles';

export default function createRoutes(app) {
  app.use('/api/movies', movies);
  app.use('/api/subtitles', subtitles);
}
