(function ($) {
	let defaults = {

	};

	$.zoom = function (options, that) {
		let settings = $.extend({}, defaults, options || {});
		let $target = settings.target && $($(settings.target).get(0)) || that;
		let $source = $(that);
		let	url = (typeof settings.url === 'function') ? settings.url(that) : settings.url;
		let naturalSize = {
			width: $source.get(0).naturalWidth,
			height: $source.get(0).naturalHeight
		}
		
		$source.on('mouseenter', start);
		$source.on('mousemove', move);
		$source.on('mouseleave', stop);

		function init() {
			$target.css({
				background: 'url(' + url + ') center / auto'
			});
		}

		function start(e) {
			init(e);
			move(e);
		}

		function move(e) {
			let kWidth = 960 / $('.s-zoom__column_pr').width() * 2;
			let kHeight = 540 / $('.s-zoom__column_pr').height() * 2;
			let left = (e.offsetX);
			let top  = (e.offsetY);
			let viewport = {
				width: $target.width(),
				height: $target.height()
			};

			console.log($('.s-zoom__column_pr').width(), $('.s-zoom__column_pr').height(), kWidth, kHeight)


			let maxHeight = $('.s-zoom__column_pr').height() - (viewport.height / kHeight);
			let maxWidth = $('.s-zoom__column_pr').width() - (viewport.width / kWidth);
			

			top = Math.max(Math.min(top - (viewport.height / (kWidth * 2)), maxHeight) , 0) ;
			left = Math.max(Math.min(left - (viewport.width / (kWidth * 2)), maxWidth) , 0) ;
			console.log(maxHeight , maxWidth,	top, left)
			$target.css({
				backgroundPosition: (left * -kWidth) + 'px ' + (top * -kHeight) + 'px'
			})
		}

		function stop() {
			$target.css({backgroundImage: 'none'})
		}
	}
	
	

	

	$.fn.zoom = function (options) {
		return this.each(function () {
			$.zoom(options, this)
			
		});
	};

	$.fn.zoom.defaults = defaults;
}(window.jQuery))