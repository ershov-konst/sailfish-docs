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