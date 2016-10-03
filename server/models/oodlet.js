/**
 * Created by toma on 21.09.16..
 */
'use strict';

const object = require('lodash/object');
const thinky = require('../db/thinky');
const Thingy = require('./thingy');
const Oodler = require('./oodler');
const type = thinky.type;

const schema = {
  id: type.string(),
  createdAt: type.date().default(new Date()),
  updatedAt: type.date().default(new Date()),
  dueDate: type.date().default(new Date() + 60*60*24*7*1000),
  oodler: type.object().schema(Oodler.schema),
  thingies: [type.object().schema(object.merge(Thingy.schema, { qty: type.number() }))]
};

module.exports = () => {
  var model = thinky.createModel("Oodlet", schema);

  model.schema = schema;

  return model;
}
();
