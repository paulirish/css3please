window.cssMath = {
	/* Number rounded by Length */
	round: function (n, l) {
		l = Math.pow(10, l);

		return Math.round(n * l) / l;
	},
	/* X and Y coordinates to Rotation and Strength */
	xy2rs: function (x, y) {
		return {
			r: this.round(Math.atan2(x, y * -1) * 180 / Math.PI, 3),
			s: this.round(Math.sqrt((x * x) + (y * y)), 3)
		};
	},
	/* Rotation and Strength to X and Y coordinates */
	rs2xy: function (r, s) {
		return {
			x: this.round(Math.sin(r * Math.PI / 180) * s, 3),
			y: this.round(Math.cos(r * Math.PI / 180) * s * -1, 3)
		};
	}, 
	/* Rotation to Degree */
	r2d: function (r) {
		return r * 90;
	},
	/* Degree to Rotation */
	d2r: function (d) {
		return d / 90;
	},
	
	/* Degrees to Radians */
	d2rad: function (d){
        return (d) * Math.PI / 180;
    },
	
	/* Radians to Degrees */
	rad2d: function (r) {
		return (180*r)/Math.PI + 360;
	},
	
	/* matrix to IE String */
	m2s: function (M) {
		return 'M11=' + M.e(1, 1) + ', M12=' + M.e(1,2) + ', M21=' + M.e(2,1) + ', M22=' + M.e(2,2);
	},
	
	s2m: function (s) {
		
		var entries = s.split(',');
		var values = new Array();
		
		for (var i=0; i<entries.length; i++) {
			var e = entries[i];
			
			values[i] = e.split('=')[1];
		}
		
		return $M([[values[0], values[1]], [values[2], values[3]]]);
	},
	
	/* Hexadecimal to Decimal */
	h2d: function (h) {
		return '' + parseInt(h, 16);
	},
	/* Decimal to Hexadecimal */
	d2h: function (d) {
		var h = '0' + parseInt(d, 10).toString(16);
		return h.substr(h.length-2,2).toUpperCase();
	},
	/* Decimal Array to Hexadecimal Array */
	da2ha: function (da) {
		var a,
		ha = [];
		while ((a = da.shift())) {
			ha.push(this.d2h(a));
		}
		return ha;
	},
	/* Hexadecimal Array to Decimal Array */
	ha2da: function (ha) {
		var a,
		da = [];

		while ((a = ha.shift())) {
			da.push(this.h2d(a));
		}

		return da;
	},
	/* Alpha + Decimal Array to Alpha + Hexadecimal Array */
	ada2aha: function (da) {
		var a,
		ha = [];

		for (var i=0; i < da.length; i++) {
		    if (i==3){ 
				da[i] *= 255; // alpha bit of the rgba!
			}
			ha.push( this.d2h( da[i] ) );
		}

		ha.splice(0, 0, ha.pop());

		return ha;
	},
	/* Alpha + Hexadecimal Array to Alpha + Decimal Array */
	aha2ada: function (ha) {
		var a,
		da = [];

        for (var i=0; i < ha.length; i++) {
		    if (i==2){  // alpha bit of the rgba!
				var dec = parseInt(ha[i],16) / 256;
				var num = Math.round(dec * 100) / 100;
		    } else {
		    	var num = this.h2d( ha[i] );
		    }
			da.push(  num );
		}
		
		da.splice(0, 0, da.pop());

		return da;
	},
	/* Hexadecimals to Short Hexadecimals */
	h2sh: function (h) {
		return h.replace(/^#?([A-z0-9])\1(.)\2(.)\3$/, '#$1$2$3');
	},
	/* Hexadecimals to Long Hexadecimals */
	h2lh: function (h) {
		return h.replace(/^#?([A-z0-9])(.)(.)$/, '#$1$1$2$2$3$3');
	},
	/* Color channels to Hexadecimals */
	c2h: function (c) {
		return '#' + this.da2ha(c.replace(/^rgb\s?\(\s?(.*?)\s?\)$/, '$1').split(/,\s?/)).join('');
	},
	/* Hexadecimals to Color channels */
	h2c: function (h) {
		return 'rgb(' + this.ha2da(h.replace(/^#?(.{1,2})(.{1,2})(.{1,2})$/, '$1,$2,$3').split(',')).join(', ') + ')';
	},
	/* Alpha + Color channels to Alpha + Hexadecimals */
	ac2ah: function (c) {
		return '#' + this.ada2aha(c.replace(/^rgba\s?\(\s?(.*?)\s?\)$/, '$1').split(/,\s?/)).join('');
	},
	/* Alpha + Hexadecimals to Alpha + Color channels */
	ah2ac: function (h) {
		return 'rgba(' + this.aha2ada(h.replace(/^#?(.{1,2})(.{1,2})(.{1,2})(.{1,2})$/, '$3,$4,$1,$2').split(',')).join(', ') + ')';
	},
	
	/* Are two numbers close enough.  Needed for matrices because of rounding errors in JavaScript */
	areClose: function (x, y) {
		if (Math.abs(x-y) < 0.001) {
			return true;
		} else {
			return false;
		}
	},
	
	eval: {
		/* String to Hexadecimals */
		s2Hex: function (value, allValues) {
			if (value.indexOf('rgb') > -1) {
				return '#' + cssMath.da2ha(value.replace(/^rgb\s?\(\s?(.*?)\s?\)$/, '$1').split(/,\s?/)).join('');
			}
			else {
				return cssMath.h2lh(value);
			}
		},
		// dont include an AA in this hex
		shortHex : function (value, allValues) {
			
			return '#'+cssMath.eval.s2Hex(value,allValues).replace(/^#../,'');
			
		},
		/* String to Alpha + Hexadecimals */
		s2aHex: function (value, allValues) {
			if (value.indexOf('rgba') > -1) {
				return cssMath.ac2ah(value);
			} else if (value.indexOf('rgb') > -1){
			    return cssMath.ac2ah(value);
			}
			else {
				return value;
			}
		},
		/* Hexadecimals to Short Hexadecimals */
		sHex: function (value, allValues) {
			return cssMath.h2sh(value);
		},
		/* Hexadecimals to Long Hexadecimals */
		lHex: function (value, allValues) {
			return cssMath.h2lh(value);
		},
		/* Hexadecimals to Color channels */
		ch: function (value, allValues) {
			return cssMath.h2c(value);
		},
		/* Alpha + Hexadecimals to Alpha + Color channels */
		aCh: function (value, allValues) {
			return cssMath.ah2ac(value);
		},
		s2deg: function (value, allValues) {
			
			if (value > 4) {
				return value;
			}
			else {
				return cssMath.round(cssMath.r2d(value), 3);
			}
		},
		rot: function (value, allValues) {
			return cssMath.round(cssMath.d2r(value), 3);
		} ,
		
		matrix2deg: function (value, allValues) {
			
			
			var M = cssMath.s2m(value);
			var asin1 = Math.asin(M.e(2,1));
			var asin2 = Math.asin(M.e(1,2));
			var cos = Math.acos(M.e(1,1));
			
			
			if (cssMath.areClose(asin1, -asin2)  && cssMath.areClose(M.e(1,1),M.e(2,2))) {
				return asin1;
			} else {
				return "NaN";
			}
		},
		
		deg2matrix: function (value, allValues) {
			var num = cssMath.d2rad(value);
			
       		return cssMath.m2s(Matrix.Rotation(num));
		}
		
		
	}
};

window.generator = {
    
    $sandbox : undefined, // set in doc ready below
    
	styleAllRules: function (ruleList) {
		var item = -1,
		innerHTML;

		while (++item < ruleList.length) {
			innerHTML = ruleList[item].innerHTML;

			innerHTML = innerHTML.replace(/(\/\*((\n|.)+)\*\/)/, '<span class="comment">$1</span>');
			innerHTML = innerHTML.replace(/{((\n|.)+)}/, '{<span class="declaration-block">$1</span>}');
			innerHTML = innerHTML.replace(/(.*?) {/, '<span class="selector">$1</span> <span class="bracket">{</span>');
			// this next one matches the triple line @font-face rule
			innerHTML = innerHTML.replace(/(.*?):\s?(.*?\n.*?\n.*);/mg, '<span class="declaration"><span class="property">$1</span>: <span class="value">$2</span>;</span>');
			innerHTML = innerHTML.replace(/(.*?):\s?(.*?);/mg, '<span class="declaration"><span class="property">$1</span>: <span class="value">$2</span>;</span>');
			innerHTML = innerHTML.replace(/}/m, '<span class="bracket">}</span>');

			ruleList[item].innerHTML = innerHTML;
		}
	},
	makeEditable: function (editList) {
		var item = -1;

		while (++item < editList.length) {
			editList[item].innerHTML = '<span>' + editList[item].innerHTML + '</span><input type="text" value="' + editList[item].innerHTML + '" />';
		}
	},
	collectAllValues: function (rule) {
		var item = -1,
		editables = rule.getElementsByTagName('b'),
		values = [];

		while (++item < editables.length) {
			values.push(
				{
					styleProperty: editables[item].parentNode.parentNode.getElementsByTagName('span')[0].innerHTML.replace(/^\s+|\s+$/g, ''),
					styleValue: editables[item].parentNode.parentNode.getElementsByTagName('span')[1][(document.all) ? 'innerText' : 'textContent'].replace(/^\s+|\s+$/g, ''),
					node: editables[item].getElementsByTagName('span')[0],
					group: editables[item].getAttribute('g'),
					output: editables[item].getAttribute('o'),
					value: editables[item].getElementsByTagName('span')[0].innerHTML
				}
			);
		}

		return values;
	},
	grabAndSet : function(elem){
	    
        var item = -1;
        allValues = generator.collectAllValues( $(elem).closest('.declaration-block')[0] || $(elem).closest('.rule')[0] ),
        group = elem.parentNode.getAttribute('g'),
        input = elem.parentNode.getAttribute('i'),
        value = elem.value,
        itemValue = '';

        if (input) {
        	value = cssMath.eval[input](value, allValues);
        }

        while (++item < allValues.length) {
        	if (allValues[item].group == group) {
        		if (allValues[item].output) {
        			itemValue = cssMath.eval[ allValues[item].output ](value, allValues);
        		} else {
        			itemValue = value; 
        		}

        		allValues[item].node.innerHTML = itemValue;

                
        	}
        }
        
        generator.applyStyles(elem);
        getFilters();
        return value;
	}, // eo grabAndSet()
	
	// if no elem is passed in, all styles are applied.
	applyStyles : function(elem){
	    
	    if (!elem){
	        $(".selector").closest('pre').each(function(){
	            generator.applyStyles(this);
	        })
	        return;
	        
	    }
	    
	    var css = $(elem).closest("pre").not('.comment').text().replace(/(-ms-)?filter:[^\;]*\;/g, ''),
	        wrap = $(elem).closest('.rule_wrapper'),
	        name = wrap.attr('id');
		   
		//alert(css);
	    $('style.'+name).remove();	
	    
		if (name){
			var ss = document.createElement('style');
			ss.setAttribute("type", "text/css");
			ss.className = name;

			if (ss.styleSheet && name !== 'box_webfont') {  
				// IE crashes hard on @font-face going in through cssText
				ss.styleSheet.cssText = css;
			} else {               
				var tt1 = document.createTextNode(css);
				ss.appendChild(tt1);
			}
			document.body.appendChild(ss);
        }

	    name && generator.$sandbox.toggleClass(name, !wrap.hasClass('commentedout') );
		
	}
};

function copypasta(){
	var isFlashInstalled = document.documentElement.className == 'flash';

  if (isFlashInstalled) {
		$('.rule_wrapper').each(function(){
		    var name = this.id,
		        zc = new ZeroClipboard.Client(),
		        elem = $(this).find('a.cb');
   
		    if (!elem.length) return;
       
		    zc.glue( elem[0], elem[0].parentNode );
	    	zc.addEventListener( 'mouseDown', (function(){
	    	    return function(client) {
	    	      var text = elem.closest("pre").next().find('.declaration-block').text();
	    	      text = text.replace(/\/\*.*?\*\//g,''); // strip comments
	    		    zc.setText( text );
	    		    $(elem).fadeOut(50).fadeIn(300)
	    		}
	    	})());  
		});
	}
}



function addFilter (obj, filterName, filterValue){
    
    var filter;
	
   
    var comma = ", ";
    
    if (obj.filters.length == 0) {
        comma = "";
    }
	
	// remove existing filter.
	var re = new RegExp("(\\,\\s*)?progid:" + filterName + "\\([^\\)]*\\)")
   
    obj.style.filter = obj.style.filter.replace(re, '') + comma + "progid:" + filterName + "(" + filterValue + ")";

    
	return;
    filter = obj.filters.item(filterName);
    
	
    
    return filter;
}

	
function getFilters () {
	if (!document.body.filters) {
		return;
	}
	
	$('#sandbox')[0].style.filter = "";
	$('#sandbox')[0].style.zoom = "100%";
	
	
	$('.filter').each(function(){
		
		if (!$(this).closest('.rule_wrapper').hasClass('commentedout')) {
			
			var text = $(this).text().replace(/\)/, '').split('(');
			addFilter($('#sandbox')[0], text[0].replace(/progid:/, '').trim(), text[1]);
		}
	})

}


$(document).ready(function () {
    
    generator.$sandbox = $('#sandbox');

	generator.styleAllRules( $('pre').not('.footer').get() );

	generator.makeEditable(document.getElementsByTagName('b'));
	
	//clearFilter();
	
	


	$('pre').each(function () {
	    
			$(this).find('b span').bind('click',function (e) {
				
					if ($(this).parent().attr('readonly')==='') return;

			        // basically calculating where to place the caret.
                    var wrap = $(document.elementFromPoint(e.pageX-$(document).scrollLeft(),e.pageY-$(document).scrollTop()));
                    var clickY = e.pageX - wrap.offset().left,
                        caretY = Math.round(clickY / wrap.width() * wrap.text().length);
                    
					$(this).parent().addClass('edit')
					.find('input')
					    .val( $(this).html() )
					    .focus().caret(caretY,caretY);

			}).mousedown(function(){
			    // $(document.activeElement).not(document.body).blur();
			});

			$(this).find('input').bind('keyup',function () {
					
					generator.grabAndSet(this);
					
					this.parentNode.getElementsByTagName('span')[0].innerHTML = this.value;
				}
			).bind('blur',function () {
					$(this).parent().removeClass('edit');

                    generator.grabAndSet(this);
				}
			).bind("mousewheel keydown", function(e, delta) {
				
				        if (e.which == 9){ // tab key
				            var inputs      = $('b input'),
				                elemIndex   = inputs.index(this),
				                direction   = e.shiftKey ? -1 : 1;
				                
				            // basically tab to next input.
				            $(this).blur();
				            
				            inputs.eq(elemIndex + direction).prev('span').click();
				            return false;
				            
				        }
				
			    
			            // only px values get this treatment for now.
			            if (!(/px|em/.test($(this).val()) || $(this).closest('#box_rotate').length)) return true;
			            
			            var split = this.value.split(/-?[0-9A-F.]+/),
			            	match = this.value.match(/-?[0-9A-F.]+/),
			                num   = match && match[0] || 0,
			                len, newval;
			                
                        if (delta > 0 || e.which == 38) {
                            newval = parseFloat(num) + 1 * (e.shiftKey ? .1 : 1);
                        } else if ( delta < 0 || e.which == 40 ) {
                            newval = parseFloat(num) - 1 * (e.shiftKey ? .1 : 1);
                        } else {
                            return true;
                        }
                        
                        newval = Math.round(newval*10)/10;
                        len = (''+newval).length;
                        if (split.length===0) split = ['',''];   // IE is stupido.
                        if (split.length===1) split.unshift(''); // IE is stupido.
                        
                        $(this).val(split.join(newval));
                        
                        generator.grabAndSet(this);
                        
                        $(this).caret( len,len );
                        return false;
            });

           $(document).bind('mousewheel',function(e,delta){
           		if ($(e.target).is('input')) return; // this is already handled fine.
           		if (! $(document.activeElement).is('input')) return; // they're just scrolling the page.
           		e.stopPropagation();
           		$(document.activeElement).trigger(e,delta);
           		e.preventDefault();
           })
			
	}); // end pre each()
	
	 // first run on page load
	getFilters();
	
	if (!document.body.filters) {
		generator.applyStyles();
	}
	
	// weird fix for FF4. thx 
	// https://github.com/paulirish/css3please/issues/22
	// https://github.com/paulirish/css3please/issues/38
	setTimeout(function(){
          generator.grabAndSet($('pre input').first().get(0));
  }, 100);
  
  
  
	// use rgba and not gradients for older operas since they're silly.
	if (/Opera/.test(({}).toString.call(window.opera)) && (parseFloat(opera.version(), 10) < 11.1)){
	    $('#box_gradient,#box_rgba').find('a.off').click();
	}
		
	
});

$(window).load(function(){
	setTimeout(copypasta,1000);
})

window.css = {
	'text-shadow': '2px 2px 2px #000;',
	'filter': 'Shadow(Color=#666666, Direction=135, Strength=5);'
};


/*
rule
	selector
	declaration
		property
			value
*/

$.fn.applyStyles = function(){ generator.applyStyles(this[0]); return this; }

// commenting out
$('.rule_wrapper .comment a.off').live('click',function(){
    $(this).text( $(this).text().replace(' off',' !on').replace(' on',' off').replace('!','') )
    $(this).closest('.rule_wrapper').toggleClass('commentedout')
        .find('input').first().applyStyles();
	getFilters();
    return false;
});

/* 
 * Adding trim method to String Object.  Ideas from 
 * http://www.faqts.com/knowledge_base/view.phtml/aid/1678/fid/1 and
 * http://blog.stevenlevithan.com/archives/faster-trim-javascript
 */
String.prototype.trim = function() { 
	var str = this;
	
	// used by the String.prototype.trim()			
	var initWhitespaceRe = /^\s\s*/;
	var endWhitespaceRe = /\s\s*$/;
	var whitespaceRe = /\s/;
	
	// The first method is faster on long strings than the second and 
	// vice-versa.
	if (this.length > 6000) {
		str = this.replace(initWhitespaceRe, '');
		var i = str.length;
		while (whitespaceRe.test(str.charAt(--i)));
		return str.slice(0, i + 1);
	} else {
		return this.replace(initWhitespaceRe, '')
			.replace(endWhitespaceRe, '');
	}  
};
