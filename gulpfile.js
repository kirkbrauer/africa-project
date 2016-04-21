var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var jslint = require('gulp-jslint');
var run = require('gulp-run');

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('start', ['less'], function() {
  run('electron main.js').exec()
});
