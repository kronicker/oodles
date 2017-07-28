const faker = require('faker');
const object = require('lodash/object');
const collection = require('lodash/collection');
const moment = require('moment');
const bcrypt = require('bcrypt');

const dbConfig = require('../config').database;
const Oodler = require('../models/oodler');
const Oodlet = require('../models/oodlet');
const Thingy = require('../models/thingy');

const seedsQuantity = process.env.DB_SEED_QTY || 10;

/* eslint-disable no-console */
function *generateOodlers(quantity) {
  console.log(`Generating ${quantity} Oodlers...`);

  yield* dbConfig.devsAccounts.map(dev => new Oodler(dev).save()); // Save devs to db

  for (let i = 0; i < quantity; i++) {
    const oodler = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: bcrypt.hashSync(dbConfig.defaultOodlerPassword, dbConfig.defaultBcryptRounds),
      scope: 'user',
      office: faker.random.word().toUpperCase().slice(-1) + faker.random.number(10)
    };
    oodler.email = `${faker.name.firstName()}.${faker.name.firstName()}`.toLowerCase();

    yield new Oodler(oodler).save();
  }
}

function *generateThingies(quantity) {
  console.log(`Generating ${quantity} quantifiedThingies...`);

  for (let i = 0; i < quantity; i++) {
    const thingy = {
      name: faker.commerce.product(),
      unit: ['kg', 'kom'][Math.floor(Math.random() * 2)],
      pictureUrl: 'https://placeimg.com/240/200/any'
    };

    yield new Thingy(thingy).save();
  }
}

function generateOodlets(quantity, oodlers, quantifiedThingies) {
  console.log(`Generating ${quantity} Oodlets...`);

  for (let i = 0; i < quantity; i++) {
    const createDate = moment().subtract(2 * i, 'weeks').toDate();
    const oodlet = {
      createdAt: createDate,
      updatedAt: createDate,
      dueDate: moment(createDate).add(2, 'weeks').toDate(),
      oodler: oodlers[Math.floor(Math.random() * oodlers.length)],
      quantifiedThingies
    };

    new Oodlet(oodlet).save();
  }
}
/* eslint-disable */

function seedDatabase() {
  console.log('Started seeding');

  return Promise.all([...generateOodlers(seedsQuantity), ...generateThingies(seedsQuantity)])
    .then(values => {
      let oodlers = collection.filter(values, val => val.email);
      let quantifiedThingies = collection.filter(values, val => val.name);

      collection.forEach(quantifiedThingies, thingy => object.merge(thingy, { qty: faker.random.number({ 'min': 1,'max': 30 })}));

      generateOodlets(seedsQuantity, oodlers, quantifiedThingies);
    });
}

module.exports = seedDatabase;
