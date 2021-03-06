(function(){
	(function(c){var u={backspace:8,tab:9,enter:13,pause:19,capslock:20,esc:27,space:32,pageup:33,pagedown:34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,"delete":46,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,"?":191,minus:c.browser.opera?[109,45]:c.browser.mozilla?109:[189,109],plus:c.browser.opera?[61,43]:c.browser.mozilla?[61,107]:[187,107]},k={},l,m={},n=false,o=function(b,a){var d=b;if(a.ctrl)d+="_ctrl";if(a.alt)d+="_alt";if(a.shift)d+="_shift"; var f=function(h,e){if(e&&e!==16&&e!==17&&e!==18)h+="_"+e;return h};if(c.isArray(a.which)){var g=[];c.each(a.which,function(h,e){g.push(f(d,e))});return g}else return f(d,a.which)},r=function(b){var a={};b=b.split("+");c.each(b,function(d,f){if(f==="ctrl"||f==="alt"||f==="shift")a[f]=true;else a.which=u[f]||f.toUpperCase().charCodeAt()});return a},v=function(b){var a=b.tagName.toLowerCase();b=b.type;return a==="input"&&c.inArray(b,["text","password","file","search"])>-1||a==="textarea"},p=function(b, a){if(l){var d=o(b,{ctrl:a.ctrlKey,alt:a.altKey,shift:a.shiftKey,which:a.which});if(d=l[d]){var f=v(a.target),g=false;c.each(d,function(h,e){if(!f||e.enableInInput){if(!g){a.preventDefault();g=true}e.handler(a)}})}}};c.Shortcuts={};c.Shortcuts.start=function(b){b=b||"default";l=k[b];if(!n){c(document).bind((c.browser.opera?"keypress":"keydown")+".shortcuts",function(a){if(a.type==="keypress"&&a.which>=97&&a.which<=122)a.which-=32;m[a.which]||p("down",a);m[a.which]=true;p("hold",a)});c(document).bind("keyup.shortcuts", function(a){m[a.which]=false;p("up",a)});n=true;return this}};c.Shortcuts.stop=function(){c(document).unbind("keypress.shortcuts keydown.shortcuts keyup.shortcuts");n=false;return this};c.Shortcuts.add=function(b){if(!b.mask)throw Error("$.Shortcuts.add: required parameter 'params.mask' is undefined.");if(!b.handler)throw Error("$.Shortcuts.add: required parameter 'params.handler' is undefined.");var a=b.type||"down",d=b.list?b.list.replace(/\s+/g,"").split(","):["default"];c.each(d,function(f,g){k[g]|| (k[g]={});var h=k[g],e=b.mask.toLowerCase().replace(/\s+/g,"").split(",");c.each(e,function(s,i){var j=r(i);j=o(a,j);c.isArray(j)||(j=[j]);c.each(j,function(t,q){h[q]||(h[q]=[]);h[q].push(b)})})});return this};c.Shortcuts.remove=function(b){if(!b.mask)throw Error("$.Shortcuts.remove: required parameter 'params.mask' is undefined.");var a=b.type||"down",d=b.list?b.list.replace(/\s+/g,"").split(","):["default"];c.each(d,function(f,g){if(!k[g])return true;var h=b.mask.toLowerCase().replace(/\s+/g,"").split(","); c.each(h,function(e,s){var i=r(s);i=o(a,i);c.isArray(i)||(i=[i]);c.each(i,function(j,t){delete k[g][t]})})});return this}})(jQuery);

	function activateMove(){
	    if($('.pop-over.clearfix.fancy-scrollbar').is(":visible")){
	        $(this).find('.icon-sm.icon-close').click();
	    }
	    $('.active-card').find('.card-operation.icon-sm.icon-menu.dark-hover.js-card-menu').click();
	    $("a:contains('Move')").click();
	}
	$.Shortcuts.add({
	    type: 'hold',
	    mask: 'Alt+M',
	    handler: test
	    });
	
	$.Shortcuts.start();
	};
})();


