var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch');

gulp.task('default', function() {
  
  gulp.src('scss/**', { read: false })
      .pipe(watch())
      .pipe(plumber()) // This will keeps pipes working after error event
      .pipe(sass())
      .pipe(gulp.dest('./dist/'));

  nodemon({ script: 'app.js', ext: 'js' })
    .on('exit', function () {
      console.log('Application exited');
      process.exit();
    });
});
