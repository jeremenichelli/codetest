function ResultsViewModel() {
    var self = this;
    self.searchResults = ko.observableArray([]);

	var ETSY = ETSY || {};
	var results;

	ETSY.search = (function(){
		var resultsArea = $('.results');
		var toolbar = $('.toolbar');
		var offset = 0;
		var slug;
		var _init = function(){
			$('.search-btn').on('click', function(e){
				e.preventDefault();
				offset = 0;
				var kw = $('.search-field').val();
				$('.prev').hide();
				_load("?keywords="+kw+"&limit=10&includes=Images:1&api_key=nj6utllday5j59spvegtu2np");
			});
			$('.next').on('click', function(e){
				e.preventDefault();
				offset = offset+10;
				_load(window.location.hash.split('#')[1].split('&offset')[0]+"&offset="+offset);
				$('.prev').show();
			});
			$('.prev').on('click', function(e){
				e.preventDefault();
				offset = offset-10;
				_load(window.location.hash.split('#')[1].split('&offset')[0]+"&offset="+offset);
				if (offset==0){
					$(this).hide();
				}
			});
			$('.sort-less-price').on('click', function(e){
				e.preventDefault();
				_sortLessPrice();
			});
			$('.sort-more-price').on('click', function(e){
				e.preventDefault();
				_sortMorePrice();
			});
			$('.sort-less-name').on('click', function(e){
				e.preventDefault();
				_sortLessName();
			});
			$('.sort-more-name').on('click', function(e){
				e.preventDefault();
				_sortMoreName();
			});
			$(window).on('load', function(){
				_loadHash();
			});
		};
		var _sortLessPrice = function(){
			self.searchResults.sort(function(a, b){
				var aPrice = parseInt(a.price);
				var bPrice = parseInt(b.price);
				if (aPrice > bPrice)
			      return 1;
			    if (aPrice < bPrice)
			      return -1;
			    // a must be equal to b
			    return 0;
			});
		};
		var _sortMorePrice = function(){
			self.searchResults.sort(function(a, b){
				var aPrice = parseInt(a.price);
				var bPrice = parseInt(b.price);
				if (aPrice < bPrice)
			      return 1;
			    if (aPrice > bPrice)
			      return -1;
			    // a must be equal to b
			    return 0;
			});
		};
		var _sortLessName = function(){
			self.searchResults.sort(function(a, b){
				if (a.title > b.title)
			      return 1;
			    if (a.title < b.title)
			      return -1;
			    // a must be equal to b
			    return 0;
			});
		};
		var _sortMoreName = function(){
			self.searchResults.sort(function(a, b){
				if (a.title < b.title)
			      return 1;
			    if (a.title > b.title)
			      return -1;
			    // a must be equal to b
			    return 0;
			});
		};
		var _load = function(slug){
			$('.loader').fadeIn(200);
		    etsyURL = "https://openapi.etsy.com/v2/listings/active.js"+slug;
		    resultsArea.hide();
		    toolbar.hide();
		    $.ajax({
		        url: etsyURL,
		        dataType: 'jsonp',
		        success: function(data) {
		        	$('.loader').fadeOut(150);
		            if (data.ok) {
		                if (data.count > 0) {
		                    var dataLength = data.results.length;
		                    self.searchResults.removeAll();
		                	for (var i = 0; i < dataLength; i++) {
		                		self.searchResults.push(data.results[i]);
		                	};
							$('.remove-btn').on('click', function(e){
								e.preventDefault();
								_removeRow($(this));
							})
							$('.view-more-btn').on('click', function(e){
								e.preventDefault();
								_toggleDescription($(this));
							})
	            			toolbar.fadeIn(150);
	            			window.location.hash = slug;
		                } else {
		                    resultsArea.html('<div class="row no-results"><div class="twelve column"><p>No results were found for "'+keywords
		                    	+'", please try again with different words.</p></div></div>');
		                }
		            } else {
		                resultsArea.html('<div class="row no-results"><div class="twelve column"><p>Ups! It seems like something went wrong, try again and if the error persists please contact us. Thank you!</p></div></div>');
		            }
		        resultsArea.fadeIn(250);
		        }
		    });
		};
		var _removeRow = function(btn){
			btn.closest('li').fadeOut(250, function(){
				$(this).remove();
			})
		};
		var _toggleDescription = function(btn){
			if(btn.hasClass('icon-plus')){
				btn.removeClass('icon-plus').addClass('icon-minus').text('Hide description');
			} else {
				btn.removeClass('icon-minus').addClass('icon-plus').text('View description');
			}
			btn.closest('li').find('.details').slideToggle(150);
		};
		var _loadHash = function(){
			var hash = window.location.hash.split('#');
			if (hash.length > 1)
				_load(hash[1]);
		};
		return {
			init : _init,
			load : _load,
		}
	}()); 

	ETSY.search.init();

}

ko.applyBindings(new ResultsViewModel());

