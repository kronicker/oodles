/**
 * Created by toma on 21.09.16..
 */
'use strict';

const thinky = require('../db/thinky');
const type = thinky.type;

const schema = {
  id: type.string(),
  firstName: type.string().min(2),
  lastName: type.string().min(2),
  email: type.string().email(),
  office: type.string().min(1)
};

module.exports = () => {
	var model = thinky.createModel("Oodler", schema);

	model.schema = schema;

	return model;
}();
