var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('scripts', function() {
  return gulp.src([
      './node_modules/angular/angular.min.js',
      './node_modules/angular-resource/angular-resource.min.js',
      './node_modules/angular-ui-router/release/angular-ui-router.min.js',
      './node_modules/satellizer/dist/satellizer.min.js',
      './node_modules/bootbox/bootbox.min.js',
      './app/app.module.js',
      './app/core/app.core.js',
      './app/constants.js',
      './app/app.config.js',
      './app/app.route.js',
      './app/app.global.js',
      './app/nav/*.js',
      './app/login/*.js',
      './app/dashboard/*.js',
      './app/user/*.js',
      './app/category/*.js',
      './app/post/*.js',
      './app/tag/*.js'
  ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js/'));
});