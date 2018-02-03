import express from 'express';
import { fetchAllMovies, stream, destroy } from './movie.controller';

const router = express.Router();

router.get('/', fetchAllMovies);
router.get('/stream/:path', stream);
router.delete("/:path", destroy);
/* router.get("/allMovies", controller.readAllMovies);

router.get("/subtitles/:path", controller.subtitles);
router.get("/show", controller.show);
router.post("/convert/:path", controller.convert); */

export default router;
