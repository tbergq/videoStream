import express from "express";
import { fetchAllMovies } from "./movie.controller";

let router = express.Router();

router.get("/", fetchAllMovies);
/* router.get("/allMovies", controller.readAllMovies);
router.get("/stream/:path", controller.stream);
router.get("/subtitles/:path", controller.subtitles);
router.get("/show", controller.show);
router.delete("/:path", controller.destroy);
router.post("/convert/:path", controller.convert); */

export default router;
