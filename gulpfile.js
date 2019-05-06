const path = require('path')
const gulp = require('gulp')
const sass = require('gulp-sass')
const clean = require('gulp-clean')
const rename = require('gulp-rename')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('autoprefixer')

const SRC = path.resolve(__dirname, 'scss')
const FILE = {
  additive: path.resolve(SRC, 'ads.scss'),
  minimal: path.resolve(SRC, 'adsm.scss'),
}
const DEST = path.resolve(__dirname, 'css')

gulp.task('clean', () => {
  return gulp.src(DEST, { read: false, allowEmpty: true }).pipe(clean())
})

gulp.task('style:additive', () => compile(FILE.additive))
gulp.task('style:minimal', () => compile(FILE.minimal))

gulp.task('style:minify', () => {
  return gulp
    .src(`${DEST}/*.css`)
    .pipe(
      postcss([
        cssnano({
          preset: ['default', { discardComments: { removeAll: true } }],
        }),
      ])
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(gulp.dest(DEST))
})

function compile(resources) {
  return gulp
    .src(resources)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        importer: (
          url // allow `~` to import node modules
        ) =>
          url[0] === '~'
            ? { file: path.resolve('node_modules', url.substr(1)) }
            : { file: url },
      }).on('error', sass.logError)
    )
    .pipe(postcss([autoprefixer({ browsers: ['> 5% in DE'] })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(DEST))
}

gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel('style:additive', 'style:minimal'),
    'style:minify'
  )
)

gulp.task(
  'watch',
  gulp.series('default', () => {
    gulp.watch(SRC, gulp.series('default'))
  })
)
