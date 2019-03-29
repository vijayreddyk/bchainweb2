/*******************************************************************************
 * Project Sales App, all source code and data files except images,
 * Copyright 2008-2015 Grit-Innovation Software Pvt. Ltd., India
 *
 * Permission is granted to Magma Fin Corp. to use and modify as they see fit.
 *******************************************************************************/
(function($){
	$.fn.ctrlCmd = function(key) {
		var allowDefault = true;
		if (!$.isArray(key)) {
			key = [key];
		}
		return this.keydown(function(e) {
			for (var i = 0, l = key.length; i < l; i++) {
				if(e.keyCode === key[i].toUpperCase().charCodeAt(0) && e.metaKey) {
					allowDefault = false;
				}
			};
			return allowDefault;
		});
	};
	$.fn.disableSelection = function() {

		this.ctrlCmd(['a', 'c']);

		return this.attr('unselectable', 'on')
		.css({'-moz-user-select':'-moz-none',
			'-moz-user-select':'none',
			'-o-user-select':'none',
			'-khtml-user-select':'none',
			'-webkit-user-select':'none',
			'-ms-user-select':'none',
			'user-select':'none'})
			.bind('selectstart', false);
	};

})(jQuery);
