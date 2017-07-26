const object = require('lodash/object');
const thinky = require('../db/thinky');
const { type } = thinky;
const Thingy = require('./thingy');
const Oodler = require('./oodler');

const schema = {
  id: type.string(),
  createdAt: type.date().default(() => new Date()),
  updatedAt: type.date().default(() => new Date()),
  orderedAt: type.date(),
  oodler: type.object().schema(Oodler.schema),
  quantifiedThingies: type.array(type.object().schema(object.merge(Thingy.schema, { qty: type.number() }))).default([]),
  oodletIds: type.array(type.string()).default([])
};

const model = thinky.createModel('TotalOodlet', schema);
model.ensureIndex('orderedAt');
model.schema = schema;

module.exports = model;
