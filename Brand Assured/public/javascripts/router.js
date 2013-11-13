define(["backbone", "events", "collections/product", "views/productCollection", "views/detailedProduct"],
function(Backbone, Events, ProductCollection, ProductCollectionView, DetailedProductView){
    var Router = Backbone.Router.extend({
        initialize: function(){
            var self = this;
            this._setupCollection();
            Events.on("router:navigate", function(url){
                self.navigate(url, {trigger : true});
            })
        },
        routes:{
            "": "index",
            "product/:id": "singleProduct"
        },
        _setupCollection: function(){
            if(this.collection) return;
            var data = $("#initialContent").html();
            this.collection = new ProductCollection(JSON.parse(data));
        },
        _renderView: function(view){
            $(".app").html(view.render().el);
        },
        index: function(){
            var view = new ProductCollectionView({collection: this.collection});
            this._renderView(view);
        },
        singleProduct: function(id){
            var product = this.collection.get(id);
            var view = new DetailedProductView({model: product});
            this._renderView(view);
        }
    });
    return Router;
});