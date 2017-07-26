const CookieAuth = require('hapi-auth-cookie');
const config = require('../config').auth;

exports.register = (server, options, next) => {
  server.register(CookieAuth, err => {
    if (err) {
      throw err;
    }

    server.auth.strategy('session', 'cookie', config);
    server.auth.default({
      strategy: 'session',
      scope: ['admin']
    });
  });
  next();
};

exports.register.attributes = {
  name: 'sessionStrategy'
};
