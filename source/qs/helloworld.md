## Hello world!!!

Созданим в папке `controllers` файл `index.js` со следующим содержанием:


    module.exports = {
       index : function(req, res){
          res.send('Hello world!!!');
       }
    };

Теперь запустим наше приложение и откроем в браузере адрес `http://localhost:10001/`

