const path = require('path');

let routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: (request, reply) => {
        reply.file('./dist/index.html');
      }
    }
  },
  {
    method: 'GET',
    path: '/{filepath*}',
    config: {
      auth: false,
      handler: {
        directory: {
          path: path.resolve(__dirname, '../../dist'),
          listing: false,
          index: false
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/assets/{filepath*}',
    config: {
      auth: false,
      handler: {
        directory: {
          path: path.resolve(__dirname, '../../dist/assets'),
          listing: false,
          index: false
        }
      }
    }
  }
];

module.exports = routes;
