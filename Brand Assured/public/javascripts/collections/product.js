define(["backbone", "models/product"], function(Backbone, Product){
    return Backbone.Collection.extend({
        model: Product,
        url: "/products"
    });
});