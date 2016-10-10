'use strict';

function handleBoom(server) {
  server.ext('onPreResponse', (request, reply) => {
    let response = request.response;

    if (!response.isBoom) {
      return reply.continue();
    }

    // TODO: Add 4xx, 5xx error pages
    return reply(response);
  });
}

let boomErrors = {
  register: (server, options, next) => {
    handleBoom(server);
    next();
  }
};

boomErrors.register.attributes = {
  name: 'boomErrors'
};

module.exports = boomErrors;
