var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');


//JS MINIFICATION
gulp.task('minifyjs', function () {
    return gulp.src('public/assets/js/custom.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//COMPILE SCSS
gulp.task('sass', function () {
    return gulp.src('public/assets/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist'));
});


//CSS MINIFICATION
gulp.task('minify-css', function () {

    gulp.src('./public/assets/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('./dist/'))
});


//IMAGE COMPRESSION
gulp.task('image', function () {

    gulp.src('public/assets/img/logo/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/'))
});



//DEFAULT
gulp.task('default', ['minifyjs', 'minify-css', 'sass', 'image']);