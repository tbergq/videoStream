const path = require('path');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  JS: path.resolve(__dirname, 'frontend/pages'),
};
// Webpack configuration
module.exports = {
  entry: {
    movies: ['babel-polyfill', path.join(paths.JS, 'index.js')],
    'movie-player': ['babel-polyfill', path.join(paths.JS, 'movie-player.js')],
  },
  output: {
    path: paths.DIST,
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
};

