import express from 'express';
import createRoutes from './routes';

const app = express();

createRoutes(app);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3300, () => console.log('Example app listening on port 3300!'))