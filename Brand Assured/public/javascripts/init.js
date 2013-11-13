/*
define - From RequireJS
@param 1 - array of dependencies (the app.js module)
@param 2 - requirejs passes in the loaded modules into the callback function
 */
define(["app"], function(App){
    $(function(){
        App.start;
    });
});