'use strict';
const faker = require('faker');
let Thingy = require('../models/thingy');
let Oodler = require('../models/oodler');
let Oodlet = require('../models/oodlet');

function generateOodlers(quantity, callback) {
  console.log(`Generating ${quantity} Oodlers...`);

  let oodlers = [];

  for (let i = 0; i < quantity; i++) {
    Oodler({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      office: faker.random.word().toUpperCase().slice(-1) + faker.random.number(10)
    })
    .save()
    .then((oodler) => {
      oodlers.push(oodler);
      if(i+1 === quantity){ callback(oodlers); }
    });
  }
}

function generateThingies(quantity, callback) {
  console.log(`Generating ${quantity} Thingies...`);

  let thingies = [];

  for (let i = 0; i < quantity; i++) {
    Thingy({
      name: faker.commerce.product(),
      price: faker.commerce.price(),
      unit: ['kg', 'kom'][Math.floor(Math.random() * 2)],
      pictureUrl: 'https://unsplash.it/40/40?random'
    })
    .save()
    .then((thingy) => {
      thingies.push({ thingy, qty: faker.random.number() });
      if(i+1 === quantity){ callback(thingies); }
    });
  }
}


function generateOodlets(quantity, oodlers, thingies) {
  console.log(`Generating ${quantity} Oodlets...`);

  for (let i = 0; i < quantity; i++) {
    Oodlet({
      date: faker.date.future(),
      oodler: oodlers[Math.floor(Math.random() * oodlers.length)],
      thingies: thingies,
      total: faker.random.number(10)
    })
    .save();
  }
}

module.exports = () => {
  // Only seed if explicitly stated
  if (process.env.SEED !== 'true'){ return true; }

  console.log('Started seeding');

  generateOodlers(10, (oodlers) => {
    generateThingies(10, (thingies) => {
      generateOodlets(10, oodlers, thingies);
    });
  });
};


