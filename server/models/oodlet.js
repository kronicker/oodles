/**
 * Created by toma on 21.09.16..
 */
'use strict';

const object = require('lodash/object');
const thinky = require('../db/thinky');
const Thingy = require('./thingy');
const Oodler = require('./oodler');
const type = thinky.type;
const dbConfig = require('../config').database;

const schema = {
  id: type.string(),
  createdAt: type.date().default(() => new Date()),
  updatedAt: type.date().default(() => new Date()),
  dueDate: type.date().default(() => dbConfig.defaultOodletDueDate),
  oodler: type.object().schema(Oodler.schema),
  quantifiedThingies: [type.object().schema(object.merge(Thingy.schema, { qty: type.number() }))]
};

module.exports = (() => {
  var model = thinky.createModel("Oodlet", schema);

  model.ensureIndex('dueDate');
  model.schema = schema;

  return model;
})();
