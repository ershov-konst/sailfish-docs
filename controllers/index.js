var
   Component = require("sailfish").Component,
   marked = require("marked"),
   path = require("path"),
   fs = require("fs"),
   docs = require('../lib/docs'),
   dot = require('dot'),
   tplPath = path.resolve(__dirname, '../lib'),
   dotDef = {
      include: function(tpl){
         var result;

         try{
            result = fs.readFileSync(path.join(tplPath, tpl), 'utf8');
         }
         catch(e){
            result = e.message;
         }
         return result;
      }
   },
   markupCache = {};

dot.templateSettings.strip = false;

/**
 * returns html
 * @param {String} url for example api/1
 * @param cb
 */
function getMarkup(url, cb){
   if (url in markupCache){
      cb(null, markupCache[url]);
      return;
   }
   if (/api\/classes/.test(url)){
      docs('./node_modules/sailfish/sf_client/lib', function(err, docObject){
         fs.readFile(path.join(tplPath, 'docs.dot'), 'utf8', function(err, template){
            if (!err){
               try{
                  var
                     dotTplFn = dot.template(template, null, dotDef),
                     txt = marked(dotTplFn(docObject));
                  markupCache[url] = txt;
                  cb(null, txt);
               }
               catch (e){
                  cb(null, e.message);
               }
            }
            else{
               cb(null, err.message);
            }
         });
      });
   }
   else{
      fs.readFile("./source/" + url + ".md", "utf8", function(e, file){
         var text;
         if (e){
            cb(e);
         }
         else{
            text = marked(file);
            markupCache[url] = text;
            cb(null, text);
         }
      });
   }
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