'use strict';

const baseConfig = require('./webpack.config.js');
const webpackMerge = require('webpack-merge');
const { optimize, DefinePlugin } = require('webpack');

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
    })
  ],
  devtool: '#source-map'
});
