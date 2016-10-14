var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulpWebpack = require('gulp-webpack');
var webpack = require('webpack');

var webpackConfig = require('./webpack.config.js');

gulp.task('default', ['clean'], function() {
    gulp.start('webpack', 'js', 'css', 'img', 'start', 'watch');
})

gulp.task('clean', function() {
    return gulp
        .src(['./static/dist/css', './static/dist/js', './static/dist/img'])
        .pipe(clean());
});

gulp.task('webpack', function(callback) {
    gulp.src('./static/app/main.js')
        .pipe(gulpWebpack({
            watch: true,
            output: {
                filename: 'build.js'
            },
            module: {
                loaders: [{
                    test: /\.vue$/,
                    loader: 'vue'
                }]
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
            ]
        }))
        .pipe(gulp.dest('./static/dist/js/'));
});

gulp.task('css', function() {
    return gulp
        .src('./static/src/sass/*.scss')
        .pipe(sass())
        .pipe(concat('easyH5.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./static/dist/css/'))
});

gulp.task('js', function() {
    return gulp
        .src('./static/src/js/entry.js')
        .pipe(gulpWebpack({
            watch: true,
            output: {
                filename: 'easyH5.js'
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    compress: {
                        warnings: false
                    }
                })
            ]
        }))
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
            'NODE_ENV': 'production'
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
    gulp.watch('./static/app/**/*', function() {
        gulp.run('webpack');
    });
});
