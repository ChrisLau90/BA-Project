$(function(){
    window.router = new AppRouter();
    Backbone.history.start(); //track url changes
});