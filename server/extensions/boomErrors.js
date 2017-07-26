function handleBoom(server) {
  server.ext('onPreResponse', (request, reply) => {
    const response = request.response;

    if (!response.isBoom) {
      return reply.continue();
    }

    // TODO: Add 4xx, 5xx error pages
    return reply(response);
  });
}

exports.register = (server, options, next) => {
  handleBoom(server);
  next();
};

exports.register.attributes = {
  name: 'boomErrors'
};
