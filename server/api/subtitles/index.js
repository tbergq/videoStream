import express from 'express';
import { getSubtitles } from './subtitles.controller';

const router = express.Router();

router.get('/', getSubtitles);

export default router;
