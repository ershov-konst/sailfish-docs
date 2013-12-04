# Создание компонета

Компонент представляет собой самостоятельную сущность приложения, обладающую определённой функциональностью.
Рассмотрим это понятие на примере простейшего компонента, выводящего сообщение «Hello, world!».

В файловой структуре компонент – это папка, внутри которой расположен одноимённый JS-модуль.

Расположение модуля в файловой структуре:

    |_components
      |_funcArea
        |_HelloWorld
          |_HelloWorld.js

Для организации кода в приложении используется [AMD](http://en.wikipedia.org/wiki/Asynchronous_module_definition) подход,
данный подход реализуется с помощью библиотеки [require.js](http://requirejs.org/).

Пример кода модуля:

    define('js!Test.HelloWorld', [], function() {
       return function() {alert('Hello, world!')};
    });

Имя компонента, указываемое первым аргументом в методе `define` обязательно и должно соответствовать следующим правилам:
- должно начинаться с `'js!'`
- после символа `'!'` указывается имя функциональной области, к которой принадлежит компонент
- далее непосредственно имя компонента
- функциональная область и имя комопнента разделяются символом `'.'`

Пример:

    'js!docs.Sidebar'

## Визуальный компонент

Для определения класса нового визуального компонента необходимо расширить класс `BaseComponent`, который можно получить
указав модуль `js!BaseComponent` в зависимостях.

Пример:

    define("js!docs.Sidebar", ["js!BaseComponent"], function(BaseComponent){
       var Sidebar = BaseComponent.extend({
          _options: {
             links: []
          }
       });
    })

Описание разметки визуального компонента осуществляется в файле с расширением `html`
с использованием шаблонизатора [dot.js](http://olado.github.io/doT/index.html)


Для примера возьмем компонент 'Sidebar':


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
