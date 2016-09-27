var webpack = require("webpack");
var config = require("./webpack.config");
var WebpackDevServer = require("webpack-dev-server");

module.exports = (PORT) => {
  console.log(config);
  const server = new WebpackDevServer(webpack(config), {
    proxy: {
      "*" : `http://localhost:${PORT - 1}`
    }
  });

  console.log(server);

  server.listen(PORT, 'localhost', function(a) {
    console.log(`Webpack dev server listening on http://localhost:${PORT}`);
  });
};
