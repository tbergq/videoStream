// @flow

const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'apps', 'server', 'dist'),
  JS: path.resolve(__dirname, 'apps', 'frontend', 'pages'),
};
// Webpack configuration
module.exports = {
  entry: {
    movies: ['@babel/polyfill', path.join(paths.JS, 'index.js')],
    'movie-player': ['@babel/polyfill', path.join(paths.JS, 'movie-player.js')],
  },
  output: {
    path: paths.DIST,
    filename: '[name].bundle.js',
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'production'",
      },
    }),
  ],
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
