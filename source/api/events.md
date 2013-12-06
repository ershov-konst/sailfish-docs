## События

### start

Срабатыевает после полной инициализации приложения.

    var server = new Sailfish(config);

    server.on("start", function(){
       console.log("onStart");
    });

***
### error

Срабатывает при любой ошибке во время работы приложения. Аргументы обработчика:

`err` - объект ошибки

`req` - объект запроса

`res` - объект ответа

    server = new Sailfish(config);

    server.on("error", function(err, req, res){
       console.log(err);
       if (err.code && err.code == 404){
          res.render("404");
       }
       else{
          res.render("oops");
       }
    });