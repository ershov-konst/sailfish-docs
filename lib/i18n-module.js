var
   domain = require('domain'),
   path = require('path'),
   global = (function(){return this || (0,eval)('this')})(),
   i18n = require('i18n');

global.__ = function(){
   if (process.domain && process.domain.res){
      var res = process.domain.res;
      return res.__.apply(this, arguments);
   }
   else{
      return i18n.__.apply(this, arguments);
   }
};

i18n.configure({
   locales: ['ru', 'en'],
   cookie: 'lang',
   defaultLocale: 'ru',
   directory: path.join(__dirname, '../locales')
});

function middleware(req, res, next){
   var
      ctx = this,
      d = domain.create();

   d.req = req;
   d.res = res;
   d.run(function(){
      i18n.init.apply(ctx, [req, res, next]);
   })
}

module.exports = middleware;