import express from 'express';
import morgan from 'morgan';

import createRoutes from './routes';

const port = process.env.PORT || 3300;
const app = express();

app.use(morgan('dev'));
createRoutes(app);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); // eslint-disable-line
