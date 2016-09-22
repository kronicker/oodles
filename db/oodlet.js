/**
 * Created by toma on 21.09.16..
 */
'use strict';

const thinky = require('./thinky');
const Thingy = require('./thingy');
const Oodler = require('./oodler');
const type = thinky.type;

const schema = {
    id: type.string(),
    date: type.date().default(new Date()),
    oodler: type.object().schema(Oodler.schema),
    thingies: [type.object().schema(Thingy.schema)],
    total: type.number()
};

module.exports = () => {
	var model = thinky.createModel("Oodlet", schema);

	model.schema = schema;

	return model;
}();