define("js!docs.MainPage", ["js!BaseComponent", "html!docs.MainPage", "css!docs.MainPage"], function(BaseComponent, dotTplFn){
   return BaseComponent.extend({
      _options: {
         sfInfo: {}
      },
      _dotTplFn: dotTplFn
   });
});
