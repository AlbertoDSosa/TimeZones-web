// File: Gulpfile.js
'use strict';
var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    jshint    = require('gulp-jshint'),
    stylish   = require('jshint-stylish'),
    inject    = require('gulp-inject'),
    stylus    = require('gulp-stylus'),
    nib       = require('nib'),
    wiredep   = require('wiredep').stream,
    gulpif    = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    useref    = require('gulp-useref'),
    uglify    = require('gulp-uglify'),
    historyApiFallback = require('connect-history-api-fallback');

// Servidor web de desarrollo

gulp.task('server', function() {
  connect.server({
    root: './app',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback ];
    }
  });
});

// Servidor web para probar el entorno de producción
gulp.task('server-www', function() {
  connect.server({
    root: './www',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback ];
    }
  });
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
 return gulp.src('./app/js/**/*.js')
  .pipe(jshint('.jshintrc'))
   .pipe(jshint.reporter('jshint-stylish'))
   .pipe(jshint.reporter('fail'));
});

// Process Stylus files to CSS
gulp.task('css', function () {
  gulp.src('./app/stylus/style.styl')
    .pipe(stylus({ use: nib() }))
    .pipe(gulp.dest('./app/css'))
    .pipe(connect.reload());
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
gulp.src('./app/**/*.html')
  .pipe(connect.reload());
});

// Busca en las carpetas de estilos y javascript los archivos
// para inyectarlos en el index.html
gulp.task('inject', function() {
  return gulp.src('index.html', {cwd: './app'})
    .pipe(inject(
      gulp.src(['./app/js/**/*.js']), {
      read: false,
      ignorePath: '/app'
    }))
    .pipe(inject(
      gulp.src(['./app/css/**/*.css']), {
        read: false,
        ignorePath: '/app'
      }
    ))
    .pipe(gulp.dest('./app'));
});

// Inyecta las librerias que instalemos vía Bower
gulp.task('wiredep', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
       directory: './app/vendor'
  }))
  .pipe(gulp.dest('./app'));
});




// Comprime los archivos CSS y JS enlazados en el index.html
// y los minifica.
gulp.task('compress', function() {
  gulp.src('./app/index.html')
    .pipe(useref.assets())
    .pipe(gulpif('*.js', uglify({mangle: false })))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('./www'));
});



// Copia el contenido de los estáticos e index.html al directorio
// de producción sin tags de comentarios
gulp.task('copy', function() {
  gulp.src('./app/index.html')
    .pipe(useref())
    .pipe(gulp.dest('./www'));
  gulp.src('./app/fonts/**')
    .pipe(gulp.dest('./www/fonts'));
  gulp.src('./app/img/**')
    .pipe(gulp.dest('./www/img'));
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./app/*.html'], ['html']);
  gulp.watch(['./app/stylus/*.styl'], ['css', 'inject']);
  gulp.watch(['./app/js/**/*.js', './Gulpfile.js'], ['jshint', 'inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

gulp.task('default', ['server', 'watch', 'wiredep', 'css', 'inject', 'jshint']);
gulp.task('build', ['compress', 'copy']);
