## Базовые классы

### js!core

### <a name="Class">js!Class</a>

Класс предоставляющий механизм наследования.
Все классы, которые могут быть расширены, должны быть наследованы от этого класса.

#### Методы:

<a class="docs-method">init( )</a>

*Описание:* Конструктор компонента. Должен быть определен в классе наследнике

Пример использования:

    var MySuperClass = Class.extend({
       init: function(){
          this._super();
          //place your constructor here
       }
    });

***

### js!Abstract
Расширяет [Class](#Class)

Класс предоставляет событийную модель. По сути является оберткой над EventBus

#### Методы:

<a class="docs-method">trigger(type, target)</a>

*init* : inherited fromClass.prototype.function(){
         this._id = this._generateId();
         this._eventChannel = EventBus.channel(this._id);
      },
      trigger : function(type, target){
         this._eventChannel.trigger(type, target);
      },
      on : function(type, callback, scope){
         this._eventChannel.on(type, callback, scope);
      },
      off : function(type, callback, scope){
         this._eventChannel.off(type, callback, scope);
      },
      has : function(type, callback, scope){
         this._eventChannel.has(type, callback, scope);
      },
      getId : function(){
         return this._id;
      },
      destroy : function(){
         EventBus.removeChannel(this._id);
      },

### js!BaseComponent

### js!CompoundComponent

### js!EventBus