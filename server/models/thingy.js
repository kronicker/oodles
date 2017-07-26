const thinky = require('../db/thinky');
const { type } = thinky;

const schema = {
  id: type.string(),
  name: type.string().min(1),
  unit: type.string(),
  pictureUrl: type.string()
};

const model = thinky.createModel('Thingy', schema);
model.schema = schema;

module.exports = model;
