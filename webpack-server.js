'use strict';

const webpack = require("webpack");
const config = require("./webpack.config");
const WebpackDevServer = require("webpack-dev-server");

module.exports = (PORT) => {
  const server = new WebpackDevServer(webpack(config), {
    path: config.output.path,
    publicPath: config.output.publicPath,
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
