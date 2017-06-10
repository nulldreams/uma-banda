jQuery(document).ready(function () {
	if ($('.cd-stretchy-nav').length > 0) {
		var stretchyNavs = $('.cd-stretchy-nav');

		stretchyNavs.each(function () {
			var stretchyNav = $(this),
				stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');

			stretchyNavTrigger.on('click', function (event) {
				event.preventDefault();
				stretchyNav.toggleClass('nav-is-visible');
			});
		});

		$(document).on('click', function (event) {
			(!$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span')) && stretchyNavs.removeClass('nav-is-visible');
		});
	}

	$('#portfolio').waypoint(function (direction) {
		if ($('#blog').css('color') == 'rgb(255, 255, 255)') {

			$('#blog').css('color', '#69327F')
			$('#portfolio').css('color', '#69327F')
		} else {
			$('#blog').css('color', 'white')
			$('#portfolio').css('color', 'white')
		}
	}, {
		offset: '-40%'
	})
	

//1790601277919488

});