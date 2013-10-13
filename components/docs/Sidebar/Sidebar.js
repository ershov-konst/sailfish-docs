define(["js!BaseComponent", "html!docs.Sidebar", "jQuery", "css!docs.Sidebar"], function(BaseComponent, dotTplFn, $){

   var Sidebar = BaseComponent.extend({
      _dotTplFn: dotTplFn,
      _links: [],
      init: function(){
         var self = this;
         this._super.apply(this, arguments);
         this._links = $(this._container).find(".docs-Sidebar__link");

         this._links.click(function(e){
            if (e.which !== 2){
               e.preventDefault();
               self.setActive(this.getAttribute("href"));
            }
         });
      },
      setActive: function(href){
         var target = this._links.filter("[href='"+ href +"']");
         this.markAsActive(href);
         this.trigger("click", target[0]);
      },
      markAsActive: function(href){
         var target = this._links.filter("[href='"+ href +"']");
         this._links.removeClass("docs-Sidebar__link__active");
         target.addClass("docs-Sidebar__link__active");
      }
   });

   return Sidebar;
});
