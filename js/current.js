var fixed_menu = true;
window.jQuery = window.$ = jQuery;

/* Custom Scripts */
function calculateScroll() {
	"use strict";
	var contentTop      =   [];
	var contentBottom   =   [];
	var winTop      =   $(window).scrollTop();
	var rangeTop    =   200;
	var rangeBottom =   500;
	$('.navmenu li.scrollable').find('a').each(function(){
		contentTop.push( $( $(this).attr('href') ).offset().top );
		contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
	})
	$.each( contentTop, function(i){
		if ( winTop > contentTop[i] - rangeTop && winTop < contentBottom[i] - rangeBottom ){
			$('.navmenu li.scrollable')
			.removeClass('active')
			.eq(i).addClass('active');
			
			jQuery('.mobile_menu_wrapper').css({'display' : 'none'});			
		}
	})
};

function fullwidthslider() {
	"use strict";
	var full_slider_w = jQuery(window).width();
	if (jQuery(window).width() > 767) {
		var full_slider_h = jQuery(window).height();
	} 
	else {
		var full_slider_h = jQuery(window).width()*0.7;
	}
		
	jQuery('.full_slider .flexslider, .full_slider .flexslider li').css({'width': full_slider_w, 'height': full_slider_h});	
	jQuery('.full_slider, .full_slider .flexslider li img.slide_bg').attr('style', 'height: '+full_slider_h+'px');		
	jQuery('.full_slider').css({'min-height': full_slider_h + 'px'});
};

function fixedmenu() {
	"use strict";
	if (jQuery(window).scrollTop() > 0) {
		jQuery('#top').addClass('fixed_show');		
	} else {
		jQuery('#top').removeClass('fixed_show');
	}
}

jQuery(document).ready(function() {
	"use strict";
	
	fullwidthslider();
	
	calculateScroll();
	
	jQuery('nav.navmenu li a').css({'line-height': jQuery('#logo').height() + 'px'});
	
	//Fixed Menu
	fixedmenu();
	
	if (fixed_menu == true) {		
		jQuery(window).scroll(function() {
			fixedmenu();
		});
	}
	
	//MobileMenu
	jQuery('#top header').append('<a href="javascript:void(0)" class="menu_toggler"/>');
	jQuery('#top').append('<div class="mobile_menu_wrapper"><ul class="mobile_menu container"/></div>');	
	jQuery('.mobile_menu').html(jQuery('#top header').find('.navmenu').html());
	jQuery('.mobile_menu_wrapper').hide();
	jQuery('.menu_toggler').click(function(){
		jQuery('.mobile_menu_wrapper').slideToggle(300);
	});		
	
	$(window).scroll(function(event) {
		calculateScroll();
	});
	
	$('.navmenu ul li.scrollable a, .mobile_menu ul li.scrollable a, .next_section, .go_section, #logo a').click(function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - jQuery('#logo').height() - 27}, 1000);
		return false;
	});
		
	// prettyPhoto
	$("a[rel^='prettyPhoto'], .prettyPhoto").prettyPhoto();	
	
	$('a[data-rel]').each(function() {
		$(this).attr('rel', $(this).data('rel'));
	});
	
	//Iframe transparent
	$("iframe").each(function(){
		var ifr_source = $(this).attr('src');
		var wmode = "wmode=transparent";
		if(ifr_source.indexOf('?') != -1) {
		var getQString = ifr_source.split('?');
		var oldString = getQString[1];
		var newString = getQString[0];
		$(this).attr('src',newString+'?'+wmode+'&'+oldString);
		}
		else $(this).attr('src',ifr_source+'?'+wmode);
	});
	
	jQuery('.full_slider .flexslider li img.slide_bg').each(function(){
		jQuery(this).parent().attr('style', 'background-image:url('+$(this).attr('src')+');');		
	});
			
	jQuery('.flexslider').flexslider({
        animation: "fade",
		slideshowSpeed: 5000
    });
	
	// Skills
	if (jQuery(window).width() > 760) {
		jQuery('.skill_start').waypoint(function(){
			jQuery('.skill_div').each(function(){
				var set_width = jQuery(this).attr('data-percent');
				jQuery(this).stop().animate({'width' : set_width + '%', 'opacity' : 1},1500);
			});	
		},{offset: 'bottom-in-view'});
	} else {
		jQuery('.skill_div').each(function(){
			var set_width = jQuery(this).attr('data-percent');
			jQuery(this).stop().animate({'width' : set_width + '%', 'opacity' : 1},1000);
		});		
	};
	
	// Accordion
	jQuery('.shortcode_accordion_item_title').click(function(){
		if (!jQuery(this).hasClass('state-active')) {
			jQuery(this).parents('.shortcode_accordion_shortcode').find('.shortcode_accordion_item_body').slideUp('fast');
			jQuery(this).next().slideToggle('fast');
			jQuery(this).parents('.shortcode_accordion_shortcode').find('.state-active').removeClass('state-active');
			jQuery(this).addClass('state-active');
		}
	});	
	jQuery('.shortcode_accordion_item_title.expanded_yes').each(function( index ) {
		jQuery(this).next().slideDown('fast');
		jQuery(this).addClass('state-active');
	});	
	
	// Our Team
	$('.team_link').click(function(){
		var set_preview_meta = $(this).parents('.team_item').find('.team_info').html();				
		if ($(window).width() > 520) {
			$('html, body').stop().animate({scrollTop: $('.og-grid').offset().top-110}, 400);
		} else {
			$('html, body').stop().animate({scrollTop: $('.og-expander').offset().top-80}, 400);
		}
		$('.og-details').animate({'opacity' : '0'}, 100, function(){
			$(this).empty();
			$(this).parents('.og-expander').height(0);
			$(this).append(set_preview_meta);
			$(this).parents('.og-expander').height($(this).height() + 105 + 'px');			
			$(this).animate({'opacity' : '1'}, 100);
		});
		$('.team_link').removeClass('active');
		$(this).addClass('active');
	});
	$('.og-close').click(function(){
		$(this).parents('.og-expander').height(0);
		$('.og-details').animate({'opacity' : '0'}, 100, function(){
			$(this).empty();			
		});	
		$('.team_link').removeClass('active');
	});
	
	// Contact Form
	jQuery("#ajax-contact-form").submit(function() {
		var str = $(this).serialize();		
		$.ajax({
			type: "POST",
			url: "contact_form/contact_process.php",
			data: str,
			success: function(msg) {
				// Message Sent - Show the 'Thank You' message and hide the form
				if(msg == 'OK') {
					var result = '<div class="notification_ok">Your message has been sent. Thank you!</div>';
					jQuery("#fields").hide();
				} else {
					var result = msg;
				}
				jQuery('#note').html(result);
			}
		});
		return false;
	});	
			
});

jQuery(window).load(function(){
	"use strict";
		
	fullwidthslider();
	
	jQuery('.full_slider').removeClass('preloader');
	jQuery('.next_section, .hide').removeClass('hide');	
	
});

jQuery(window).resize(function(){	
	"use strict";	
	
	fullwidthslider();		
			
});
