'use strict';

const CookieAuth = require('hapi-auth-cookie');

const config = {
  password: 'BorzinaITominaAplikacijaZaOodlanje',
  cookie: 'oodles-cookie',
  isSecure: false,
  ttl: 24 * 60 * 60 * 1000 //1 day
};

let sessionStrategy = {
  register: (server, options, next) => {
    server.register(CookieAuth, err => {
      if (err) {
        console.log('error', 'failed to install auth plugin');
        throw err;
      }

      server.auth.strategy('session', 'cookie', config);
      server.auth.default({
        strategy: 'session',
        scope: 'user'
      });
    });
    next();
  }
};

sessionStrategy.register.attributes = {
  name: 'sessionStrategy'
};

module.exports = sessionStrategy;
