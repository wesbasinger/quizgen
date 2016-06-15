module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files: ['*.js', 'test/*.js'],
			options: {
				esnext: true
			}
		},
		mochaTest: {
			test : {
				src: ['test/*.js']
			}
		},
		watch: {
			scripts: {
				files: ['*.js'],
				tasks: ['mochaTest']
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-mocha-test");
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'mochaTest']);
};
