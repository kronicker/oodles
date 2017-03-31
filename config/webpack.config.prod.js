'use strict';

const path = require('path');
const baseConfig = require('./webpack.config.js');
const webpackMerge = require('webpack-merge');
const { optimize, DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const merge = webpackMerge({
  customizeArray(a, b, key) {
    // Overwrite entry
    if (key === 'entry') return b;
    // Overwrite plugins
    if (key === 'plugins') return b;
  }
});

module.exports = merge(baseConfig, {
  entry: [ 'bootstrap-loader', './client/main.js' ],
  plugins: [
    new DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../public/index.html'),
      template: path.resolve(__dirname, '../build/index_dev.html'),
      inject: true
    })
  ],
  devtool: '#source-map'
});
