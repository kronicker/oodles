'use strict';

const path = require('path');
const baseConfig = require('./base');
const webpackMerge = require('webpack-merge');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = webpackMerge(baseConfig, {
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          css: 'style-loader!css-loader',
          scss: 'style-loader!css-loader!sass-loader',
          sass: 'style-loader!css-loader!sass-loader?indentedSyntax'
        }
      }
    }]
  },
  plugins: [
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, '../../dist'),
    hot: true,
    port: 7000,
    proxy: {
      '/': `http://localhost:${port}`
    }
  },
  devtool: '#eval-source-map'
});
