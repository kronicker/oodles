/**
 * Created by toma on 25.10.16..
 */
const good = require('good');

const config = {
  includes: {
    request: ['payload'],
    response: ['payload']
  },
  reporters: {
    consoleReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{
        log: '*',
        response: '*'
      }]
    }, {
      module: 'good-console'
    }, 'stdout'],

    fileReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ request: '*', response: '*' }]
    },
    {
      module: 'good-squeeze',
      name: 'SafeJson',
    },{
      module: 'good-squeeze-pretty',
      args: [2]
    }, 'stdout'],
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
