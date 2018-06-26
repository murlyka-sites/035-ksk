svg4everybody({
	nosvg: true, // shiv <svg> and <use> elements and use image fallbacks
	polyfill: true // polyfill <use> elements for External Content
});

mySwiper = new Swiper('.main-swiper', {
	slidesPerView: 1,
	pagination: {
		el: '.main-swiper__pagination',
		type: 'bullets',
		clickable: true
	},
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	allowTouchMove: false
});

$(".anchor").on("click", function (event) {
	//отменяем стандартную обработку нажатия по ссылке
	event.preventDefault();

	//забираем идентификатор бока с атрибута href
	var id  = $(this).attr('href'),

	//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
	
	//анимируем переход на расстояние - top за 1500 мс
	$('body,html').animate({scrollTop: top}, 1500);
});

videoSlider = new Swiper('.video-swiper', {
	slidesPerView: 1,
	pagination: {
		el: '.video-swiper__pagination',
		type: 'bullets',
		clickable: true
	},
	allowTouchMove: false,
	navigation: {
    nextEl: '.video-swiper__next',
    prevEl: '.video-swiper__prev',
  }
});
zoomSliderOptions = {
	slidesPerView: 1,
	// lazy: true,
  pagination: {
		el: '.zoom-swiper__pagination',
		type: 'bullets',
		clickable: true
	},
	allowTouchMove: false,
	navigation: {
    nextEl: '.zoom-swiper__next',
    prevEl: '.zoom-swiper__prev',
  }
};

zoomSlider = new Swiper('.zoom-swiper', zoomSliderOptions);
addSlideZoom('facade')
$(".overview-360-pagination").each(function() {
	let $item = $(this).find('.overview-360-pagination__item');

	$item.click(function() {
		if(!$(this).hasClass('overview-360-pagination__item_active')) {
			$item.removeClass('overview-360-pagination__item_active');
			$(this).addClass('overview-360-pagination__item_active')

			let code = $(this).data('code')
			$('.s-overview-360__frame').attr('src', 'https://p3d.in/e/' + code + '+load+bg-none+shading,dl,help,share,fs,spin,link,border-hidden')
		}
	});
});

function addSlideZoom(filter) {
	let slides = $('.s-zoom__content[data-filter='+ filter +'] .swiper-slide').clone(true);

	zoomSlider.removeAllSlides()

	slides.each(function() {
		zoomSlider.appendSlide(this);
	});

	zoomSlider.update();
}

$('.s-zoom__tab').click(function() {
	if($(this).hasClass('s-zoom__tab_active')) return

	let $wrap = $(this).parent();
	let filter = $(this).data('filter');

	$wrap.find('.s-zoom__tab').removeClass('s-zoom__tab_active');

	$(this).addClass('s-zoom__tab_active');

	addSlideZoom(filter)
});

$('.s-zoom__pr').click(function() {
	if($( window ).width() >= 768) return false;

	$.fancybox.open({
		src: $(this).data('zoom-image')
	})
})

$('.compositions__item').click(function() {
	let $wrap = $(this).parent();
	$wrap.find('.compositions__item').removeClass('compositions__item_active');

	$(this).addClass('compositions__item_active');
})
// $('.s-zoom__column_pr').zoom();
$(window).on('load', function() {

	$('.s-zoom__pr').zoom({
		url: function(e) {
			return $(e).data('zoom-image');
		},
		target: '.s-zoom__zoom'
		// zoomWindowPosition: 'zoom',
		// zoomWindowHeight: 515,
		// zoomWindowWidth: 515,
		// borderSize: 0,
		// easing: true,
		// scrollZoom : true
	});
});

$('.lazy').recliner({
	attrib: 'data-src',
	throttle: 300,
	threshold: 100,
	live: true
});

var wow = new WOW(
  {
    boxClass:     'wow',      // animated element css class (default is wow)
    offset:       0,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         true,       // act on asynchronously loaded content (default is true)
    callback:     function(box) {

    	$(box).attr('data', $(box).data('data'));
    	// alert($(box).data('data'));// the callback is fired every time an animation is started
      // the argument that is passed in is the DOM node being animated
    },
    scrollContainer: null // optional scroll container selector, otherwise use window
  }
);
wow.init();

$('.form-contact').submit(function() {
	let data = $(this).serialize();
	let action = $(this).attr('action');

	let $form = $(this)

	$.ajax({
		type: 'POST',
		url: action,
		data: data,
		success: function(data) {
			$form.trigger('reset');
			$form.find('.focus').removeClass('focus')

			$.fancybox.open({
				src: '#success'
			})
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});
});

$('.popup-order__form').submit(function() {
	let data = $(this).serialize();
	let action = $(this).attr('action');

	const $form = $(this)

	const $phone = $(this).find('.popup-order__field_phone'),
			$mail = $(this).find('.popup-order__field_mail'),
			$message = $(this).find('.popup-order__message');

	if(!$phone.val() && !$mail.val()) {
		$message.addClass('popup-order__message_open');
		return false
	}

	$.ajax({
		type: 'POST',
		url: action,
		data: data,
		success: function(data) {
			$message.removeClass('popup-order__message_open');
			$form.trigger('reset');
			$form.find('.focus').removeClass('focus')

			$.fancybox.open({
				src: '#success'
			})
		},
		error:  function(xhr, str){
			alert('Возникла ошибка: ' + xhr.responseCode);
		}
	});

	return false
})


$('.field, .popup-order__field').one('focus', function() {
	$(this).addClass('focus');
})

// $('.youtube').lazyYT();

$('.youtube').one('click', function() {
	const $frame = $('<iframe class="video-wrapper__frame" width="560" height="315" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen ></iframe>')
	const source = $(this).data('src');
	$frame.attr('src', source);


	$(this).append($frame);
	
})