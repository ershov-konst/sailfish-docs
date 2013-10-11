define(["js!CompoundComponent", "html!docs.Sidebar", "jQuery"], function(CompoundComponent, dotTplFn, $){

   var Sidebar = CompoundComponent.extend({
      _dotTplFn: dotTplFn,
      init: function(){
         this._super.apply(this, arguments);

         $(this._container).find();
      }
   });

   return Sidebar;
});
