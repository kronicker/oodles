/**
 * Created by toma on 03.11.16..
 */
const bcrypt = require('bcrypt');

let config = {
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOSTNAME
  },

  database: {
    name: 'oodles',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    devsAccounts: [{
      firstName: 'Toma',
      lastName: 'Zelic',
      email: 'toma@extensionengine.com',
      password: bcrypt.hashSync('password', 10),
      scope: 'admin',
      office: 'C7'
    }, {
      firstName: 'Ante',
      lastName: 'Borzic',
      email: 'aborzic@extensionengine.com',
      password: bcrypt.hashSync('password', 10),
      scope: 'admin',
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
      domain: 'mailgun.ee-oodles.me'
    }
  }
};

module.exports = config;
