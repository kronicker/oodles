/**
 * Created by toma on 03.11.16..
 */
let config = {
  server: {
    port: 3000,
    host: 'localhost'
  },

  database: {
    name: 'oodles',
    devsAccounts: [{
      firstName: 'Toma',
      lastName: 'Zelic',
      email: 'toma@extensionengine.com',
      password: 'password',
      scope: 'user',
      office: 'C7'
    }, {
      firstName: 'Ante',
      lastName: 'Borzic',
      email: 'aborzic@extensionengine.com',
      password: 'password',
      scope: 'user',
      office: 'C7'
    }],
    defaultOodletDueDate: new Date(Date.now() + 60*60*24*7*1000),
    defaultOodlerPassword: 'password',
    defaultBcryptRounds: 10
  },

  auth: {
    //TODO: Remove password from config file and fetch it from ENV
    password: 'BorzinaITominaAplikacijaZaOodlanje',
    cookie: 'oodles-cookie',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000 //1 day
  },

  mailgun: {
    options: {
      apiKey: 'key-73db2b70c2c5fda574df5e2fd938504f',
      domain: 'sandbox629530a6164643d28eb2f1767607d8db.mailgun.org'
    }
  }
};

module.exports = config;
