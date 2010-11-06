// Change the title tag and name throughout to distinguish between CSS3 Please! and hopefully avoid any conflicts
$('title').html('&iexcl;CSS3 Por Favor! The Cross-Browser CSS3 Rule Generator, &iexcl;Ahora en Colores Diferentes!');

$('html *').replaceText( /\bCSS3, Please! The Cross-Browser CSS3 Rule Generator\b/gi, '¡CSS3 Por Favor! The Cross-Browser CSS3 Rule Generator,<br />      ¡Ahora en Colores Diferentes!<br />      <a href="http://curtisblackwell.com" target="_blank">Curtis Blackwell&rsquo;s</a> forked version of <a href="http://css3please.com/" target="_blank">CSS3 Please!</a>' );


// Change please to por favor
$('html *').replaceText('please', 'por favor');

$('h1').html('&iexcl;<abbr title="Cascading Style Sheets Level 3">CSS3</abbr>, por favor!');


// Remove browser compatibility comments for quicker copy + paste
$('.rule .comment').not('.rule.footer .comment').each(function(){
	if($(this).html() != '/* */'){
		$(this).remove();
	}
});

// Removed spaces after declarations
$('html *').replaceText('; ', ';');


/*==REPLACE DEFAULT SANDBOX VALUES==*/

// .box_round
$('#box_round *').replaceText('12', '7');

// .box_shadow
$('#box_shadow b[g="1"]').replaceText('0', '1');
$('#box_shadow b[g="2"]').replaceText('4', '5');
$('#box_shadow b[g="3"]').replaceText('ffffff', '333');

// .box_gradient
$('#box_gradient *').replaceText('444444', '45a7f3');
$('#box_gradient *').replaceText('999999', '007dd1');

// .box_textshadow
$('#box_textshadow b[g="0"]').replaceText('1', '0');
$('#box_textshadow b[g="2"]').replaceText('3', '1');
$('#box_textshadow b[g="3"]').replaceText('888', 'a3d6fd');