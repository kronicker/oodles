const thinky = require('../db/thinky');
const { type } = thinky;

const Oodler = require('./oodler');

const schema = {
  id: type.string(),
  name: type.string().min(1),
  unit: type.string(),
  pictureUrl: type.string(),
  suggestedBy: type.object().schema(Oodler.schema)
};

const model = thinky.createModel('SuggestedThingy', schema);
model.schema = schema;

module.exports = model;
