var dburl = "database1";
var collections = ["products"];

var db = require("mongojs").connect(dburl,collections);

//export db variable
module.exports = db;