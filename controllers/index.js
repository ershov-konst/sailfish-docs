var
   Component = require("sailfish").Component,
   md = require("node-markdown").Markdown,
   path = require("path"),
   fs = require("fs");

/**
 * returns html
 * @param {String} url for example api/1
 * @param cb
 */
function getMarkup(url, cb){
   fs.readFile("./source/" + url + ".md", "utf8", function(e, text){
      if (e){
         cb(e);
      }
      else{
         cb(null, md(text));
      }
   });
}

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
      getMarkup(req.params.join("/"), function(e, txt){
         if (e){
            res.send(404);
         }
         else{
            res.send(txt)
         }
      });
   }
};