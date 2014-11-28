var zip = require('gulp-zip');
var pkg = require('./package.json');
var gulp = require('gulp');
var size = require('gulp-size');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var jeditor = require("gulp-json-editor");
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var jsonminify = require('gulp-jsonminify');

// Paths
var path = {
    src : './src',
    build : './build',
    release : './release'
};

//clean up the build directory
gulp.task('clean', function () {
    'use strict';

    return gulp.src(path.build, {read: false}).pipe(clean());
});

//overwrites the name, description and version in manifest.json from package.json
gulp.task('build:manifest', function () {
    'use strict';

    return gulp.src(path.src + '/manifest.json')
        .pipe(jeditor({
            description: pkg['description'],
            name: pkg.name,
            version: pkg['version']
        }))
        .pipe(jsonminify())
        .pipe(gulp.dest(path.build));
});

// minify javascripts
gulp.task('build:js', function () {
    'use strict';

    return gulp.src([path.src + '/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest(path.build))
        .pipe(size({showFiles: true}));
});

//minify html files
gulp.task('build:html', function () {
    'use strict';

    return gulp.src(path.src + '/**/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest(path.build));
});

//minify css files
gulp.task('build:css', function () {
    'use strict';

    return gulp.src([path.src + '/**/*.css', '!/**/_*'])
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.build));
});

//copy the image files
gulp.task('build:img', function () {
    'use strict';

    return gulp.src(path.src + '/img/**/*', { base: path.src })
        .pipe(gulp.dest(path.build));
});

//copy the font
gulp.task('build:font', function () {
    'use strict';

    return gulp.src(path.src + '/style/fontawesome-webfont.woff', { base: path.src })
        .pipe(gulp.dest(path.build));
});

//populate the build folder
gulp.task('build', ['build:manifest', 'build:js', 'build:html', 'build:css', 'build:font', 'build:img']);

gulp.task('release', ['build'], function () {
    return gulp.src(path.build + '/**')
        .pipe(zip(pkg.name + '-' + pkg['version'] + '.zip'))
        .pipe(gulp.dest(path.release))
        .pipe(size({showFiles: true}));
});

//zip the build folder ready to upload to WebStore
gulp.task('default', ['build']);