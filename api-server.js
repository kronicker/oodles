'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const server = new Hapi.Server();

// Plugins
const db = require('./server/db/');
const routes = require('./server/routes/');
const boomErrors = require('./server/extensions/boomErrors');
const sessionAuth = require('./server/auth');

module.exports = PORT => {
  server.connection({ port: PORT });

  server.register([sessionAuth, Inert, db, routes, boomErrors], (err) => {

    server.start(function (err) {
      if (err) { throw err; }

      console.log(`Server running at : ${server.info.uri}`);
    });
  });
};

