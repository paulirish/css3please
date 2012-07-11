module.exports = function(grunt) {

	grunt.initConfig({
		'meta': {
			'banner': '/*! css3please.com | <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %> */',
			'srcfiles': [
				'javascript/detect-flash.js',
				'javascript/jquery-1.7.1.min.js',
				'javascript/jquery.plugins.min.js',
				'javascript/javascript.js',
				'javascript/cb_plugins.js',
				'javascript/analytics.js'
			]
		},
		'concat': {
			'js': {
				'src': ['<banner:meta.banner>', '<config:meta.srcfiles>'],
				'dest': 'javascript/build.js'
			},
			'css': {
				'src': ['<banner:meta.banner>', 'css/matrices.css', 'css/colorpicker.css', 'css/stylesheet.css', 'css/light.css'],
				'dest': 'css/build.css'
			}
		},
		'min': {
			'dist': {
				'src': ['<config:concat.js.dest>'],
				'dest': 'javascript/build.min.js'
			}
		},
		'cssmin': {
			'dist': {
				'src': ['<config:concat.css.dest>'],
				'dest': 'css/build.min.css'
			}
		},
		'watch': {
			'files': '<config:meta.srcfiles>',
			'tasks': 'default'
		}
	});

	grunt.loadNpmTasks('grunt-css');

	grunt.registerTask('default', 'concat min cssmin');

};