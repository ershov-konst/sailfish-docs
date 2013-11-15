## Установка

Перед началом создания приложения на основе фреймворка `sailfish` необходимо подготовить рабочую директорию

### Подготовка рабочей директории

Стандартная структура каталога приложения выглядит следующим образом:

    |_components     //каталог для комопнентов
    |_views          //каталог для html шаблонов страниц
    |_controllers    //каталог для серверных контроллеров
    |_app.js         //основной файл приложения
    |_config.json    //конфигурационный файл приложения
    |_package.json   //файл для конфигурации модулей приложения


В директории, в которой будет распологаться ваше приложение, создайте каталоги и файлы указанные выше.

### Конфигурация приложения (package.json)

Структуры файла `package.json` подробно описана [тут](https://npmjs.org/doc/json.html).
Все что нам нужно сейчас - это указать в разделе `dependencies` модуль `sailfish`

Пример:

    {
        "name": "my-sailfish-app",
        "version": "0.0.1",
        "main": "./app.js",
        "dependencies" : {
            "sailfish": "git+https://github.com/ershov-konst/sailfish#master"
        }
    }

далее выполняем установку модулей

    npm install

### Конфигурация фреймворка (config.json)

Для запуска приложения необходимо задать конфигурцию `sailfish`. Для хранения конфигурации удобно использовать отдельный файл.
В нашем примере это файл `config.json`:

    {
       "port": 777,
       "controllers": "./controllers",
       "components": "./components",
       "views": "./views"
    }

Необходимо указать порт, который будет слушать приложение, а так же расположение директорий компонентов,
html-шаблонов страниц и серверных контроллеров, как указано на примере выше. О возможных параметрах конфигурации можно
узнать [тут](/api/config).

### Основной файл приложения (app.js)

    var
       sailfish = require("sailfish").server,
       config = require("./config.json");

    config["rootPath"] = __dirname;

    sailfish.run(config);

    sailfish.on("error", function(err, req, res){
       console.log(err);
       if (err.code){
          res.send(err.code);
       }
       else{
          console.log("another");
       }
    });

 //TODO тут описание что и зачем