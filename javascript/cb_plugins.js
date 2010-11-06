// remap jQuery to $
(function($){
$(document).ready(function(){


	/*==TOGGLE STYLING==*/
	$('#sandboxwrap .off').click().toggle(
		// Change to my styling
		function(){
			$('#toggle_style').html('<link rel="stylesheet" href="css/light.css" type="text/css" media="screen" />');
		},
		// ...and back to original CSS3, please! styling.
		function(){
			$('#toggle_style *').remove();
		}
	);


});
})(window.jQuery);