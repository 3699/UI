"use strict";var $=require("jquery"),UI=require("./core");require("./ui.smooth-scroll");var ScrollSpyNav=function(s,t){this.options=$.extend({},ScrollSpyNav.DEFAULTS,t),this.$element=$(s),this.anchors=[],this.$links=this.$element.find('a[href^="#"]').each(function(s,t){this.anchors.push($(t).attr("href"))}.bind(this)),this.$targets=$(this.anchors.join(", "));var o=function(){UI.utils.rAF.call(window,$.proxy(this.process,this))}.bind(this);this.$window=$(window).on("scroll.scrollspynav.amui",o).on("resize.scrollspynav.amui orientationchange.scrollspynav.amui",UI.utils.debounce(o,50)),o(),this.scrollProcess()};ScrollSpyNav.DEFAULTS={className:{active:"am-active"},closest:!1,smooth:!0,offsetTop:0},ScrollSpyNav.prototype.process=function(){var s=this.$window.scrollTop(),t=this.options,o=[],e=this.$links,i=this.$targets;if(i.each(function(s,e){UI.utils.isInView(e,t)&&o.push(e)}),o.length){var r;if($.each(o,function(t,o){if($(o).offset().top>=s)return r=$(o),!1}),!r)return;t.closest?(e.closest(t.closest).removeClass(t.className.active),e.filter('a[href="#'+r.attr("id")+'"]').closest(t.closest).addClass(t.className.active)):e.removeClass(t.className.active).filter('a[href="#'+r.attr("id")+'"]').addClass(t.className.active)}},ScrollSpyNav.prototype.scrollProcess=function(){var s=this.$links,t=this.options;t.smooth&&$.fn.smoothScroll&&s.on("click",function(s){s.preventDefault();var o=$(this),e=$(o.attr("href"));if(e){var i=t.offsetTop&&!isNaN(parseInt(t.offsetTop))&&parseInt(t.offsetTop)||0;$(window).smoothScroll({position:e.offset().top-i})}})},UI.plugin("scrollspynav",ScrollSpyNav),UI.ready(function(s){$("[data-am-scrollspynav]",s).scrollspynav()}),module.exports=ScrollSpyNav;