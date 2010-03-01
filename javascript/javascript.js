window.cssMath = {
	/* Number rounded by Length */
	round: function (n, l) {
		l = Math.pow(10, l);

		return Math.round(n * l) / l;
	},
	/* X and Y coordinates to Rotation and Strength */
	xy2rs: function (x, y, p) {
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
	/* Hexadecimal to Decimal */
	h2d: function (h) {
		return '' + parseInt(h, 16);
	},
	/* Decimal to Hexadecimal */
	d2h: function (d) {
		return ('0' + parseInt(d, 10).toString(16)).substr(-2).toUpperCase();
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

		while ((a = da.shift())) {
			ha.push(this.d2h(a));
		}

		ha.splice(0, 0, ha.pop());

		return ha;
	},
	/* Alpha + Hexadecimal Array to Alpha + Decimal Array */
	aha2ada: function (ha) {
		var a,
		da = [];

		while ((a = ha.shift())) {
			da.push(this.h2d(a));
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
	eval: {
		/* String to Hexadecimals */
		s2Hex: function (value, allValues) {
			if (value.indexOf('rgb') > -1) {
				return '#' + cssMath.da2ha(c.replace(/^rgb\s?\(\s?(.*?)\s?\)$/, '$1').split(/,\s?/)).join('');
			}
			else {
				return cssMath.h2lh(value);
			}
		},
		/* String to Alpha + Hexadecimals */
		s2aHex: function (value, allValues) {
			if (value.indexOf('rgba') > -1) {
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
		}
	}
};

window.generator = {
	styleAllRules: function (ruleList) {
		var item = -1,
		innerHTML;

		while (++item < ruleList.length) {
			innerHTML = ruleList[item].innerHTML;

			innerHTML = innerHTML.replace(/(\/\*((\n|.)+)\*\/)/, '<span class="comment">$1</span>');
			innerHTML = innerHTML.replace(/{((\n|.)+)}/, '{<span class="declaration-block">$1</span>}');
			innerHTML = innerHTML.replace(/(.*?) {/, '<span class="selector">$1</span> <span class="bracket">{</span>');
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
	}
};

function copypasta(){
	$('.rule_wrapper').each(function(){
	    var name = this.id;
	    var zc = new ZeroClipboard.Client();
	    zc.glue( name + '_copybutton', name +'_copybutton_container' );
    	zc.addEventListener( 'mouseDown', (function(){
    	    return function(client) {
    		    zc.setText( $("#"+ name + " pre").text() );
    		}
    	})());
	});
}


$(document).ready(
	function () {
		copypasta();
		generator.styleAllRules(document.getElementsByTagName('pre'));

		generator.makeEditable(document.getElementsByTagName('b'));


        

		$('pre').each(function () {
				$(this).find('b').bind('click',function (e) {
    
				        // basically calculating where to place the caret.
                        var wrap = $(document.elementFromPoint(e.pageX-$(document).scrollLeft(),e.pageY-$(document).scrollTop()));
                        var clickY = e.pageX - wrap.offset().left,
                            caretY = Math.round(clickY / wrap.width() * wrap.text().length);
                        
						$(this).addClass('edit')
						.find('input')
						    .val(this.getElementsByTagName('span')[0].innerHTML)
						    .focus().caret(caretY,caretY);

				}).mousedown(function(){
				    $(document.activeElement).not(document.body).blur();
				});

				$(this).find('input').bind('keyup',function () {
						var item = -1;
						allValues = generator.collectAllValues(this.parentNode.parentNode.parentNode.parentNode),
						group = this.parentNode.getAttribute('g'),
						input = this.parentNode.getAttribute('i'),
						value = this.value,
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

								$('#sandbox').css(allValues[item].styleProperty, allValues[item].styleValue);
							}
						}

						this.parentNode.getElementsByTagName('span')[0].innerHTML = this.value;
					}
				).bind('blur',function () {
						$(this).parent().removeClass('edit');

						var item = -1;
						allValues = generator.collectAllValues(this.parentNode.parentNode.parentNode.parentNode),
						group = this.parentNode.getAttribute('g'),
						input = this.parentNode.getAttribute('i'),
						value = this.value,
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

								$('#sandbox').css(allValues[item].styleProperty, allValues[item].styleValue);
							}
						}
					}
				).bind("mousewheel", function(event, delta) {
				    
				            return true; // quit cuz its not there yet.
                            if (delta > 0) {
                                $(this).val( parseFloat(this.value) + 1 );
                            } else {
                                this.value = parseFloat(this.value) - 1 ;
                            }
                            return false;
                });

				var item = -1,
				allValues = generator.collectAllValues(this);

				while (++item < allValues.length) {
					$('#sandbox').css(allValues[item].styleProperty, allValues[item].styleValue);
				}
			}
		);
	}
);

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