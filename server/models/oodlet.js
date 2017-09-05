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
  orderedAt: type.date(),
  oodler: type.object().schema(Oodler.schema),
  quantifiedThingies: type.array(type.object().schema(object.merge(Thingy.schema, { qty: type.number() }))).default([])
};

const Oodlet = thinky.model('Oodlet', { schema }, {
  findActive(office) {
    return Oodlet
      .filter({ oodler: { office } })
      .filter(row => row('dueDate').gt(new Date()));
  },
  findPending() {
    return Oodlet
      .filter(row => row('dueDate').lt(new Date())
        .and(row.hasFields('orderedAt').not()));
  },
  finalize(ids) {
    return Oodlet
      .filter(row => row.expr(ids).contains(row('id')))
      .update({ orderedAt: new Date() });
  }
});
Oodlet.ensureIndex('dueDate');
module.exports = Oodlet;
