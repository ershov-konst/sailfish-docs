define("js!docs.DocPage", ["js!CompoundComponent", "html!docs.DocPage", "jquery", "js!docs.Sidebar", "css!docs.DocPage", "js!docs.DocView", "js!docs.MainPage"], function(CompoundComponent, dotTplFn, $){
   var DocPage = CompoundComponent.extend({
      _dotTplFn: dotTplFn,
      _options: {
         isIndexPage: false,
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
            if (oE.state){
               menu.markAsActive(oE.state.link);
               self.showPage(oE.state.link);
            }
            else{
               window.location = '/';
            }
         });

         menu.on("click", function(event, link){
            var l = link.getAttribute("href");
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
         this._markAsIndexPage(false);
      },
      _markAsIndexPage: function(flag){
         if (this._options.isIndexPage != flag){
            this._options.isIndexPage = flag;
            $(this._container).toggleClass('docs-DocPage__indexPage', flag);
         }
      }
   });

   return DocPage;
});
