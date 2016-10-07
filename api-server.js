'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const db = require('./server/db/');
const server = new Hapi.Server();

module.exports = PORT => {
  server.connection({ port: PORT });

  // Add all routes
  require('./server/routes')(server);

  // Error handling
  server.ext('onPreResponse', (request, reply) => {
    let response = request.response;

    if (!response.isBoom) {
      return reply.continue();
    }

    // TODO: Add 4xx, 5xx error pages
    return reply(response);
  });


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

