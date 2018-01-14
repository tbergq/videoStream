import movies from './api/movies';

export default function createRoutes(app) {
  app.use('/api/movies', movies);
}