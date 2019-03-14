const path = require('path')
const gulp = require('gulp')
const sass = require('gulp-sass')
const clean = require('gulp-clean-css')
const rename = require('gulp-rename')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')

const SRC = './scss'
const FILE = {
  additive: SRC + '/additive.scss',
  minimal: SRC + '/additive-minimal.scss',
}
const DEST = './css'

gulp.task('style:additive', () => compile(FILE.additive, 'ads.pkg'))
gulp.task('style:minimal', () => compile(FILE.minimal, 'ads'))

function compile(src, name) {
  return gulp
    .src(src)
    .pipe(rename({ basename: name }))
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
