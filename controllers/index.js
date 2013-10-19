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

function sendRes(req, res){
   getMarkup(req.originalUrl, function(e, txt){
      if (e){
         res.send(404);
      }
      else{
         res.render("main", {
            title : "sailfish.js",
            content : new Component("docs.DocPage", {
               activeLink: req.originalUrl,
               markdown: txt
            })
         });
      }
   });
}

module.exports = {
   index : function(req, res){
      res.render("main", {
         title : "sailfish.js",
         content : new Component("docs.DocPage")
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
   },
   api: sendRes,
   qs: sendRes,
   docs: sendRes
};