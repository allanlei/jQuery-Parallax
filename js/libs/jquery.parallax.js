/*
Plugin: jQuery Parallax
Author: Allan Lei
*/

(function($){
	$.fn.parallax = function(layers, options){
		return this.each(function(){
			var settings = $.extend({}, {
				parallaxClass: "parallax",
				layerClass: "layer",
				animation: {
					duration: 150, 
					easing: "linear",
					queue: false
				}
			}, options);
			var $parallax = $(this).addClass(settings.parallaxClass);
			
			$.each(layers, function(selector, layerOptions){
				var layerSettings = $.extend({}, {
					xFn: null,
					yFn: null,
				}, layerOptions);
				$parallax.find(selector).addClass(settings.layerClass);
				
				$parallax.on("update.parallax", selector, function(){
					var $layer = $(this);
					var css = {};
					var viewport = {
						scroll: {
							left: $(window).scrollLeft(),
							top: $(window).scrollTop()
						},
						dimension: {
							width: $(window).width(),
							height: $(window).height()
						}
					};
				
					if(layerSettings.xFn){
						css["backgroundPositionX"] = $.proxy(layerSettings.xFn, $layer)(viewport);
					}
					
					if(layerSettings.yFn){
						css["backgroundPositionY"] = $.proxy(layerSettings.yFn, $layer)(viewport);
					}
					
					$layer.stop(true, false).animate(css, settings.animation);
				});
			});
			
			//Delagate from $parallax -> all registered layers
			$parallax.on("updates.parallax", function(){
				$(this).find("." + settings.layerClass).trigger("update.parallax");
			});
		});
    };
})(jQuery);