var
   express = require('express'),
   sailfish = require('sailfish'),
   config = require("./config.json"),
   app;

app = sailfish(express, config);

app.listen(process.env.PORT || 10001);
console.log('application running on localhost:' + (process.env.PORT || 10001));
