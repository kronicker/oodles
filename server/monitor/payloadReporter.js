/**
 * Created by toma on 26.10.16..
 */
let payloadReporter = [
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

module.exports = payloadReporter;
