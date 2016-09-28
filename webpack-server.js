'use strict';

let webpack = require("webpack");
let config = require("./webpack.config");
let WebpackDevServer = require("webpack-dev-server");
let path = require('path');

module.exports = (PORT) => {
  const server = new WebpackDevServer(webpack(config), {
    path: path.resolve(__dirname, './client/dist/'),
    publicPath: '/dist/',
    hot:true,
    proxy: {
      "**" : `http://localhost:${PORT - 1}`
    }
  });

  server.listen(PORT, 'localhost', function() {
    console.log(`Webpack dev server listening on http://localhost:${PORT}`);
  });
};
