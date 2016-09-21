/**
 * Created by toma on 21.09.16..
 */
var thinky = require('thinky')();
var type = thinky.type;

var schema = {
    id: type.string(),
    name: type.string().min(1),
    price: type.number().min(0.01),
    unit: type.string(),
    pictureUrl: type.string()
};

function create() {
    thinky.createModel("Thingy", schema);
};

module.exports.schema = schema;
module.exports.create = create();