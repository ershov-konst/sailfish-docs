var
   Component = require("sailfish").Component,
   marked = require("marked"),
   path = require("path"),
   fs = require("fs"),
   docs = require('../lib/docs'),
   dot = require('sailfish').doT,
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

/**
 * returns html
 * @param {String} url for example api/1
 * @param cb
 */
function getMarkup(url, cb){
   if (false/*url in markupCache*/){
      cb(null, markupCache[url]);
      return;
   }
   if (/api\/classes/.test(url)){
      docs(path.resolve(__dirname, '../node_modules/sailfish/sf_client/lib'), function(err, docObject){
         if (!err){
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
                     cb(e);
                  }
               }
               else{
                  cb(err);
               }
            });
         }
         else{
            cb(err);
         }
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

function getSailfishInfo(cb){
   var
      sfPath = path.join(process.cwd(), 'node_modules/sailfish'),
      packageJSON = require(path.join(sfPath, 'package.json')),
      result = {};

   result.version = packageJSON.version;

   fs.readFile(path.join(sfPath, 'CHANGELOG.md'), 'utf8',function(err, text){
      var buffer;
      if (!err){
         buffer = /^##.*\n([^#]*)/.exec(text);
         result.changelog = marked(buffer ? buffer[1] : '');

      }
      else {
         result.changelog = 'error: changelog parsing error';
      }
      cb(result);
   });
}

module.exports = {
   index : function(req, res){
      getSailfishInfo(function(sfInfo){
         res.render("main", {
            title : "sailfish.js",
            content : new Component("docs.DocPage", {
               isIndexPage: true,
               sfInfo : sfInfo
            })
         });
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