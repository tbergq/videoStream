import express from 'express';
import { fetchAllMovies, stream } from './movie.controller';

const router = express.Router();

router.get('/', fetchAllMovies);
router.get('/stream/:path', stream);
/* router.get("/allMovies", controller.readAllMovies);

router.get("/subtitles/:path", controller.subtitles);
router.get("/show", controller.show);
router.delete("/:path", controller.destroy);
router.post("/convert/:path", controller.convert); */

export default router;
