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

function *generateOodlers(quantity) {
  console.log(`Generating ${quantity} Oodlers...`);

  // Save devs to db
  for (let i = 0; i < dbConfig.devsAccounts.length; i++) {
    yield Oodler(dbConfig.devsAccounts[i]).save();
  }

  for (let i = 0; i < quantity; i++) {
    yield Oodler({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync(dbConfig.defaultOodlerPassword, dbConfig.defaultBcryptRounds),
      scope: 'user',
      office: faker.random.word().toUpperCase().slice(-1) + faker.random.number(10)
    })
    .save();
  }
}

function* generateThingies(quantity) {
  console.log(`Generating ${quantity} quantifiedThingies...`);

  for (let i = 0; i < quantity; i++) {
    yield Thingy({
      name: faker.commerce.product(),
      unit: ['kg', 'kom'][Math.floor(Math.random() * 2)],
      pictureUrl: 'https://placeimg.com/240/200/any'
    })
    .save();
  }
}


function generateOodlets(quantity, oodlers, quantifiedThingies) {
  console.log(`Generating ${quantity} Oodlets...`);

  for (let i = 0; i < quantity; i++) {
    let createDate = moment().subtract(2*i, 'weeks').toDate();

    Oodlet({
      createdAt: createDate,
      updatedAt: createDate,
      dueDate: moment(createDate).add(2, 'weeks').toDate(),
      oodler: oodlers[Math.floor(Math.random() * oodlers.length)],
      quantifiedThingies: quantifiedThingies
    })
    .save();
  }
}

module.exports = () => {

  console.log('Started seeding');

  Promise.all([...generateOodlers(seedsQuantity), ...generateThingies(seedsQuantity)])
    .then(values => {
      let oodlers = collection.filter(values, val => val.email);
      let quantifiedThingies = collection.filter(values, val => val.name);

      collection.forEach(quantifiedThingies, thingy => object.merge(thingy, { qty: faker.random.number({ 'min': 1,'max': 30 })}));

      generateOodlets(seedsQuantity, oodlers, quantifiedThingies);
    });
};


