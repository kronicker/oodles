/**
 * Created by toma on 21.09.16.
 */
'use strict';

const thinky = require('../db/thinky');
const type = thinky.type;

const schema = {
  id: type.string(),
  name: type.string().min(1),
  unit: type.string(),
  pictureUrl: type.string()
};

module.exports = (() => {
  var model = thinky.createModel("Thingy", schema);

  model.schema = schema;

  return model;
})();
