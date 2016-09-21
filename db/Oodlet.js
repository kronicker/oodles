/**
 * Created by toma on 21.09.16..
 */
const thinky = require('thinky')();
const type = thinky.type;
const Thingy = require('./Thingy');
const Oodler = require('./Oodler');

const schema = {
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