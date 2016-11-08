'use strict';

const CookieAuth = require('hapi-auth-cookie');
const config = require('../config').auth;

let sessionStrategy = {
  register: (server, options, next) => {
    server.register(CookieAuth, err => {
      if (err) {
        console.log('error', 'failed to install auth plugin');
        throw err;
      }

      server.auth.strategy('session', 'cookie', config);
      server.auth.default({
        strategy: 'session'
      });
    });
    next();
  }
};

sessionStrategy.register.attributes = {
  name: 'sessionStrategy'
};

module.exports = sessionStrategy;
