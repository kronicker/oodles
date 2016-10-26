/**
 * Created by toma on 25.10.16..
 */
const good = require('good');
const object = require('lodash');

const MONITOR_PAYLOAD = process.env.MONITOR_PAYLOAD || false;

let payloadReporter =  [
  {
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{request: '*', response: '*'}]
  },
  {
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
  },
  {
    module: 'good-squeeze-pretty',
    args: [2]
  },
  'stdout'
];
let consoleReporter= [
  {
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{ log: '*', response: '*' }]
  },
  {
    module: 'good-console'
  },
  'stdout'
];

let config = {
  includes: {
    request: ['payload'],
    response: ['payload']
  }
};

let monitor = {
  register: (server, options, next) => {
    server.register({
      register: good,
      options: () => {
        if(MONITOR_PAYLOAD) {
          config = object.assign(config, {reporters: { consoleReporter, payloadReporter }});
          return config;
        }
        else {
          config = object.assign(config, {reporters: { consoleReporter }});
          return config;
        }
      },
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
