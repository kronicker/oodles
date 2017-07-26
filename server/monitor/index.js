const good = require('good');
const MONITOR_PAYLOAD = process.env.MONITOR_PAYLOAD || false;

const consoleReporter = require('./consoleReporter');
const payloadReporter = require('./payloadReporter');

const reporters = { consoleReporter };
if (MONITOR_PAYLOAD) {
  reporters.payloadReporter = payloadReporter;
}

exports.register = (server, options, next) => {
  server.register({
    register: good,
    options: {
      includes: {
        request: ['payload'],
        response: ['payload']
      },
      reporters
    }
  }, err => {
    if (err) {
      throw err;
    }
  });
  next();
};

exports.register.attributes = {
  name: 'monitor'
};
