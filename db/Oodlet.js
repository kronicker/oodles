/**
 * Created by toma on 21.09.16..
 */
var thinky = require('thinky')();
var type = thinky.type;
var Thingy = require('./Thingy');
var Oodler = require('./Oodler');

var schema = {
    id: type.string(),
    date: type.date().default(r.now()),
    oodler: type.object().schema(Oodler.schema),
    thingies: [type.object().schema(Thingy.schema)],
    total: type.number()
});

function create() {
    thinky.createModel("Oodlet", schema);
};

module.exports.schema = schema;
module.exports.create = create();