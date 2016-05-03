var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var jslint = require('gulp-jslint');
var run = require('gulp-run');
var nodemon = require('gulp-nodemon');

gulp.task('less', function () {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('start', ['less'], function() {
  nodemon({
    script: 'server.js'
  , ext: 'js html less'
  , env: { 'DEBUG': true }
  })
});
