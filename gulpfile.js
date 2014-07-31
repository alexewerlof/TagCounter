var gulp = require('gulp');

//include plug-ins
var pkg = require('./package.json');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var jeditor = require("gulp-json-editor");
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var jsonminify = require('gulp-jsonminify');

// Paths
var path = {
    build : './build/',
    release : './release/'
};

//clean up the build directory
gulp.task('clean', function () {
    "use strict";

    return gulp.src(path.build, {read: false}).pipe(clean());
});

// minify javascripts
gulp.task('minify-js', function () {
    "use strict";

    return gulp.src(['./src/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(path.build));
});

//overwrites the name, description and version in manifest.json from package.json
gulp.task('manifest', function () {
    gulp.src("./src/manifest.json")
        .pipe(jeditor({
            description: pkg.description,
            name: pkg.name,
            version: pkg.version
        }))
        .pipe(jsonminify())
        .pipe(gulp.dest(path.build));
});

//copy the image files
gulp.task('copy-img', function () {
    gulp.src('src/img/**/*', { base: './src' })
        .pipe(gulp.dest(path.build));
});

//minify html files
gulp.task('minify-html', function () {
    gulp.src('src/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest(path.build));
});

//minify css files
gulp.task('minify-css', function () {
    gulp.src('src/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.build));
});

//zip the build folder ready to upload to WebStore
gulp.task('default', ['minify-js', 'manifest', 'copy-img', 'minify-html', 'minify-css'], function () {
    "use strict";

    return gulp.src(path.build + '**')
        .pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
        .pipe(gulp.dest(path.release));
});