'use strict';

module.exports = function(server) {
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.file('./client/index.html');
    }
  });
};
