/**
 * Created by toma on 25.10.16..
 */
const good = require('good');
const MONITOR_PAYLOAD = process.env.MONITOR_PAYLOAD || false;

const consoleReporter = require('./consoleReporter');
const payloadReporter = require('./payloadReporter');

function reporters() {
  let reporters = { consoleReporter: consoleReporter };

  if (MONITOR_PAYLOAD) { reporters.payloadReporter = payloadReporter; }

  return reporters;
}

let monitor = {
  register: (server, options, next) => {
    server.register({
      register: good,
      options: {
        includes: {
          request: ['payload'],
          response: ['payload']
        },
        reporters: reporters()
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
