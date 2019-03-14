const path = require('path')
const gulp = require('gulp')
const sass = require('gulp-sass')
const clean = require('gulp-clean-css')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')

const SRC = path.resolve(__dirname, 'scss')
const FILE = {
  additive: path.resolve(SRC, 'ads.scss'),
  minimal: path.resolve(SRC, 'adsm.scss'),
}
const DEST = path.resolve(__dirname, 'css')

gulp.task('style:additive', () => compile(FILE.additive))
gulp.task('style:minimal', () => compile(FILE.minimal))

function compile(src) {
  return gulp
    .src(src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        importer: url =>
          url[0] === '~'
            ? { file: path.resolve('node_modules', url.substr(1)) }
            : { file: url },
      }).on('error', sass.logError)
    )
    .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST))
    .pipe(
      clean({
        level: 2,
      })
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(DEST))
}

gulp.task('watch', () => {
  gulp.watch(SRC, gulp.parallel('style:additive'))
})

gulp.task('default', gulp.parallel('style:additive', 'style:minimal'))
