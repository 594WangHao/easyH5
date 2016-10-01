var gulp = require('gulp');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['clean'], function() {
    gulp.start('css', 'js', 'img', 'start');
})

gulp.task('clean', function() {
    return gulp
        .src(['./static/dist/css', './static/dist/js', './static/dist/img'])
        .pipe(clean());
});

gulp.task('css', function() {
    return gulp
        .src('./static/src/less/*.less')
        .pipe(less())
        .pipe(concat('easyH5.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./static/dist/css/'))
});

gulp.task('js', function() {
    return gulp
        .src('./static/src/js/*.js')
        .pipe(concat('easyH5.js', {
            newLine: ';'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./static/dist/js/'))
});

gulp.task('img', function() {
    return gulp
        .src('./static/src/img/*')
        .pipe(gulp.dest('./static/dist/img/'))
});

gulp.task('start', function() {
    nodemon({
        script: 'app.js',
        ignore: [
            "./static/"
        ],
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    })
});

gulp.task('watch', function() {
    gulp.watch('./static/src/less/*.less', function() {
        gulp.run('css');
    });
    gulp.watch('./static/src/img/**/*', function() {
        gulp.run('img');
    });
    gulp.watch('./static/src/js/*.js', function() {
        gulp.run('js');
    });
});