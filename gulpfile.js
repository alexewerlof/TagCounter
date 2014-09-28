var gulp = require('gulp');

//include plug-ins
var pkg = require('./package.json');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var size = require('gulp-size');
var jeditor = require("gulp-json-editor");
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var jsonminify = require('gulp-jsonminify');

// Paths
var path = {
    src : './src/',
    build : './build/',
    release : './release/'
};

//clean up the build directory
gulp.task('clean', function () {
    'use strict';

    return gulp.src(path.build, {read: false}).pipe(clean());
});

//overwrites the name, description and version in manifest.json from package.json
gulp.task('manifest', function () {
    'use strict';

    return gulp.src(path.src + "manifest.json")
        .pipe(jeditor({
            description: pkg.description,
            name: pkg.name,
            version: pkg.version
        }))
        .pipe(jsonminify())
        .pipe(gulp.dest(path.build));
});

// minify javascripts
gulp.task('minify-js', function () {
    'use strict';

    return gulp.src([path.src + '*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(path.build))
        .pipe(size({showFiles: true}));
});

//minify html files
gulp.task('minify-html', function () {
    'use strict';

    return gulp.src(path.src + '*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest(path.build));
});

//minify css files
gulp.task('minify-css', function () {
    'use strict';

    return gulp.src(path.src + '*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.build));
});

//copy the image files
gulp.task('copy-img', function () {
    'use strict';

    return gulp.src(path.src + 'img/**/*', { base: './src' })
        .pipe(gulp.dest(path.build));
});

//populate the build folder
gulp.task('build', ['manifest', 'minify-js', 'minify-html', 'minify-css', 'copy-img'], function () {
});

gulp.task('dist', ['build'], function () {
    return gulp.src(path.build + '**')
        .pipe(zip(pkg.name + '-' + pkg.version + '.zip'))
        .pipe(gulp.dest(path.release));
});

//zip the build folder ready to upload to WebStore
gulp.task('default', ['build'], function () {
});