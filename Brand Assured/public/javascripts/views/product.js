define(["backbone", "handlebars", "jquery", "events"], function(Backbone, Handlebars, $, Events){
    var ProductView = Backbone.View.extend({
        events: {
            "click .baid": "singleProductLink"
        },
        tagName: "li",
        className: "product",
        render: function(){
            //use handlebars to compile the template
            var template = $("#productTemplate").html(); //maybe "#producttemplate"
            var compiled = Handlebars.compile(template);
            var html = compiled(this.model.attributes);
            this.$el.html(html);
            return this;
        },
        singleProductLink: function(e){
            e.preventDefault();
            var id = this.model.get("_id");
            var url = "product/" + id;
            Events.trigger("router:navigate", url); //defined in public/javascripts/router.js - initialize
        }
    });

    return ProductView;
});