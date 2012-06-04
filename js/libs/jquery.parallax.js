/**
	Plugin: jQuery Parallax
	Author: Allan Lei
	Forked from https://github.com/IanLunn/jQuery-Parallax
**/

(function($){
	$.fn.parallax = function(layers, options){
		return this.each(function(){
			var settings = $.extend({}, {
				parallaxClass: null,
				layerClass: null,
				offset: true,
				animation: {
					duration: 50, 
					easing: "linear",
					queue: false
				}
			}, options);
			
			var $parallax = $(this).addClass(settings.parallaxClass).data({
				"layers": []
			});
			
			$.each(layers, function(selector, layerOptions){
				var layerSettings = $.extend({}, {
					xFn: null,
					yFn: null,
				}, layerOptions);
				var $layer = $parallax.find(selector).addClass(settings.layerClass);
				$parallax.data("layers").push($layer);
				
				$parallax.on("update.parallax.layer", selector, function(){
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
			
			$parallax.on("update.parallax", function(){
				$.each($(this).data("layers"), function(index, $layer){
					$layer.trigger("update.parallax.layer");
				});
			});
		});
    };
})(jQuery);