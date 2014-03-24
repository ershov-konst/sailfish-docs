## Конфигурация

Конфигурация фреймворка осуществляется с помощью следующий параметров:

#### rooPath
`{String}`

Расположение корня приложения (по умолчанию `./`)

    "rootPath": "/var/www/myApplication"
***

#### components
`{String}`

Расположение папки с компонентами проложения (относительно `rootPath`, по умолчанию `./components`)

    "components": "./components"
***

#### views
`{String}`

Расположение папки с html шаблонами (относительно `rootPath`, по умолчанию `./views`)

    "views": "./views"
***

#### requirejs
`{Object}`

Конфигурация `requirejs`

    "requirejs" : {
       "paths" : {
          "jquery" : "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min"
       }
    }
