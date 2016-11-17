'use strict';
const path = require('path');

let routes = [
  {
    method: 'GET',
    path: '/',
    config: {
      auth: false,
      handler: (request, reply) => {
        reply.file('./public/index.html');
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
          path: path.resolve(__dirname, '../../public'),
          listing: false,
          index: false
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/build/{filepath*}',
    config: {
      auth: false,
      handler: {
        directory: {
          path: path.resolve(__dirname, '../../public/build'),
          listing: false,
          index: false
        }
      }
    }
  }
];

module.exports = routes;
