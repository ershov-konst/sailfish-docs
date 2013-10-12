define(["js!CompoundComponent", "html!docs.DocPage", "js!docs.Sidebar"], function(CompoundComponent, dotTplFn){
   var DocPage = CompoundComponent.extend({
      _dotTplFn: dotTplFn,
      init: function(){
         this._super.apply(this, arguments);
         console.log("init!");
      }
   });

   return DocPage;
});
