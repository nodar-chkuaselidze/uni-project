'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch');

gulp.task('sass-watch', function () {
  gulp.src('./public/scss/**', { read: false })
      .pipe(watch())
      .pipe(plumber()) // This will keeps pipes working after error event
      .pipe(sass())
      .pipe(gulp.dest('./public/css/'));
});

gulp.task('nodemon', function () {
  var exitTimeout;

  nodemon({
      script: 'app.js',
      ext: 'js',
      env : { 'NODE_ENV' : 'development' }
  });
});

gulp.task('default', ['sass-watch', 'nodemon'], function() {
});
