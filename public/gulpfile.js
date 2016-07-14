// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('makeOneAndSmall', function() {
    var ng = gulp.src([
            'node_modules/angular/angular.min.js',
            'node_modules/angular-route/angular-route.min.js',
            'js/*.js',
            'js/controllers/*.js'
        ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['js/*.js', 'js/controllers/*.js'], ['makeOneAndSmall']);
});

// Default Task
gulp.task('default', ['watch']);
