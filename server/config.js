/**
 * Created by toma on 03.11.16..
 */
let config = {
  auth: {
    password: 'BorzinaITominaAplikacijaZaOodlanje',
    cookie: 'oodles-cookie',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000 //1 day
  },
  dbName: 'oodles',
  devsAccounts: [{
      firstName: 'Toma',
      lastName: 'Zelic',
      email: 'toma@extensionengine.com',
      password: 'password',
      scope: 'user',
      office: 'C7'
    },{
      firstName: 'Ante',
      lastName: 'Borzic',
      email: 'aborzic@extensionengine.com',
      password: 'password',
      scope: 'user',
      office: 'C7'
  }],
  mailgun: {
    apiKey: 'key-73db2b70c2c5fda574df5e2fd938504f',
    domain: 'sandbox629530a6164643d28eb2f1767607d8db.mailgun.org'
  }
};

module.exports = config;
