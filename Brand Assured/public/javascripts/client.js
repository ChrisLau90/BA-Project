var Product = Backbone.Model.extend({
    idAttribute: "_id"
});

var ProductCollection = Backbone.Collection.extend({
    model: Product,
    url: "/products"
});

var ProductView = Backbone.View.extend({
    events: {
        "click .baid": "singleProductLink"
    },
    tagName: "li",
    className: "product",
    render: function(){
        //render the HTML of a single product
        var template = $("#productTemplate").html();
        var compiled = Handlebars.compile(template);
        var html = compiled(this.model.attributes);
        this.$el.html(html);

        return this; //returns the rendered element (not as HTML)
    },
    singleProductLink: function(e){
        e.preventDefault();
        var mongoId = this.model.get("_id");
        router.navigate("product/" + mongoId, {trigger: true});
    }
});

var DetailedProductView = Backbone.View.extend({
    render: function(){
        //render the HTML of a single product
        var template = $("#detailedProductTemplate").html();
        var compiled = Handlebars.compile(template);
        var html = compiled(this.model.attributes);
        this.$el.html(html);
        return this;
    }
});

var ProductCollectionView = Backbone.View.extend({
    initialize: function(){
        //listen to the collection. when the "reset" event is fired call this.render
        this.listenTo(this.collection, "reset", this.render);
    },
    tagName: "ul",
    className: "products",
    render: function(){
        this.$el.html(""); //reset the html
        this.collection.each(function(product){
            var productView = new ProductView({ model: product });
            this.$el.append(productView.render().el) //append the rendered HTML of the product to the "ul"(?)
        }, this); //"this" sets the scope of the function

        return this;
    }
});

var AppRouter = Backbone.Router.extend({
    initialize: function(){
        this._setupCollection();
    },
    routes: {
        //hash of all the routes
        "": "index", //empty string denotes default route (no slash)
        "product/:id" : "singleProduct"
    },
    _setupCollection : function(){
        if(this.collection)return;                  //if we have a collection don't do anything
        var data = $("#initialContent").html();     //else grab the data we need to be in the collection
        this.collection = new ProductCollection(JSON.parse(data));  //else set it to be a new collection
    },
    _renderView: function(view){
        $(".app").html(view.render().el); //refs div.app in index.jade
    },
    index: function(){
        var view = new ProductCollectionView({ collection: this.collection });
        this._renderView(view);
    },
    singleProduct: function(id){
        console.log("singleProduct Method " + id);
        var product = this.collection.get(id);
        var view = new DetailedProductView({ model: product });
        this._renderView(view);
    }
});