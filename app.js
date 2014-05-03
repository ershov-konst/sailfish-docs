var
   cookieParser = require('cookie-parser'),
   express = require('express'),
   sailfish = require('sailfish'),
   config = require("./config.json"),
   i18n_m = require('./lib/i18n-module'),
   app;

app = sailfish(express, config);
app.use(cookieParser());
app.use(i18n_m);

app.use(sailfish.baseRouting());

app.use(function(err, req, res, next){
   console.log('caught error\n' + err);
   console.log(err.stack);
   next();
});

app.listen(process.env.PORT || 10001);
console.log('application running on localhost:' + (process.env.PORT || 10001));
