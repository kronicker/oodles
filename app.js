'use strict';
const config = require('./server/config');

const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server();
server.connection({
  port: config.server.port
});


// Plugins
const db = require('./server/db/');
const routes = require('./server/routes/');
const boomErrors = require('./server/extensions/boomErrors');
const monitor = require('./server/monitor');


server.register([Inert, db, boomErrors, routes, monitor], (err) => {

  server.start(function (err) {
    if (err) { throw err; }

    console.log(`Server running at: ${server.info.uri}`);
  });
});

module.exports = server;

