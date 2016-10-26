/**
 * Created by toma on 26.10.16..
 */
let consoleReporter = [
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

module.exports = consoleReporter;
