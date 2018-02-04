import express from 'express';
import { fetchAllMovies, stream, destroy } from './movie.controller';

const router = express.Router();

router.get('/', fetchAllMovies);
router.get('/stream/:path', stream);
router.delete('/:path', destroy);

export default router;
