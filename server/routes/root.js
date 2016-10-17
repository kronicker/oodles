'use strict';

module.exports = function(server) {
  server.route({
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: (request, reply) => {
        reply.file('./client/index.html');
      }
    }
  });
};
