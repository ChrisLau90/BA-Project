define(["backbone", "views/product"], function(Backbone, ProductView){
    var ProductCollectionView = Backbone.View.extend({
        initialize: function(){
            this.listenTo(this.collection, "reset", this.render);
        },
        tagName: "ul",
        className: "products",
        render: function(){
            this.$el.html("");
            this.collection.each(function(product){
                var productView = new ProductView({model: product});
                this.$el.append(productView.render().el);
            }, this);
            return this;
        }
    });
    return ProductCollectionView;
});