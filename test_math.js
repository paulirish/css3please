cssMath = {
	/* ---- General ---- */

	/* Isset */
	isset: function (s) {
		return s != undefined;
	},

	/* Trim */
	trim: function (s) {
		return s.replace(/^\s+|\s+$/g, '');
	},

	/* Number rounded by Length */
	round: function (n, l) {
		l = Math.pow(10, l) || 10;
		return Math.round(n * l) / l;
	},

	/* ---- Rotation Adjustments ---- */

	/* X and Y coordinates to rotation and strength */
	xy2rs: function (x, y) {
		return {
			r: this.round(Math.atan2(x, y * -1) * 180 / Math.PI, 3),
			s: this.round(Math.sqrt((x * x) + (y * y)), 3)
		};
	},

	/* Rotation and Strength to x and y coordinates */
	rs2xy: function (r, s) {
		return {
			x: this.round(Math.sin(r * Math.PI / 180) * s, 3),
			y: this.round(Math.cos(r * Math.PI / 180) * s * -1, 3)
		};
	},

	/* Rotation to degree */
	r2d: function (r) {
		return this.round(r * 90, 4);
	},

	/* Degree to rotation */
	d2r: function (d) {
		return this.round(d / 90, 4);
	},

	/* ---- Color Adjustments ---- */

	/* Long Hexadecimals compressed to short hexadecimals */
	lh2sh: function (lh) {
		return '#' + this.trim(lh).replace(/^#?/, '').replace(/^([A-f0-9])\1([A-f0-9])\2([A-f0-9])\3([A-f0-9])\4$/, '$1$2$3$4').replace(/^([A-f0-9])\1([A-f0-9])\2([A-f0-9])\3$/, '$1$2$3');
	},

	/* Short Hexadecimals expanded to long hexadecimals */
	sh2lh: function (sh) {
		return '#' + this.trim(sh).replace(/^#?/, '').replace(/^([A-f0-9])([A-f0-9])([A-f0-9])([A-f0-9])$/, '$1$1$2$2$3$3$4$4').replace(/^([A-f0-9])([A-f0-9])([A-f0-9])$/, '$1$1$2$2$3$3');
	},

	/* Channel to hexadecimal */
	c2h: function (c) {
		return ('0' + parseInt(c, 10).toString(16)).substr(-2).toUpperCase();
	},

	/* Hexadecimal to channel */
	h2c: function (h) {
		return '' + parseInt(h, 16);
	},

	/* Channels to array */
	c2a: function (c) {
		return (c = /(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c) || /(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(c)) && c.shift() ? c : false;
	},

	/* Hexadecimals to array */
	h2a: function (h) {
		h = this.sh2lh(h);
		return (h = /([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})/.exec(h) || /([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})/.exec(h)) && h.shift() ? h : false;
	},

	/* Channels to hexadecimals */
	c2h2: function (c) {
		c = this.c2a(c);
		return this.hf((c[3] ? this.c2h(c[3]) : '') + this.c2h(c[0]) + this.c2h(c[1]) + this.c2h(c[2]));
	},

	/* Hexadecimals to channels */
	h2c2: function (h) {
		h = this.h2a(h);
		return this.cf((h[3] ? [this.h2c(h[1]), this.h2c(h[2]), this.h2c(h[3]), this.h2c(h[0])] : [this.h2c(h[0]), this.h2c(h[1]), this.h2c(h[2])]).join(', '));
	},

	/* Channels proper formatting */
	cf: function (c) {
		c = this.c2a(c);
		return (c[3] ? 'rgba(' : 'rgb(') + c.join(', ') + ')';
	},

	/* Hexadecimals proper formatting */
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

	/* ---- String Adjustments ---- */

	/* String to short hexadecimals (move capable) */
	s2sh: function (s, m) {
		m = this.isset(m) ? m : 0;

		return this.lh2sh(
			this.hm2(
				(s.indexOf(',') > -1 ? this.c2h2(s) : s),
				m
			)
		);
	},

	/* String to long hexadecimals (move capable) */
	s2lh: function (s, m) {
		m = this.isset(m) ? m : 0;

		return this.sh2lh(
			this.hm2(
				(s.indexOf(',') > -1 ? this.c2h2(s) : s),
				m
			)
		);
	},

	/* String to channels (move capable) */
	s2c: function (s, m) {
		m = this.isset(m) ? m : 0;

		return s.indexOf(',') > -1 ? this.cf(s) : this.h2c2(s);
	},

	/* String to degree */
	s2d: function (s, m) {
		m = this.isset(m) ? m : 0;
		return s > 4 ? s : Math.max(this.round(this.r2d(s) + m, 3), 0);
	},

	/* String of channels, hexadecimals, or units to string (move capable) */
	s2x: function (s, m, sh) {
		s = this.trim(s);
		m = this.isset(m) ? m : 0;
		sh = this.isset(sh) ? sh : false;

		/* Hex */
		if (/^[#A-f0-9]+$/.test(s)) {
			if (sh || /^[#A-f0-9]{3,5}$/.test(s)) {
				return this.lh2sh(this.hm2(s, m));
			}

			return this.hm2(s, m);
		}
		/* RGB */
		else if (s.indexOf(',') > -1) {
			return this.cm2(s, m);
		}
		/* Unit */
		else if (/([\+\-\d]+)(.*)/.test(s)) {
			var unit,
				units = [],
				re = /([\+\-\d]+)(%|in|cm|mm|em|ex|pt|pc|px)*(\s|$)/g;

			while ((unit = re.exec(s)) != null) {
				units.push(Math.max(parseInt(unit[1], 10) + m, 0) + (unit[2] || 'px'), unit[3]);
			}

			return units.join('');
		}
		else {
			return false;
		}
	},

	/* String of channels, hexadecimals, or units to short string (move capable)  */
	s2sx: function (s, m) {
		return this.s2x(s, m, true);
	}
};