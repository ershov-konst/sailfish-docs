var
   Sailfish = require("sailfish").Sailfish,
   config = require("./config.json"),
   server;

config["rootPath"] = __dirname;
config["port"] = 777;


server = new Sailfish(config);

server.on("start", function(){
   console.log("onStart");
});

server.on("error", function(err, req, res){
   console.log(err);
   if (err.code){
      res.send(err.code);
   }
   else{
      console.log("another");
   }
});