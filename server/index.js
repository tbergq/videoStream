import watcher from './utils/file-watcher';
import app from './app';

const port = process.env.PORT || 3300;

watcher();

app.listen(port, () => console.log(`Example app listening on port ${port}!`)); // eslint-disable-line
