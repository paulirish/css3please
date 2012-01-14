$(function(){

	var $toggle = $('#toggle_style');

	/*==TOGGLE STYLING==*/
	$('#sandboxwrap .off').click().toggle(
		// Change to my styling
		function() {
			$toggle.html('<link rel="stylesheet" href="css/light.css" />');
		},
		// ...and back to original CSS3, please! styling.
		function() {
			$toggle.empty();
		}
	);

});