define(["js!BaseComponent", "html!docs.DocView", "jQuery", "css!docs.DocView"], function(BaseComponent, dotTplFn, $){

   var DocView = BaseComponent.extend({
      _options: {
         markdown : ""
      },
      _dotTplFn: dotTplFn,
      init: function(){
         this._super.apply(this, arguments);
      },
      setMarkdown: function(markdown){
         this._container.innerHTML = markdown;
      }
   });

   return DocView;
});
