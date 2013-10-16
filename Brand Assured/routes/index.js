//ROUTES
var db = require("../database.js");
exports.products = {};

exports.index = function(req, res){
    db.products.find(function(err, products){
        var data = JSON.stringify(products);
        res.render("index", {
            appData: data
        });
    });
};

//retrieve products
exports.products.all = function(req,res){
    db.products.find(function(err, products){
        if(err) return;
        res.json(products);
    });
};

exports.products.one = function(req,res){
    var productId = db.ObjectId(req.params.id);
    db.products.findOne({"_id" : productId}, function(err, product){
        if(err) return;
        res.json(product);
    });
};

//add products
exports.products.create = function(req, res){
    res.json(req.body);
    db.products.save(req.body);
}