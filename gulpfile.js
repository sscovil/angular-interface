var gulp        = require('gulp');
var install     = require('gulp-install');
var jshint      = require('gulp-jshint');
var del         = require('del');
var copy        = require('gulp-copy');
var ngAnnotate  = require('gulp-ng-annotate');
var uglify      = require('gulp-uglify');
var gutil       = require('gulp-util');
var rename      = require("gulp-rename");

/**
 * Install bower components
 */
gulp.task('bower', function() {
    return gulp.src(['./bower.json'])
        .pipe(install());
});

/**
 * Check source for errors
 */
gulp.task('jshint', function() {
    gulp.src('./src/angular-interface.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/**
 * Clean release directory
 */
gulp.task('clean', ['jshint'], function(cb) {
    del(['./release'], cb);
});

/**
 * Copy un-minified version of script to release directory
 */
gulp.task('copy', ['clean'], function() {
    return gulp.src('./src/angular-interface.js')
        .pipe(copy('./release', { prefix: 1 }));
});

/**
 * Create minified version of script in release directory
 */
gulp.task('minify', ['clean'], function() {
    return gulp.src('./src/angular-interface.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(rename('angular-interface.min.js'))
        .pipe(gulp.dest('./release'));
});

/**
 * Build task
 */
gulp.task('build', ['copy', 'minify']);

/**
 * Default task
 */
gulp.task('default', ['bower', 'build']);
