## Конфигурация

#### rooPath
`{String}`

Расположение папки с корнем приложения

    "rootPath": "/var/www/myApplication"
***

#### controllers
`{String}`

Расположение папки с контроллерами для проложения (относительно `rootPath`)

    "controllers": "./controllers"
***

#### components
`{String}`

Расположение папки с комопнентами проложения (относительно `rootPath`)

    "components": "./components"
***

#### views
`{String}`

Расположение папки с html шаблонами (относительно `rootPath`)

    "views": "./views"
***


#### port
`{Number}`

Порт, который будет слушать приложение

    "port": 777
***

#### favicon[optional]
`{String}`

Путь до favicon (относительно `rootPath`)

    "favicon": "./favicon.ico"
***

#### requirejs[optional]
`{Object}`

Конфигурация `requirejs`

    "requirejs" : {
       "paths" : {
          "jquery" : "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min"
       }
    }
