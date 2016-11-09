/**
 * Created by toma on 08.11.16..
 */
const object = require('lodash/object');
const thinky = require('../db/thinky');
const type = thinky.type;
const Thingy = require('./thingy');
const Oodler = require('./oodler');

const schema = {
  id: type.string(),
  createdAt: type.date().default(() => new Date()),
  updatedAt: type.date().default(() => new Date()),
  orderedAt: type.date(),
  oodler: type.object().schema(Oodler.schema),
  quantifiedThingies: [type.object().schema(object.merge(Thingy.schema, { qty: type.number() }))],
  oodlets: type.array(type.string())
};

module.exports = (() => {
  var model = thinky.createModel("TotalOodlet", schema);
  
  model.ensureIndex('orderedAt');
  model.schema = schema;
  
  return model;
})();
