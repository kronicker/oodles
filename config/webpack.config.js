'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['bootstrap-loader', 'webpack-hot-middleware/client', './client/main.js'],
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
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports?jQuery=jquery'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url?limit=10000'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file'
      },
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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
