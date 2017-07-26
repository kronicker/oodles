const consoleReporter = [{
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{ log: '*', response: '*' }]
  }, {
    module: 'good-console'
  },
  'stdout'
];

module.exports = consoleReporter;
