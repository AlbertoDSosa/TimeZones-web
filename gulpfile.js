'use strict';

var gulp       = require('gulp'),
    stylus     = require('gulp-stylus'),
    nib        = require('nib'),
    browserify = require('browserify'),
    jade       = require('gulp-jade'),
    webServer  = require('gulp-webserver'),
    jadeify    = require('jadeify'),
    source     = require('vinyl-source-stream');

var config = {
	styles: {
		input: './src/styles/style.styl',
		watch: './src/styles/*',
		output: './build/css'
	},
	scripts: {
		input: './src/scripts/main.js',
		watch: ['./src/scripts/**/*.js', './src/scripts/templates/*.jade'],
		output: './build/js'
	},
	jade: {
		input: './src/index.jade',
		output: './build'
	},
	assets: {
		input: './src/assets/**/*',
		output: './build'
	}
}

gulp.task('server', ['build'], function () {
	gulp.src('./build')
	.pipe(webServer({
		host: '0.0.0.0',
		port: 5000,
		livereload: true,
    open: true
	}));
});


gulp.task('html', ['scripts'], function () {
	gulp.src(config.jade.input)
		.pipe(jade({ pretty:true }))
		.pipe(gulp.dest(config.jade.output))
});

gulp.task('scripts', function () {
	return browserify(config.scripts.input)
		.transform(jadeify)
	  .bundle()
	  .pipe(source('main.js'))
	  .pipe(gulp.dest(config.scripts.output))
});

gulp.task('styles', ['assets'], function () {
  gulp.src(config.styles.input)
    .pipe(stylus({
    	use: nib(),
    	'include css': true
    }))
    .pipe(gulp.dest(config.styles.output));
});

gulp.task('assets', function () {
	gulp.src(config.assets.input)
		.pipe(gulp.dest(config.assets.output));
});

gulp.task('build', ['html', 'scripts', 'styles']);


gulp.task('watch', function() {
  gulp.watch(config.styles.watch, ['styles']);
  gulp.watch(config.scripts.watch, ['scripts']);
  gulp.watch(config.jade.input, ['html'])
});

gulp.task('default', ['build', 'server', 'watch']);
