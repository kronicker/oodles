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

    customPayloadReporter: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{ request: '*', response: '*' }]
    }, {
      module: 'white-out',
      args: [{
        password: 'remove',
        passwordRepeat: 'remove',
        event: 'remove',
        instance: 'remove',
        labels: 'remove',
        method: 'remove',
        path: 'remove',
        query: 'remove',
        responseTime: 'remove',
        statusCode: 'remove',
        pid: 'remove',
        httpVersion: 'remove',
        source: 'remove',
        route: 'remove',
        log: 'remove',
        config: 'remove',
      }]
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

let monitor = {
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

monitor.register.attributes = {
  name: 'monitor'
};

module.exports = monitor;
