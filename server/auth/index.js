'use strict';

const CookieAuth = require('hapi-auth-cookie');

const config = {
  clearInvalid: true,
  password: 'BorzinaITominaAplikacijaZaOodlanje',
  isSecure: false,
  ttl: 24 * 60 * 60 * 1000
};

let sessionStrategy = {
  register: (server, options, next) => {
    server.register(CookieAuth, err => {
      if (err) {
        console.log('error', 'failed to install auth plugin');
        throw err;
      }

      server.auth.strategy('session', 'cookie', true, config);
    });
    next();
  }
};

sessionStrategy.register.attributes = {
  name: 'sessionStrategy'
};

module.exports = sessionStrategy;
