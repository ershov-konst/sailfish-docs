define(["js!BaseComponent", "html!docs.DocPage", "js!docs.Sidebar"], function(BaseComponent, dotTplFn){
   var DocPage = BaseComponent.extend({
      _dotTplFn: dotTplFn,
      init: function(){
         this._super.apply(this, arguments);
         console.log("init!");
      }
   });

   return DocPage;
});
