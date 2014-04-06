if ( /iPad/i.test(navigator.userAgent) ) { 
	jQuery("html").addClass("tablet");
} else if ( /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ) { 
	jQuery("html").addClass("mobile");
} else {
	jQuery("html").addClass("desktop");
}

jQuery(document).ready(function($) {

	/* fix openbeta signup on blog */
	function fixElement() {
		var $cache = $('#sidebar iframe'); 
		if ($(window).scrollTop() > 100) $cache.addClass('stuck'); 
		else $cache.removeClass('stuck'); 
	}
	$(window).scroll(fixElement);
	fixElement();

	/* infield label */
	$(".infieldlabel").inFieldLabels();

	/* fade in content (to hide content flash) */
	$('#wrap').fadeIn(500);

	/* allow user to click through slides */
	$(".desktop .slide, .tablet .slide").each(function() {
		$(this).click(function(e) {
			if (e.target.nodeName == "A") {
				$('html, body').animate({ scrollTop: $( $(event.target).attr('href') ).offset().top }, 800);
				e.preventDefault();
			} else {
				if ( $(this).attr("id") == "slide3" ) {
					$('html, body').animate({ scrollTop: $($('#purpose')).offset().top - 140 }, 800);
				} else {
					$('html, body').animate({ scrollTop: $($(this).next('.slide')).offset().top }, 800);
				}
			}
		});
	});

	/* navigation dots for slides */
	$('.desktop .slide-nav a').click(function(e) {
		$('html, body').animate({ scrollTop: $($(this).attr('url')).offset().top }, 800);
		e.preventDefault();
	});

	/* toggle faded classes on cards */
	$('.legend li').unbind('click').click(function() {
		var legendParent = $(this).parents('section').attr('id');
		var legendType = $(this).attr('class');
		$(this).addClass('on');
		$(this).siblings('li').removeClass('on');

		var firstItem = $("#products .cards ." + legendType).first(); // smooth scroll down to the first instance of this element - just for products
		if (firstItem.length != 0) $('html, body').animate({scrollTop: $(firstItem).offset().top - 160}, 800);

		$('#' + legendParent + ' .cards li').each(function() {
			if ( $(this).hasClass(legendType) || legendType == "all" ) {
				$(this).addClass('on');
			} else {
				$(this).removeClass('on');
			}
		});
	});

	/* make sure all # links animate below toolbar */
	$('.jump, a[href^="#"]').unbind('click');
	$('.jump, a[href^="#"]').click(function(e) {
		if ( $(this).parents('.slides-nav').attr('class') != 'slides-nav' ) { // if it's not a slide
			$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top - 140 }, 800);
			$(this).addClass('current');
			e.preventDefault();
		}
	});

	/* jump to appropriate place on page from nav-links */
	$('#bottom .nav-link').click(function() {
		var thisHref = $(this).children('a').attr('href');
		$('html, body').animate({ scrollTop: $(thisHref).position().top - 146 }, 'slow');
	});

	/* parallax goodness */
	$('.desktop section[data-type="background"]').each(function(){
		$window = $(window);
		var $bgobj = $(this);
		$(window).scroll(function() {
			var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
			var coords = '50% '+ yPos + 'px';
			$bgobj.css({ backgroundPosition: coords });
		}); 
	});

	/* stretch first slide */
	$("#slide1").height($(window).height());
	$(window).resize(function() {
		$("#slide1").height($(window).height());
	});

	/* stretch last slide on mobile */
	$(".mobile #slide3, .tablet #slide3").height($(window).height());

	/* turn on/off current nav links */
	$('#purpose').waypoint(function(direction) {
		if (direction == 'down') {
			$(document).scroll(function() {
				var cutoff = $(window).scrollTop();
				var curSec = $.find('.current');
				var curID = $(curSec).attr('id');
				var curNav = $.find('a[name='+curID+']');
				$('.section').each(function() {
					if ($(this).offset().top + $(this).height() > cutoff + 160) {
						$('.toolbar a').removeClass('current')
						$('.toolbar a[href="#'+ $(this).attr('id') +'"]').addClass('current');
						return false;
					}
				});
			});
		} else {
			$(document).scroll(function() {
				var cutoff = $(window).scrollTop();
				var curSec = $.find('.current');
				var curID = $(curSec).attr('id');
				var curNav = $.find('a[name='+curID+']');
				$('.section').each(function() {
					if ($(this).offset().top + $(this).height() > cutoff + 160) {
						$('.toolbar a[href="#'+ $(this).attr('id') +'"]').removeClass('current');
						return false;
					}
				});
			});
		}
	
	}, { offset: 215 });

	/* highlight current nav item if user clicks */
	$('.toolbar a').click(function() {
		$(this).parent('li').siblings('li').children('a').removeClass('current');
		$(this).parent('li').children('a').addClass('current');
	});

	/* close announcement box */
	$('.sprites-x').click(function(e) {
		if ($('#products .announcement').hasClass('off')) {
			$('#products .announcement').animate({
				right: "+=412"
			}, 500).removeClass('off');
		} else {
			$('#products .announcement').animate({
				right: "-=412"
			}, 500).addClass('off');
		}
		e.preventDefault();
	});

	/* announcement box scrolls with page */
	if ( $('.announcement').length != 0 ) {
		var top = $('.announcement').offset().top - parseFloat($('.announcement').css('marginTop').replace(/auto/, 0));
		$(window).scroll(function (event) {
			var y = $(this).scrollTop();
			if (y >= top) {
				$('.announcement').addClass('fixed');
			} else {
				$('.announcement').removeClass('fixed');
			}
		});
	}

});