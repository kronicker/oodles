'use strict';

const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({
  port: 3333
});


// Plugins
const db = require('./server/db/');
const routes = require('./server/routes/');
const boomErrors = require('./server/extensions/boomErrors');
const monitor = require('./server/monitor');

if (process.env.NODE_ENV !== 'production') {
  
  const WebpackConfig = require('./config/webpack.config.js'); // Webpack config
  const HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware');
  const HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware');
  
  server.register([{
    register: HapiWebpackDevMiddleware,
    options: {
      config: WebpackConfig,
      options: {
        noInfo: true,
        publicPath: WebpackConfig.output.publicPath,
        stats: {
          colors: true
        }
      }
    }
  }, {
    register: HapiWebpackHotMiddleware
  },
  ], function (err) {
    if (err) {
      throw err;
    }
  });
  
}

server.register([Inert, db, boomErrors, routes, monitor], (err) => {

  server.start(function (err) {
    if (err) { throw err; }

    console.log(`Server running at : ${server.info.uri}`);
  });
});

module.exports = server;

