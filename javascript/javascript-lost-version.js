cssMath = {
	/* ---- General ---- */

	/* Number rounded by Length */
	round: function (n, l) {
		l = Math.pow(10, l);
		return Math.round(n * l) / l;
	},

	/* ---- Rotation Adjustments ---- */

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
		return this.round(r * 90, 4);
	},

	/* Degree to Rotation */
	d2r: function (d) {
		return this.round(d / 90, 4);
	},

	/* ---- Color Adjustments ---- */

	/* Long Hexadecimals compressed to Short Hexadecimals */
	lh2sh: function (lh) {
		return lh.replace(/^\s+|\s+$/g, '').replace(/^#?([A-f0-9])\1([A-f0-9])\2([A-f0-9])\3$/, '#$1$2$3');
	},

	/* Short Hexadecimals expanded to Long Hexadecimals */
	sh2lh: function (sh) {
		return sh.replace(/^\s+|\s+$/g, '').replace(/^#?([A-f0-9])([A-f0-9])([A-f0-9])$/, '#$1$1$2$2$3$3');
	},

	/* Channel to Hexadecimal */
	c2h: function (c) {
		return ('0' + parseInt(c, 10).toString(16)).substr(-2).toUpperCase();
	},

	/* Hexadecimal to Channel */
	h2c: function (h) {
		return '' + parseInt(h, 16);
	},

	/* Channels to Array */
	c2a: function (c) {
		return (c = /(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c) || /(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c)) && c.shift() ? c : false;
	},

	/* Hexadecimals to Array */
	h2a: function (h) {
		h = this.sh2lh(h);
		return (h = /([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})/.exec(h) || /([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})/.exec(h)) && h.shift() ? h : false;
	},

	/* Channels to Hexadecimals */
	c2h2: function (c) {
		c = this.c2a(c);
		return this.hf((c[3] ? this.c2h(c[3]) : '') + this.c2h(c[0]) + this.c2h(c[1]) + this.c2h(c[2]));
	},

	/* Hexadecimals to Channels */
	h2c2: function (h) {
		h = this.h2a(h);
		return this.cf((h[3] ? [this.h2c(h[1]), this.h2c(h[2]), this.h2c(h[3]), this.h2c(h[0])] : [this.h2c(h[0]), this.h2c(h[1]), this.h2c(h[2])]).join(', '));
	},

	/* Channels Formatting */
	cf: function (c) {
		c = this.c2a(c);
		return (c[3] ? 'rgba(' : 'rgb(') + c.join(', ') + ')';
	},

	/* Hexadecimals Formatting */
	hf: function (h) {
		return '#' + this.h2a(h).join('');
	},

	/* Channel Move */
	cm: function (c, m) {
		return Math.max(Math.min(parseInt(c, 10) + m, 255), 0) + '';
	},

	/* Hexadecimal Move */
	hm: function (h, m) {
		return this.c2h(Math.max(Math.min(parseInt(h, 16) + m, 255), 0));
	},

	/* Channels Move */
	cm2: function (c, m) {
		var e = -1;
		c = this.c2a(c);
		while (++e < c.length) {
			c[e] = this.cm(c[e], m);
		}
		return this.cf(c.join(','));
	},

	/* Hexadecimals Move */
	hm2: function (h, m) {
		var e = -1;
		h = this.h2a(h);
		while (++e < h.length) {
			h[e] = this.hm(h[e], m);
		}
		return this.hf(h.join(''));
	},

	/* String to Short Hexadecimals */
	s2sh: function (s) {
		return this.lh2sh((s.indexOf(',') > -1) ? this.c2h2(s) : s);
	},

	/* String to Long Hexadecimals */
	s2lh: function (s) {
		return this.sh2lh((s.indexOf(',') > -1) ? this.c2h2(s) : s);
	},

	/* String to Channels */
	s2c: function (s) {
		return (s.indexOf(',') > -1) ? this.cf(s) : this.h2c2(s);
	},

	/* String to Degree */
	s2d: function (s) {
		return (s > 4) ? s : this.round(this.r2d(s), 3);
	},

	/* String to channels, hexadecimals, or units Moved */
	s2m: function (s, m) {
		if (/^[#A-f0-9\s]+$/.test(s)) {
			return this.lh2sh(this.hm2(s, m));
		}
		else if (s.indexOf(',') > -1) {
			return this.cm2(s, m);
		}
		else if (s = /([\+\-\d]+)(.*)/.exec(s)) {
			return parseInt(s[1], 10) + m + s[2];
		}
		else {
			return false;
		}
	}
};

styleAllRules = function (ruleList) {
	var ruleList = document.getElementsByTagName('pre'),
	e = -1,
	innerHTML;

	while (++e < ruleList.length) {
		innerHTML = ruleList[e].innerHTML;

		innerHTML = innerHTML.replace(/(\/\*((\n|.)+)\*\/)/, '<span class="comment">$1</span>');
		innerHTML = innerHTML.replace(/{((\n|.)+)}/, '{<span class="declaration-block">$1</span>}');
		innerHTML = innerHTML.replace(/(.*?) {/, '<span class="selector">$1</span> <span class="bracket">{</span>');
		innerHTML = innerHTML.replace(/(\s*)(.*?):\s?(.*?);/mg, '<span class="declaration">$1<span class="property">$2</span>: <span class="value">$3</span>;</span>');
		innerHTML = innerHTML.replace(/}/m, '<span class="bracket">}</span>');

		ruleList[e].innerHTML = innerHTML;
	}

	ruleList = document.getElementsByTagName('b');
	e = -1;

	while (++e < ruleList.length) {
		ruleList[e].innerHTML = '<span>' + ruleList[e].innerHTML + '</span><input i="' + (ruleList[e].getAttribute('i') || '') + '" o="' + (ruleList[e].getAttribute('o') || '') + '" value="' + ruleList[e].innerHTML + '" />';
	}
};

var length = 'length', selectionEnd = 'selectionEnd', selectionStart = 'selectionStart', text = 'text', value = 'value';

getSelection = function (ele) {
	var selection, createTextRange, duplicate;

	if (typeof (selection = ele[selectionStart]) !== 'undefined') {
		return {
			start: ele[selectionStart],
			end: ele[selectionEnd],
			length: ele[selectionEnd] - ele[selectionStart],
			text: ele[value].substr(ele[selectionStart], ele[selectionEnd] - ele[selectionStart])
		};
	}

	if (document.selection && (selection = function () {
		ele.focus();
		return document.selection.createRange();
	}())) {
		createTextRange = ele.createTextRange();
		duplicate = createTextRange.duplicate();
		createTextRange.moveToBookmark(selection.getBookmark());
		duplicate.setEndPoint('EndToStart', createTextRange);

		return {
			start: duplicate[text][length],
			end: duplicate[text][length] + selection[text][length],
			length: selection[text][length],
			text: selection[text]
		};
	}

	return {
		start: 0,
		end: ele[value][length],
		length: 0
	};
};

setSelection = function (ele, start, end) {
	ele.focus();

	if (typeof (ele[selectionStart]) !== 'undefined') {
		ele[selectionStart] = start;
		ele[selectionEnd] = end;

		return this;
	}

	if (document.selection) {
		createTextRange = document.selection.createRange();
		createTextRange.moveStart('character', -getSelection(ele).start);
		createTextRange.moveEnd('character', 0);
		createTextRange.select();

		return this;
	}
};

stylePreview = function () {
	$('.declaration').each(
		function () {
			try {
				$('#preview').css($(this).find('.property').text(), $(this).find('.value').text());
			}
			catch (e) {}
		}
	);
};

keyChanges = function (e) {
	start = getSelection(this).start;
	end = getSelection(this).end;

	this.parentNode.getElementsByTagName('span')[0].innerHTML = this.value;

	if (e.keyCode == 38) {
		this.value = cssMath.s2m(this.value, 1);
	}
	else if (e.keyCode == 40) {
		this.value = cssMath.s2m(this.value, -1);
	}

	setSelection(this, start, end);

	stylePreview();
};

$(document).ready(
	function () {
		styleAllRules();
		stylePreview();
		$('input').bind('keydown', keyChanges);
		
		
		
		
		var fn = function () {
    	};
    	$('i').live('click', function () {
    		var $out = $(this),
    		$in = $(document.createElement('input'));

    		if ($out.hasClass('edit')) {
    			return;
    		} else {
    			$in.val($out.addClass('edit').wrapInner('<span>').children().attr('to', $out.attr('to') || '').css('visibility', 'hidden').html());
    		}

    		$out.append($in);

    		$in.focus().bind('keydown keypress keyup', function () {
    			var $in = $(this),
    			$out = $in.parent(),
    			val = $in.val();

    			$out.children('span').html($in.val());

    			val = ($out.attr('is')) ? eval($out.attr('is')) : val;

    			$out.parent().find('i[group=' + $out.attr('group') + ']:not(.edit)').each(function () {
    				this.innerHTML = (this.getAttribute('to')) ? eval(this.getAttribute('to')) : val;
    			});
    		}).bind('blur change', function () {
    			var $in = $(this),
    			$out = $in.parent().removeClass('edit'),
    			val = $in.val();

    			val = ($out.attr('is')) ? eval($out.attr('is')) : val;

    			val = ($out.attr('to')) ? eval($out.attr('to')) : val;

    			$out.html(val);

    			$in.remove();
    		});
    	});
    	
	}
);