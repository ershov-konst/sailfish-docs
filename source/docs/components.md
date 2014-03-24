## Создание компонета

Компонент представляет собой самостоятельную сущность приложения, обладающую определённой функциональностью.
Рассмотрим это понятие на примере простейшего компонента, выводящего сообщение «Hello, world!».

В файловой структуре компонент – это папка, внутри которой расположен одноимённый JS-модуль.

Расположение модуля в файловой структуре:

    |_components
      |_funcArea
        |_HelloWorld
          |_HelloWorld.js

Пример кода модуля:

    define('js!Test.HelloWorld', [], function() {
       return function() {alert('Hello, world!')};
    });

Для организации кода в приложении используется [AMD](http://en.wikipedia.org/wiki/Asynchronous_module_definition) подход,
данный подход реализуется с помощью библиотеки [require.js](http://requirejs.org/).

#### Имя компонента

Имя компонента, указываемое первым аргументом в методе `define` обязательно и должно соответствовать следующим правилам:
- должно начинаться с `'js!'`
- после символа `'!'` указывается имя функциональной области, к которой принадлежит компонент
- далее непосредственно имя компонента
- функциональная область и имя комопнента разделяются символом `'.'`

Пример:

    'js!docs.Sidebar'

#### Массив зависимостей

Вторым аргументом в функцию `define` передается массив зависимостей модуля. Ссылки на все зависимости придут аргументами
в функцию описания модуля.

## Визуальный компонент

Для определения класса визуального компонента необходимо расширить класс `BaseComponent`, который можно получить
указав модуль `js!BaseComponent` в зависимостях. (Со списком классов фреймворка можно ознакомиться [тут](/api/classes))

Пример:

    define("js!docs.Sidebar", ["js!BaseComponent"], function(BaseComponent){
       var Sidebar = BaseComponent.extend({
          _options: {
             links: []
          },
          init: function(){
            this._super();
            //do something
          }
       });
    })

В объекте `_options` перечисляются опции компонента и их значения по умолчанию. Конструирование экземпляра класса
осуществляется в методе `init`(что бы выполнить сначала конструктор родительского класса нужно не забыть вызвать метод
суперкласса `this._super`).

### HTML-разметка

Описание разметки визуального компонента осуществляется в файле с расширением `html`
с использованием шаблонизатора [dot.js](http://olado.github.io/doT/index.html).
html файл должен находиться в папке компонента и называться так же как и компонент.


Пример `html` разметки компонента:


    <div class='docs-Sidebar'>
       {{
          for(var i = 0, l = it.items.length; i < l; i++){
             var
                menu = it.items[i],
                submenu = it.items[i].submenu;
       }}
          <ul class='docs-Sidebar__list'>
             <li class='docs-Sidebar__list-item docs-Sidebar__list-item__header'>
                <span class='docs-Sidebar__span'>{{=menu.caption}}</span>
             </li>
             {{
                if (submenu){
                   for (var j = 0, len = submenu.length; j < len; j++){
                      var isActive = submenu[j].href === it.activeLink;
             }}
             <li class='docs-Sidebar__list-item'>
                <a class='docs-Sidebar__link {{? isActive}}docs-Sidebar__link__active{{?}}' href='{{=submenu[j].href}}'>{{=submenu[j].caption}}</a>
             </li>
             {{
                   }
                }
             }}
          </ul>
       {{ } }}
    </div>

Вся работа шаблона построена вокруг объекта `it`, который является набором опций конструируемого компонента.

#### Составной компонент

В html разметке можно размещать другие компоненты:

    <div class="test-TestCompoundComponent">
      ...
      <component data-component="docs-Sidebar">
         <items:array>
            <item:object>
               <caption>Пункт меню</caption>
               <submenu:array>
                  <item:object>
                     <caption>Пункт подменю</caption>
                     <link>/link/to/something</link>
                  </item>
                  ...
               </submenu>
            </item>
            ...
         </items>
      </component>
      ...
    </div>

Особенности конфигурирования вложенных комопонентов описаны [тут](/docs/options)

Для того чтобы компонент знал, что у него есть разметка - необходимо указать модуль с разметкой в зависимостях
модуля компонента, а ссылку на модуль с разметкой передать в качестве свойства `_dotTplFn` нового класса.

Пример:

    define("js!docs.Sidebar", ["js!BaseComponent", "html!docs.Sidebar"], function(BaseComponent, markupModule){
       var Sidebar = BaseComponent.extend({
          _dotTplFn: markupModule,
          _options: {
             links: []
          }
       });
    })

### Стилизация компонента

Для стилизации компонента необходимо добавить в зависимости компонента `css` модуль. css модуль - файл располагающийся
 в папке компонента. Файл должен называться так же как модуль.


Пример расположения ресурсов компонента и соответствующие им имена:

    |_components
      |_MyModule
        |_HelloWorld
          |_HelloWorld.js     //'js!MyModule.HelloWorld'
          |_HelloWorld.html   //'html!MyModule.HelloWorld'
          |_HelloWorld.css    //'css!MyModule.HelloWorld'
          |_library.js        //'js!MyModule.HelloWorld/library'
          |_resources
            |_other_lib.css   //'css!MyModule.HelloWorld/resources/other_lib'
            |_other_lib.js    //'js!MyModule.HelloWorld/resources/other_lib'