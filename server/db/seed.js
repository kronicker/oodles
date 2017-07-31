const bcrypt = require('bcrypt');
const faker = require('faker');
const moment = require('moment');
const pick = require('lodash/pick');
const times = require('lodash/times');
const uniqueString = require('unique-string');

const dbConfig = require('../config').database;
const Oodler = require('../models/oodler');
const Oodlet = require('../models/oodlet');
const Thingy = require('../models/thingy');

const seedsQuantity = process.env.DB_SEED_QTY || 10;

/* eslint-disable no-console */
function *generateOodlers(qty) {
  console.log(`Generating ${qty} Oodlers...`);

  yield* dbConfig.devsAccounts.map(dev => new Oodler(dev).save()); // Save devs to db

  yield* times(qty, () => {
    const oodler = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: bcrypt.hashSync(dbConfig.defaultOodlerPassword, dbConfig.defaultBcryptRounds),
      scope: 'user',
      office: faker.random.word().toUpperCase().slice(-1) + faker.random.number(10)
    };
    oodler.email = `${oodler.firstName}.${oodler.lastName}@mail.com`.toLowerCase();

    return new Oodler(oodler).save();
  });
}

function *generateThingies(qty) {
  console.log(`Generating ${qty} quantifiedThingies...`);

  yield* times(qty, () => new Thingy({
      name: faker.commerce.product(),
      unit: ['kg', 'kom'][Math.floor(Math.random() * 2)],
      pictureUrl: `http://lorempixel.com/240/200/food?something=${uniqueString()}`
    }).save());
}

function *generateOodlets(qty, oodlers, quantifiedThingies) {
  console.log(`Generating ${qty} Oodlets...`);

  yield* times(qty, index => {
    const createDate = moment().subtract(2 * index, 'weeks').toDate();
    const oodlet = {
      createdAt: createDate,
      updatedAt: createDate,
      dueDate: moment(createDate).add(2, 'weeks').toDate(),
      oodler: oodlers[Math.floor(Math.random() * oodlers.length)],
      quantifiedThingies
    };

    return new Oodlet(oodlet).save();
  });
}
/* eslint-disable */

function seedDatabase() {
  console.log('Started seeding');

  return Promise.all([...generateOodlers(seedsQuantity), ...generateThingies(seedsQuantity)])
    .then(values => {
      let oodlers = values
        .filter(val => val.email)
        .filter(oodler => oodler.scope !== 'admin')
        .map(oodler => pick(oodler, ['firstName', 'lastName', 'office', 'email', 'id']));
      let quantifiedThingies = values
        .filter(val => val.name)
        .map(thingy => Object.assign(thingy, {
          qty: faker.random.number({ 'min': 1,'max': 30 })
        }));

      return Promise.all(generateOodlets(seedsQuantity, oodlers, quantifiedThingies));
    });
}

module.exports = seedDatabase;
