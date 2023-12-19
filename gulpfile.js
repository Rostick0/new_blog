const {src, dest, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const htmlmin = require('gulp-htmlmin');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const { init, watch, reload } = require('browser-sync').create();

function html() {
    return src('app/**.html')
            .pipe(include())
            .pipe(htmlmin({
                collapseWhitespace: true
            }))
            .pipe(dest('dist'))
}

function scss() {
    return src('app/source/scss/style.scss')
            .pipe(sass())
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(csso())
            .pipe(dest('dist/css'))
}

function js() {
    return src('app/js/**.js')
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
            .pipe(dest('dist/js'))
}

function fonts() {
    return src('app/fonts/**')
            .pipe(dest('dist/fonts'))
}

function img() {
    return src('app/img/**')
            .pipe(dest('dist/img'))
}

function serve() {
    init({
        server: './dist'
    })

    watch('app/**.html', series(html)).on('change', reload);
    watch('app/components/**.html', series(html)).on('change', reload);
    watch('app/layout/**.html', series(html)).on('change', reload);
    watch('app/source/scss/*.scss', series(scss)).on('change', reload);
    watch('app/js/**.js', series(js)).on('change', reload);
}

exports.build = series(scss, html, js, fonts, img);
exports.serve = series(scss, html, js, fonts, img, serve);