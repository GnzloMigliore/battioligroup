/*
  Theme Name: Excelsure | Courier & Delivery Service HTML Template
  Theme URL: 
  Author: Capricorn_Theme
  Author URI: 
  Creation Date: 15 May 2020
  Version: 1.0
*/

/* [Table of Contents]

* 01. Owl Caserol
        - Home Slider
        - Testimonial Slider
        - Clients Slider
        - Testimonial Slider#2
        - Blog Slider
		- Service Slider 
  02. Sub-menu Active Background 
  03. Counter 
  04. Navigation 
  05. Smooth Scroll 
  06. Scroll to the Top
  07. Sticky Area 
  08. Slicknav
  09. Preloader 

*/

(function ($) {
	"use strict";

	var $window = $(window)

	// Home Slider  
	$("#home-slider").owlCarousel({
		loop: true,
		items: 1,
		dots: false,
		nav: true,
		autoplayTimeout: 10000,
		smartSpeed: 2000,
		autoHeight: false,
		touchDrag: true,
		mouseDrag: true,
		margin: 0,
		autoplay: true,
		slideSpeed: 600,
		navText: ['<i class="las la-angle-left"></i>', '<i class="las la-angle-right"></i>'],
		responsive: {
			0: {
				items: 1,
				nav: false,
				dots: false,
			},
			600: {
				items: 1,
				nav: false,
				dots: false,
			},
			768: {
				items: 1,
				nav: false,
				dots: false,
			},
			1100: {
				items: 1,
				nav: true,
				dots: false,
			}
		}
	});

	// Testimonial Slider    
	$("#testimonial-block-slider").owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		nav: true,
		autoplayTimeout: 10000,
		smartSpeed: 2000,
		autoHeight: false,
		touchDrag: true,
		mouseDrag: true,
		margin: 0,
		autoplay: true,
		slideSpeed: 600,
		navText: ['<i class="las la-angle-left"></i>', '<i class="las la-angle-right"></i>'],
		responsive: {
			0: {
				items: 1,
				nav: false,
				dots: true,
			},
			600: {
				items: 1,
				nav: false,
				dots: true,
			},
			768: {
				items: 1,
				nav: false,
				dots: true,
			},
			1100: {
				items: 1,
				nav: false,
				dots: true,
			}
		}
	});

	// Clients Slider    
	$("#clients-slider").owlCarousel({
		loop: true,
		items: 5,
		dots: false,
		nav: false,
		autoplayTimeout: 10000,
		smartSpeed: 2000,
		autoHeight: false,
		touchDrag: true,
		mouseDrag: true,
		margin: 30,
		autoplay: true,
		slideSpeed: 600,
		navText: ['<i class="las la-angle-left"></i>', '<i class="las la-angle-right"></i>'],
		responsive: {
			0: {
				items: 1,
				nav: false,
				dots: false,
			},
			600: {
				items: 1,
				nav: false,
				dots: false,
			},
			768: {
				items: 3,
				nav: false,
				dots: false,
			},
			1100: {
				items: 5,
				nav: false,
				dots: false,
			}
		}
	});


	// Testimonial Slider#2 

	$('.team-carousel').owlCarousel({
		items: 1,
		margin: 30,
		dots: false,
		nav: false,
		loop: true,
		autoplay: true,
		responsiveClass: true,
		responsive: {
			575: {
				items: 1,
				nav: false,
				dots: false,
			},

			767: {
				items: 2,
				nav: false
			},

			990: {
				items: 2,
				loop: true,

			},
			1200: {
				items: 3,
				dots: true,
				loop: true,
			}
		}
	});

	// Blog Slider    
	$("#blog-slider").owlCarousel({
		loop: true,
		items: 1,
		dots: false,
		nav: false,
		autoplayTimeout: 10000,
		smartSpeed: 2000,
		autoHeight: false,
		touchDrag: true,
		mouseDrag: true,
		margin: 0,
		autoplay: false,
		slideSpeed: 600,
		responsive: {
			0: {
				items: 1,
				nav: false,
				dots: false,
			},
			600: {
				items: 1,
				nav: false,
				dots: false,
			},
			768: {
				items: 1,
				nav: false,
				dots: false,
			},
			1100: {
				items: 1,
				nav: false,
				dots: false,
			}
		}
	});

	// Service Slider    
	$("#service-slider").owlCarousel({
		loop: true,
		items: 1,
		dots: true,
		nav: false,
		smartSpeed: 2000,
		autoHeight: false,
		touchDrag: true,
		mouseDrag: true,
		margin: 30,
		autoplay: true,
		slideSpeed: 600,
		responsive: {
			0: {
				items: 1,
				nav: false,
				dots: false,
			},
			600: {
				items: 1,
				nav: false,
				dots: false,
			},
			768: {
				items: 1,
				nav: false,
				dots: false,
			},
			1100: {
				items: 1,
				nav: false,
				dots: true,
			}
		}
	});

	// Sub Menu Active Background

	$("#cssmenu ul ul li").on("mouseover", function () {
		$("#cssmenu ul ul li").removeClass("active");
		$(this).addClass("active");
	});


	// Counter JS

	if ($('.counter').length) {
		$('.counter').counterUp({
			delay: 20,
			time: 2000
		});
	}

	// Navigation/Menu 

	$("#cssmenu").menumaker({
		title: "Menu",
		format: "multitoggle"
	});

	// Smooth Scroll 
	smoothScroll.init();

	// Scroll to the Top 
	$(window).on("scroll", function () {
		if ($(this).scrollTop() > 6000) {
			$('.go-top').fadeIn(200);
		} else {
			$('.go-top').fadeOut(200);
		}
	});

	$('.go-top').on("click", function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, 1500);
	});


	// Sticky Area 
	$('.sticky-area').sticky({
		topSpacing: 0,
	});

	// Slick Nav

	$(".navigation").slicknav({
		prependTo: ".responsive-menu-wrap",

	});

	// Preloader

	$window.on('load', function () {
		$('.status').fadeOut();
		$('.preloader').delay(350).fadeOut('slow');
	});



})(jQuery);
