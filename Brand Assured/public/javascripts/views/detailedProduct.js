define(["backbone", "handlebars"], function(Backbone, Handlebars){
    var DetailedProductView = Backbone.View.extend({
        render: function(){
            var template = $("#detailedProductTemplate").html();
            var compiled = Handlebars.compile(template);
            var html = compiled(this.model.attributes);
            this.$el.html(html);
            return this;
        }
    });
    return DetailedProductView;
});