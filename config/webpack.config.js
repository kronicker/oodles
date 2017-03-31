'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } = require('webpack');

const bubleOptions = {
  transforms: {
    dangerousForOf: true,
    modules: false
  }
};

module.exports = {
  entry: [
    'bootstrap-loader',
    'webpack-hot-middleware/client',
    // application entry
    './client/main.js'
  ],
  output: {
    path: path.resolve(__dirname, '../public/'),
    publicPath: '/',
    filename: 'build/build.js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'client': path.resolve(__dirname, '../client'),
      'components': path.resolve(__dirname, '../clients/components'),
      'vue': 'vue/dist/vue'
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: { buble: bubleOptions }
    }, {
      test: /\.js$/,
      loader: 'buble-loader',
      exclude: /node_modules/,
      options: bubleOptions
    }, {
      test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
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
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../public/index.html'),
      template: path.resolve(__dirname, '../build/index_dev.html'),
      inject: true
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval'
};
