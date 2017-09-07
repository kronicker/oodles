const object = require('lodash/object');
const thinky = require('../db/thinky');
const type = thinky.type;
const Thingy = require('./thingy');
const Oodler = require('./oodler');
const Oodlet = require('./oodlet');

const schema = {
  id: type.string(),
  createdAt: type.date().default(() => new Date()),
  updatedAt: type.date().default(() => new Date()),
  orderedAt: type.date(),
  oodler: type.object().schema(Oodler.schema),
  quantifiedThingies: type.array(type.object().schema(object.merge(Thingy.schema, { qty: type.number() }))).default([]),
  oodletIds: type.array(type.string()).default([])
};

const indexes = ['orderedAt'];

const TotalOodlet = thinky.model('TotalOodlet', { schema, indexes }, {
  findActive() {
    return TotalOodlet
      .filter(row => row.hasFields('orderedAt').not());
  },
  finalize(id) {
    return TotalOodlet.get(id)
      .update({ orderedAt: new Date() }, { returnChanges: true })
      .then(result => Oodlet.finalize(result.oodletIds).then(() => result));
  }
});
module.exports = TotalOodlet;
