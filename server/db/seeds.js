'use strict';
const faker = require('faker');
const object = require('lodash/object');
const moment = require('moment');
let Thingy = require('../models/thingy');
let Oodler = require('../models/oodler');
let Oodlet = require('../models/oodlet');
let bcrypt = require('bcrypt');

function generateOodlers(quantity, callback) {
  console.log(`Generating ${quantity} Oodlers...`);

  let oodlers = [];

  for (let i = 0; i < quantity; i++) {
    Oodler({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync('password', 10),
      scope: 'user',
      office: faker.random.word().toUpperCase().slice(-1) + faker.random.number(10)
    })
    .save()
    .then(oodler => {
      oodlers.push(oodler);
      if(i+1 === quantity){ callback(oodlers); }
    });
  }
}

function generateQuantifiedThingies(quantity, callback) {
  console.log(`Generating ${quantity} quantifiedThingies...`);

  let quantifiedThingies = [];

  for (let i = 0; i < quantity; i++) {
    Thingy({
      name: faker.commerce.product(),
      price: faker.commerce.price(60),
      unit: ['kg', 'kom'][Math.floor(Math.random() * 2)],
      pictureUrl: 'https://placeimg.com/240/200/any'
    })
    .save()
    .then(thingy => {
      quantifiedThingies.push(object.merge(thingy, { qty: faker.random.number({ 'min': 1,'max': 30 })}));
      if(i+1 === quantity){ callback(quantifiedThingies); }
    });
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
      quantifiedThingies: quantifiedThingies,
      total: faker.random.number(10)
    })
    .save();
  }
}

module.exports = () => {

  console.log('Started seeding');

  generateOodlers(10, oodlers => {
    generateQuantifiedThingies(10, (quantifiedThingies) => {
      generateOodlets(10, oodlers, quantifiedThingies);
    });
  });
};


