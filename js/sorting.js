/* SORTING */ 

"use strict";
/* Isotope Sorting */
jQuery(function(){
  var $container = $('.portfolio_block');
  
  $container.isotope({
	itemSelector : '.element'
  });
	
  var $optionSets = $('#options .optionset'),
	  $optionLinks = $optionSets.find('a');

  $optionLinks.click(function(){
	var $this = $(this);
	// don't proceed if already selected
	if ( $this.parent('li').hasClass('selected') ) {
	  return false;
	}
	var $optionSet = $this.parents('.optionset');
	$optionSet.find('.selected').removeClass('selected');
	$optionSet.find('.fltr_before').removeClass('fltr_before');
	$optionSet.find('.fltr_after').removeClass('fltr_after');
	$this.parent('li').addClass('selected');
	$this.parent('li').next('li').addClass('fltr_after');
	$this.parent('li').prev('li').addClass('fltr_before');

	// make option object dynamically, i.e. { filter: '.my-filter-class' }
	var options = {},
		key = $optionSet.attr('data-option-key'),
		value = $this.attr('data-option-value');
	// parse 'false' as false boolean
	value = value === 'false' ? false : value;
	options[ key ] = value;
	if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
	  // changes in layout modes need extra logic
	  changeLayoutMode( $this, options )
	} else {
	  // otherwise, apply new options
	  $container.isotope(options);	  
	}	
	return false;	
  });
	$('.portfolio_block').find('img').load(function(){
		$container.isotope('reLayout');
	}); 
			
});

jQuery(window).load(function(){		
	"use strict";	
	jQuery('.portfolio_block').isotope('reLayout');
	setTimeout("jQuery('.portfolio_block').isotope('reLayout')", 500);		
});
jQuery(window).resize(function(){
	"use strict";
	jQuery('.portfolio_block').isotope('reLayout');	
});


jQuery.fn.portfolio_addon = function(addon_options) {
	"use strict";
	//Set Variables
	var addon_el = jQuery(this),
		addon_base = this,
		img_count = addon_options.items.length,
		img_per_load = addon_options.load_count,
		$newEls = '',
		loaded_object = '',
		$container = jQuery('.image-grid');
	
	jQuery('.btn_load_more').click(function(){
		$newEls = '';
		loaded_object = '';									   
		var loaded_images = $container.find('.added').size();
		if ((img_count - loaded_images) > img_per_load) {
			var now_load = img_per_load;
		} else {
			var now_load = img_count - loaded_images;
		}
		
		if ((loaded_images + now_load) == img_count) jQuery(this).parents('.load_more_cont').fadeOut();

		if (loaded_images < 1) {
			var i_start = 1;
		} else {
			var i_start = loaded_images+1;
		}

		if (now_load > 0) {
			// load more elements
			for (var i = i_start-1; i < i_start+now_load-1; i++) {
				loaded_object = loaded_object + '<div class="'+ addon_options.items[i].sortcategory +' element"><div class="img_block hover_img"><a href="'+ addon_options.items[i].url +'" class="prettyPhoto" data-rel="prettyPhoto[portfolio55]"><img src="'+ addon_options.items[i].src +'" alt="" /><span class="item_info"><span>'+ addon_options.items[i].title +'</span>'+ addon_options.items[i].item_info +'</span></a></div></div>';
			}			
			
			$newEls = jQuery(loaded_object);
			$container.isotope('insert', $newEls, function() {
				$container.isotope('reLayout');
				
				$("a[rel^='prettyPhoto'], .prettyPhoto").prettyPhoto();		
				$('a[data-rel]').each(function() {
					$(this).attr('rel', $(this).data('rel'));
				});												
			});			
		}
	});
}