var
   Component = require("sailfish").Component;

module.exports = {
   index : function(req, res){
      res.render("main", {
         title : "sailfish.js",
         content : new Component("docs.DocPage", {
            caption : "Hello world"
         })
      });
   },
   getMarkup: function(req, res){

   }
};






module.exports = {
   index: function(req, res){

   },
   edit: function(req, res){

   },
   del: function(req, res){

   }
};