'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    nodemon = require('gulp-nodemon'),
    supervisor = require('gulp-supervisor'),
    watch = require('gulp-watch'),
    paths;

gulp.task('sass-watch', function () {
  gulp.src('./public/scss/**', { read: false })
      .pipe(watch())
      .pipe(plumber()) // This will keeps pipes working after error event
      .pipe(sass())
      .pipe(gulp.dest('./public/css/'));
});

gulp.task('nodemon', function () {
  nodemon({
      script: 'app.js',
      ext: 'js',
      env : { 'NODE_ENV' : 'development' }
  });
});

gulp.task('watch', function () {
  gulp.watch('app/**/*.js', [ 'console' ]);
});

gulp.task('console', function() {
    supervisor( 'repl.js', {
        args: [],
        watch: [ 'app' ],
        pollInterval: 500,
        extensions: [ 'js' ],
        exec: 'node',
        debug: true,
        debugBrk: false,
        harmony: false,
        noRestartOn: 'exit',
        forceWatch: true,
        quiet: true
    } );
} );

gulp.task('default', ['sass-watch', 'nodemon'], function() {
});
