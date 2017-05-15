'use strict';

const baseConfig = require('./base');
const webpackMerge = require('webpack-merge');
const { optimize, NoEmitOnErrorsPlugin, DefinePlugin } = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback: 'style-loader'
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader!sass-loader',
        fallback: 'style-loader'
      }),
      exclude: /node_modules/
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        buble: {
          transforms: {
            dangerousForOf: true,
            modules: false
          }
        },
        loaders: {
          css: ExtractTextPlugin.extract('css-loader'),
          scss: ExtractTextPlugin.extract('css-loader!sass-loader'),
          sass: ExtractTextPlugin.extract('css-loader!sass-loader?indentedSyntax')
        }
      }
    }]
  },
  plugins: [
    new DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new ExtractTextPlugin('style.css'),
    new NoEmitOnErrorsPlugin(),
    new optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new optimize.AggressiveMergingPlugin()
  ],
  devtool: '#source-map'
});
