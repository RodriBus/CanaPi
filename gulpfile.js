'use strict';

var gulp = require('gulp-help')(require('gulp'));

var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var debug = require('gulp-debug');

gulp.task('serve', 'Sirve la aplicación', ['compile'], function() {

  browserSync.init({
    server: {
      baseDir: './public'
    }
  });

  gulp.watch('server/**/*.jade', ['html']);
  gulp.watch('server/**/*.scss', ['css']);
  gulp.watch('server/**/*.js', ['js']);
});

gulp.task('compile', 'Compila los ficheros HTML, CSS y JS', ['html', 'css', 'js']);

gulp.task('html', 'Compila HTML con los ficheros JADE', function() {
  return gulp.src('server/**/*.jade')
    .pipe(debug({
      title: 'HTML'
    }))
    .pipe(jade())
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
});

gulp.task('css', 'Genera app.css con los ficheros SCSS', function() {
  return gulp.src('server/**/*.scss')
    .pipe(debug({
      title: 'CSS'
    }))
    .pipe(concat('app.css'))
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/styles'))
    .pipe(browserSync.stream())
    .pipe(browserSync.stream());
});

gulp.task('js', 'Genera app.js con los ficheros JS', function() {
  return gulp.src('server/**/*.js')
    .pipe(debug({
      title: 'JS'
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    //.pipe(eslint.failAfterError())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('public/scripts'))
    .pipe(browserSync.stream());
});
