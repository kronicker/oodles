/**
 * Created by toma on 25.10.16..
 */
const good = require('good');

const config = {
  includes: {
    request: ['headers', 'payload'],
    response: ['payload']
  },
  reporters: {
    consoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*' , request: '*'}]
      },
      {
        module: 'good-console'
      },
      'stdout'
    ]
  }
};

let logger = {
  register: (server, options, next) => {
    server.register({
      register: good,
      options: config,
    }, err => {
      if (err) {
        console.log('error', 'failed to install auth plugin');
        throw err;
      }
    });
    next();
  }
};

logger.register.attributes = {
  name: 'consoleLogger'
};

module.exports = logger;
