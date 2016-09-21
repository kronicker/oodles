var thinky = require('thinky')();
var type = thinky.type;

var oodlerSchema={
    id: type.string(),
    firstName: type.string().min(2),
    lastName: type.string().min(2),
    email: type.string().email(),
    office: type.string().min(1)
};

var thingySchema={
    id: type.string(),
    name: type.string().min(1),
    price: type.number().min(0.01),
    unit: type.string(),
    pictureUrl: type.string()
};

var Oodler = thinky.createModel("Oodler", oodlerSchema);

var Thingy = thinky.createModel("Thingy", thingySchema);

var Oodlet = thinky.createModel("Oodlet", {
    id: type.string(),
    date: type.date().default(r.now()),
    oodler: type.object().schema(oodlerSchema),
    thingies: [type.object().schema(thingySchema)],
    total: type.number()
});
