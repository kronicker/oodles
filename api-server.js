/**
 * Created by toma on 20.09.16..
 */
'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const db = require('./db/db');
const server = new Hapi.Server();

module.exports = (PORT) => {
  server.connection({ port: PORT });

  // Add all routes
  require('./routes/all')(server);

  server.register([Inert, db], (err) => {

    server.route({
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
        reply.file('./client/index.html');
      }
    });


    server.start(function (err) {
      if (err) { throw err; }

      console.log(`Server running at : ${server.info.uri}`);
    });
  });
};

