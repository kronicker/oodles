'use strict';

const webpack = require("webpack");
const config = require("./webpack.config");
const WebpackDevServer = require("webpack-dev-server");
const path = require('path');

module.exports = (PORT) => {
  const server = new WebpackDevServer(webpack(config), {
    path: path.resolve(__dirname, './client/dist/'),
    publicPath: '/dist/',
    hot: true,
    proxy: {
      "**" : `http://localhost:${PORT - 1}`
    },
    noInfo: true,
  });

  server.listen(PORT, 'localhost', function() {
    console.log(`Webpack dev server listening on http://localhost:${PORT}`);
  });
};
