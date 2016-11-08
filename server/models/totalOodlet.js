/**
 * Created by toma on 08.11.16..
 */
const object = require('lodash/object');
const thinky = require('../db/thinky');
const Thingy = require('./thingy');
const Oodler = require('./oodler');
const type = thinky.type;

const schema = {
  id: type.string(),
  createdAt: type.date().default(() => new Date()),
  updatedAt: type.date().default(() => new Date()),
  orederedAt: type.date(),
  oodler: type.object().schema(Oodler.schema),
  quantifiedThingies: [type.object().schema(object.merge(Thingy.schema, { qty: type.number() }))],
  offices: type.array().schema(type.string())
};

module.exports = (() => {
  var model = thinky.createModel("totalOodlet", schema);
  
  model.ensureIndex('orederedAt');
  model.schema = schema;
  
  return model;
})();
