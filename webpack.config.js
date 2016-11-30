//this file handles webpack for /app-src and /mock/home
require('es6-promise').polyfill();

var webpack = require('webpack');
var path = require('path');
const ROOT_PATH = path.resolve(__dirname);
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  entry: './app-src/app/app.jsx',
  output: {
    path: path.resolve(__dirname, "js"),
    publicPath: "js/",
    filename: "app.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?compact=false'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer-loader?{browsers:["last 2 version", "Explorer > 8"]}!sass'
      },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,  loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,   loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,   loader: 'url?limit=10000&minetype=image/svg+xml' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: ROOT_PATH,
    alias: {
        'app': 'app-src/app/',
        'shared': 'app-src/app/shared',
        'mock-data': 'mock/json',
        'utils': 'app-src/app/utils',
        'assets': 'app-src/assets'
    }
  }
}