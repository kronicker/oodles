/**
 * Created by toma on 14.10.16..
 */
const CookieAuth = require('hapi-auth-cookie');

const config = {
  clearInvalid: true,
  password: 'BorzinaITominaAplikacijaZaOodlanje'

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
