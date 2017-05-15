'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const projectPath = path.resolve(__dirname, '../../');
const distPath = path.resolve(projectPath, './dist/');
const clientPath = path.resolve(projectPath, './client/');

module.exports = {
  entry: [
    'bootstrap-loader',
    './client/main.js'
  ],
  output: {
    filename: 'build.js',
    path: distPath
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'client': clientPath,
      'components': path.resolve(clientPath, './components/'),
      'vue': 'vue/dist/vue.common.js'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'buble-loader',
      exclude: /node_modules/,
      options: {
        transforms: {
          dangerousForOf: true,
          modules: false
        }
      }
    }, {
      test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
      loader: 'imports-loader?jQuery=jquery'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.(woff2?|svg)$/,
      loader: 'url-loader',
      options: { limit: 10000 }
    }, {
      test: /\.(ttf|eot)$/,
      loader: 'file-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(distPath, './index.html'),
      template: path.resolve(clientPath, './index.html'),
      inject: true
    }),
    new CopyWebpackPlugin([{
      from: 'client/assets', to: 'assets'
    }])
  ]
};
