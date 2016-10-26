'use strict';
let routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: (request, reply) => {
        reply.file('./client/index.html');
      }
    }
  }
];

module.exports = routes;
