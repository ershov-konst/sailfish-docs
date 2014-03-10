var
   express = require('express'),
   sailfish = require('sailfish'),
   config = require("./config.json"),
   app;

app = sailfish(express, config);

app.use(sailfish.baseRouting());

app.use(function(err, req, res, next){
   console.log('caught error\n' + err);
   console.log(err.stack);
   next();
});

app.listen(process.env.PORT || 10001);
console.log('application running on localhost:' + (process.env.PORT || 10001));
