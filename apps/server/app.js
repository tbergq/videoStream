// @flow

import express, { type $Request, type $Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import compression from 'compression';

import createRoutes from './routes';
import movieListController from './controllers/movie-list.controller';
import moviePlayerController from './controllers/movie-player.controller';

const app = express();

app.use(express.static('dist'));
app.use(morgan('dev'));
app.use(cors());
app.use(compression());
createRoutes(app);

app.get('/', movieListController);
app.get('/movie-player', moviePlayerController);
app.get('/favicon.ico', (req: $Request, res: $Response) => {
  res.sendFile(path.join(__dirname, './favicon.ico'));
});

export default app;
