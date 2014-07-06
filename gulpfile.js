'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    nodemon = require('gulp-nodemon'),
    supervisor = require('gulp-supervisor'),
    watch = require('gulp-watch'),
    paths;

gulp.task('sass', function () {
  gulp.src('./public/scss/**/*.scss')
      .pipe(sass({
        errLogToConsole : true
      }))
      .pipe(gulp.dest('./public/css/'));
});
  
gulp.task('nodemon', function () {
  nodemon({
      script: 'app.js',
      ext: 'js scss',
      env : { 'NODE_ENV' : 'development' }
  }).on('restart', [ 'sass']);
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
});

gulp.task('init', function () {
  require('./configs/init.js');
});

gulp.task('default', ['sass', 'nodemon'], function() {
});
