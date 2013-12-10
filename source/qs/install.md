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

Структура файла `package.json` подробно описана [тут](https://npmjs.org/doc/json.html).
Все что нам нужно сейчас - это указать в разделе `dependencies` модуль `sailfish`

Пример:

    {
        "name": "my-sailfish-app",
        "version": "0.0.1",
        "main": "./app.js",
        "dependencies" : {
            "sailfish": "0.0.x"
        }
    }

далее выполняем установку зависимостей

    npm install

### Конфигурация фреймворка (config.json)

Для запуска приложения необходимо задать конфигурцию `sailfish`.
Пример:

    var server = new Sailfish({
       "rootPath": __dirname,
       "controllers": "./controllers",
       "components": "./components",
       "views": "./views",
       "port": 10001
    });

Необходимо указать порт, который будет слушать приложение, а так же расположение директорий компонентов,
html-шаблонов страниц и серверных контроллеров, как указано на примере выше. О возможных параметрах конфигурации можно
узнать [тут](/api/config).

### Основной файл приложения (app.js)

    var
       Sailfish = require("sailfish").Sailfish,
       server;

    server = new Sailfish({
       "rootPath": __dirname,
       "controllers": "./controllers",
       "components": "./components",
       "views": "./views",
       "port": 777
    });

    server.on("start", function(){
       console.log("onStart");
    });

    server.on("error", function(err, req, res){
       console.log(err);
    });

В `sailfish` определен ряд [событий](/api/events), подписаться на которые можно с помощью метода `on` как указано на примере выше.