import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import createRoutes from './routes';
import movieListController from './controllers/movie-list.controller';
import moviePlayerController from './controllers/movie-player.controller';

const app = express();

app.use(express.static('dist'));
app.use(morgan('dev'));
app.use(cors());
createRoutes(app);

app.get('/', movieListController);
app.get('/movie-player', moviePlayerController);

export default app;
