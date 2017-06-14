"use strict";var $=require("jquery"),UI=require("./core"),PinchZoom=require("./ui.pinchzoom"),Hammer=require("./util.hammer"),animation=UI.support.animation,transition=UI.support.transition,PureView=function(e,i){this.$element=$(e),this.$body=$(document.body),this.options=$.extend({},PureView.DEFAULTS,i),this.$pureview=$(this.options.tpl).attr("id",UI.utils.generateGUID("am-pureview")),this.$slides=null,this.transitioning=null,this.scrollbarWidth=0,this.init()};PureView.DEFAULTS={tpl:'<div class="am-pureview am-pureview-bar-active"><ul class="am-pureview-slider"></ul><ul class="am-pureview-direction"><li class="am-pureview-prev"><a href=""></a></li><li class="am-pureview-next"><a href=""></a></li></ul><ol class="am-pureview-nav"></ol><div class="am-pureview-bar am-active"><span class="am-pureview-title"></span><div class="am-pureview-counter"><span class="am-pureview-current"></span> / <span class="am-pureview-total"></span></div></div><div class="am-pureview-actions am-active"><a href="javascript: void(0)" class="am-icon-chevron-left" data-am-close="pureview"></a></div></div>',className:{prevSlide:"am-pureview-slide-prev",nextSlide:"am-pureview-slide-next",onlyOne:"am-pureview-only",active:"am-active",barActive:"am-pureview-bar-active",activeBody:"am-pureview-active"},selector:{slider:".am-pureview-slider",close:'[data-am-close="pureview"]',total:".am-pureview-total",current:".am-pureview-current",title:".am-pureview-title",actions:".am-pureview-actions",bar:".am-pureview-bar",pinchZoom:".am-pinch-zoom",nav:".am-pureview-nav"},shareBtn:!1,toggleToolbar:!0,target:"img",weChatImagePreview:!0},PureView.prototype.init=function(){var e=this,i=this.options,t=this.$element,a=this.$pureview;this.refreshSlides(),$("body").append(a),this.$title=a.find(i.selector.title),this.$current=a.find(i.selector.current),this.$bar=a.find(i.selector.bar),this.$actions=a.find(i.selector.actions),i.shareBtn&&this.$actions.append('<a href="javascript: void(0)" class="am-icon-share-square-o" data-am-toggle="share"></a>'),this.$element.on("click.pureview.amui",i.target,function(t){t.preventDefault();var a=e.$images.index(this);i.weChatImagePreview&&window.WeixinJSBridge?window.WeixinJSBridge.invoke("imagePreview",{current:e.imgUrls[a],urls:e.imgUrls}):e.open(a)}),a.find(".am-pureview-direction").on("click.direction.pureview.amui","li",function(i){i.preventDefault(),$(this).is(".am-pureview-prev")?e.prevSlide():e.nextSlide()}),a.find(i.selector.nav).on("click.nav.pureview.amui","li",function(){var i=e.$navItems.index($(this));e.activate(e.$slides.eq(i))}),a.find(i.selector.close).on("click.close.pureview.amui",function(i){i.preventDefault(),e.close()}),this.$slider.hammer().on("swipeleft.pureview.amui",function(i){i.preventDefault(),e.nextSlide()}).on("swiperight.pureview.amui",function(i){i.preventDefault(),e.prevSlide()}).on("press.pureview.amui",function(t){t.preventDefault(),i.toggleToolbar&&e.toggleToolBar()}),this.$slider.data("hammer").get("swipe").set({direction:Hammer.DIRECTION_HORIZONTAL,velocity:.35}),t.DOMObserve({childList:!0,subtree:!0},function(e,i){}),t.on("changed.dom.amui",function(i){i.stopPropagation(),e.refreshSlides()}),$(document).on("keydown.pureview.amui",$.proxy(function(e){var i=e.keyCode;37==i?this.prevSlide():39==i?this.nextSlide():27==i&&this.close()},this))},PureView.prototype.refreshSlides=function(){this.$images=this.$element.find(this.options.target);var e=this,i=this.options,t=this.$pureview,a=$([]),s=$([]),r=this.$images,n=r.length;this.$slider=t.find(i.selector.slider),this.$nav=t.find(i.selector.nav);var o="data-am-pureviewed";this.imgUrls=this.imgUrls||[],n&&(1===n&&t.addClass(i.className.onlyOne),r.not("["+o+"]").each(function(i,t){var r,n;"A"===t.nodeName?(r=t.href,n=t.title||""):(r=$(t).data("rel")||t.src,r=UI.utils.getAbsoluteUrl(r),n=$(t).attr("alt")||""),t.setAttribute(o,"1"),e.imgUrls.push(r),a=a.add($('<li data-src="'+r+'" data-title="'+n+'"></li>')),s=s.add($("<li>"+(i+1)+"</li>"))}),t.find(i.selector.total).text(n),this.$slider.append(a),this.$nav.append(s),this.$navItems=this.$nav.find("li"),this.$slides=this.$slider.find("li"))},PureView.prototype.loadImage=function(e,i){var t="image-appended";if(!e.data(t)){var a=$("<img>",{src:e.data("src"),alt:e.data("title")});e.html(a).wrapInner('<div class="am-pinch-zoom"></div>').redraw();var s=e.find(this.options.selector.pinchZoom);s.data("amui.pinchzoom",new PinchZoom(s[0],{})),e.data("image-appended",!0)}i&&i.call(this)},PureView.prototype.activate=function(e){var i=this.options,t=this.$slides,a=t.index(e),s=e.data("title")||"",r=i.className.active;t.find("."+r).is(e)||this.transitioning||(this.loadImage(e,function(){UI.utils.imageLoader(e.find("img"),function(i){e.find(".am-pinch-zoom").addClass("am-pureview-loaded"),$(i).addClass("am-img-loaded")})}),this.transitioning=1,this.$title.text(s),this.$current.text(a+1),t.removeClass(),e.addClass(r),t.eq(a-1).addClass(i.className.prevSlide),t.eq(a+1).addClass(i.className.nextSlide),this.$navItems.removeClass().eq(a).addClass(i.className.active),transition?e.one(transition.end,$.proxy(function(){this.transitioning=0},this)).emulateTransitionEnd(300):this.transitioning=0)},PureView.prototype.nextSlide=function(){if(1!==this.$slides.length){var e=this.$slides,i=e.filter(".am-active"),t=e.index(i),a="am-animation-right-spring";t+1>=e.length?animation&&i.addClass(a).on(animation.end,function(){i.removeClass(a)}):this.activate(e.eq(t+1))}},PureView.prototype.prevSlide=function(){if(1!==this.$slides.length){var e=this.$slides,i=e.filter(".am-active"),t=this.$slides.index(i),a="am-animation-left-spring";0===t?animation&&i.addClass(a).on(animation.end,function(){i.removeClass(a)}):this.activate(e.eq(t-1))}},PureView.prototype.toggleToolBar=function(){this.$pureview.toggleClass(this.options.className.barActive)},PureView.prototype.open=function(e){var i=e||0;this.checkScrollbar(),this.setScrollbar(),this.activate(this.$slides.eq(i)),this.$pureview.show().redraw().addClass(this.options.className.active),this.$body.addClass(this.options.className.activeBody)},PureView.prototype.close=function(){function e(){this.$pureview.hide(),this.$body.removeClass(i.className.activeBody),this.resetScrollbar()}var i=this.options;this.$pureview.removeClass(i.className.active),this.$slides.removeClass(),transition?this.$pureview.one(transition.end,$.proxy(e,this)).emulateTransitionEnd(300):e.call(this)},PureView.prototype.checkScrollbar=function(){this.scrollbarWidth=UI.utils.measureScrollbar()},PureView.prototype.setScrollbar=function(){var e=parseInt(this.$body.css("padding-right")||0,10);this.scrollbarWidth&&this.$body.css("padding-right",e+this.scrollbarWidth)},PureView.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},UI.plugin("pureview",PureView),UI.ready(function(e){$("[data-am-pureview]",e).pureview()}),module.exports=PureView;