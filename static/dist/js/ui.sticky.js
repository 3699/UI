"use strict";var $=require("jquery"),UI=require("./core"),Sticky=function(i,t){var s=this;this.options=$.extend({},Sticky.DEFAULTS,t),this.$element=$(i),this.sticked=null,this.inited=null,this.$holder=void 0,this.$window=$(window).on("scroll.sticky.amui",UI.utils.debounce($.proxy(this.checkPosition,this),10)).on("resize.sticky.amui orientationchange.sticky.amui",UI.utils.debounce(function(){s.reset(!0,function(){s.checkPosition()})},50)).on("load.sticky.amui",$.proxy(this.checkPosition,this)),this.offset=this.$element.offset(),this.init()};Sticky.DEFAULTS={top:0,bottom:0,animation:"",className:{sticky:"am-sticky",resetting:"am-sticky-resetting",stickyBtm:"am-sticky-bottom",animationRev:"am-animation-reverse"}},Sticky.prototype.init=function(){var i=this.check();if(!i)return!1;var t=this.$element,s="";$.each(t.css(["marginTop","marginRight","marginBottom","marginLeft"]),function(i,t){return s+=" "+t});var e=$('<div class="am-sticky-placeholder"></div>').css({height:"absolute"!==t.css("position")?t.outerHeight():"","float":"none"!=t.css("float")?t.css("float"):"",margin:s});return this.$holder=t.css("margin",0).wrap(e).parent(),this.inited=1,!0},Sticky.prototype.reset=function(i,t){var s=this.options,e=this.$element,n=s.animation?" am-animation-"+s.animation:"",o=function(){e.css({position:"",top:"",width:"",left:"",margin:0}),e.removeClass([n,s.className.animationRev,s.className.sticky,s.className.resetting].join(" ")),this.animating=!1,this.sticked=!1,this.offset=e.offset(),t&&t()}.bind(this);e.addClass(s.className.resetting),!i&&s.animation&&UI.support.animation?(this.animating=!0,e.removeClass(n).one(UI.support.animation.end,function(){o()}).width(),e.addClass(n+" "+s.className.animationRev)):o()},Sticky.prototype.check=function(){if(!this.$element.is(":visible"))return!1;var i=this.options.media;if(i)switch(typeof i){case"number":if(window.innerWidth<i)return!1;break;case"string":if(window.matchMedia&&!window.matchMedia(i).matches)return!1}return!0},Sticky.prototype.checkPosition=function(){if(!this.inited){var i=this.init();if(!i)return}var t=this.options,s=this.$window.scrollTop(),e=t.top,n=t.bottom,o=this.$element,a=t.animation?" am-animation-"+t.animation:"",c=[t.className.sticky,a].join(" ");"function"==typeof n&&(n=n(this.$element));var r=s>this.$holder.offset().top;!this.sticked&&r?o.addClass(c):this.sticked&&!r&&this.reset(),this.$holder.css({height:o.is(":visible")&&"absolute"!==o.css("position")?o.outerHeight():""}),r&&o.css({top:e,left:this.$holder.offset().left,width:this.$holder.width()}),this.sticked=r},UI.plugin("sticky",Sticky),$(window).on("load",function(){$("[data-am-sticky]").sticky()}),module.exports=Sticky;