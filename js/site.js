var ETSY = ETSY || {};
var results;

ETSY.search = (function(){
	var resultsArea = document.querySelector('.results ul');
	var _init = function(){
		$('.search-btn').on('click', function(e){
			e.preventDefault();
			var kw = $('.search-field').val();
			_load(kw);
		})
	};
	var _load = function(keywords){
		$('.loader').fadeIn(200);
		api_key = "nj6utllday5j59spvegtu2np";
	    etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords="+keywords+"&limit=10&includes=Images:1&api_key="+api_key;
	    resultsArea.style.display = "none";
	    $.ajax({
	        url: etsyURL,
	        dataType: 'jsonp',
	        success: function(data) {
	        	$('.loader').fadeOut(150);
	            if (data.ok) {
	                if (data.count > 0) {
	                	results = data.results;
	                    var dataLength = data.results.length;
	                    var tmpString = "";	
	                    resultsArea.innerHTML = tmpString;                    
	                    for (var i = 0; i < dataLength; i++) {
	                    	tmpString = '<li><div class="row"><div class="one column"><i class="icon-menu"></i></div><div class="three column">'+
	                    		'<img class="product-img" height="135" width="170" src="'+data.results[i].Images[0].url_170x135+'"></div>';
	                    	tmpString += '<div class="five column"><h2>'+data.results[i].title+
	                    		'</h2><p class="price">$'+data.results[i].price+'</p>';
                    		tmpString += '<a class="product-btn icon-link" href="'+data.results[i].url+'" target="_blank">Go to the product page</a></div>';
                    		tmpString += '<div class="three column"><a href="#" class="remove-btn icon-cancel">Remove</a>'+
                    			'<a href="javascript:void(0);" class="add-btn icon-basket">Add to cart</a><a href="#" class="view-more-btn icon-plus">View Description</a></div>';
	                    	tmpString += '<div class="twelve column details">'+data.results[i].description+'</div></li>';
	                    	resultsArea.innerHTML += tmpString;
	                    	$('.results ul').sortable({
								handle: '.icon-menu'
							});
							$('.remove-btn').on('click', function(e){
								e.preventDefault();
								_removeRow($(this));
							})
							$('.view-more-btn').on('click', function(e){
								e.preventDefault();
								_toggleDescription($(this));
							})
	                    };
	                } else {
	                    tmpString = '<div class="row no-results"><div class="twelve column"><p>No results were found for "'+keywords
	                    	+'", please try again with different words.</p></div></div>';
	                	resultsArea.innerHTML = tmpString;
	                }
	            } else {
	                tmpString = '<div class="row no-results"><div class="twelve column"><p>Ups! It seems like something went wrong, try again and if the error persists please contact us. Thanks you!</p></div></div>';
	                resultsArea.innerHTML = tmpString;
	            }
	        $('.results ul').fadeIn(250);
	        }
	    });
	};
	var _removeRow = function(btn){
		btn.closest('li').fadeOut(250, function(){
			$(this).remove();
		})
	}
	var _toggleDescription = function(btn){
		if(btn.hasClass('icon-plus')){
			btn.removeClass('icon-plus').addClass('icon-minus').text('Hide description');
		} else {
			btn.removeClass('icon-minus').addClass('icon-plus').text('View description');
		}
		btn.closest('li').find('.details').slideToggle(150);
	}
	return {
		init : _init,
		load : _load
	}
}()); 

ETSY.search.init();