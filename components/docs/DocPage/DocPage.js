define("js!docs.DocPage", ["js!CompoundComponent", "html!docs.DocPage", "jquery", "js!docs.Sidebar", "css!docs.DocPage", "js!docs.DocView"], function(CompoundComponent, dotTplFn, $){
   var DocPage = CompoundComponent.extend({
      _dotTplFn: dotTplFn,
      _options: {
         activeLink: "",
         markdown: ""
      },
      init: function(){
         this._super.apply(this, arguments);

         var
            self = this,
            menu = this._components["menu"],
            md = this._components["md"];

         $(window).bind("popstate", function(e){
            var oE = e.originalEvent;
            menu.markAsActive(oE.state.link);
            self.showPage(oE.state.link);
         });

         menu.on("click", function(link){
            var l = link.target.getAttribute("href");
            if (window.history){
               self.showPage(l);
               window.history.pushState({link : l}, "", l);
            }
            else{
               window.location = link;
            }
         })
      },
      showPage: function(url){
         var md = this._components["md"];
         $.ajax("/getMarkup" + url, {
            success: function(res){
               md.setMarkdown(res);
            },
            error: function(e){
               md.setMarkdown(e.responseText);
            }
         });
      }
   });

   return DocPage;
});
