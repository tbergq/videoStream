import express from 'express';
import { getSubtitles, downloadSubtitles } from './subtitles.controller';

const router = express.Router();

router.get('/', getSubtitles);
router.get('/download', downloadSubtitles);

export default router;
