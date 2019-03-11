// --------------------------------------------------------
// WEBPACK
// --------------------------------------------------------

const os = require('os');
const chalk = require('chalk');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const mix = require('laravel-mix');
require('laravel-mix-eslint-config');
const log = console.log;
const dist = 'dist';
const platform = os.platform();
const developerName = os.userInfo().username;
const ENV = process.env.NODE_ENV;
const isDev = !mix.inProduction();

// ===========================
// Custom opening browser for browsersync
let browserToOpen = 'google chrome';
switch (developerName) {
  case 'marvinheilemann':
    browserToOpen = 'firefox developer edition';
    break;
}

// ===========================
// OnInit
log('nodeENV:', chalk.whiteBright(ENV));
log('whoIsMe:', chalk.whiteBright(developerName));
log('whichOs:', chalk.whiteBright(platform));
log(); // break

// --------------------------------------------------------
// Mix
// --------------------------------------------------------

mix.options({
  extractVueStyles: false,
  processCssUrls: false,
  purifyCss: false,
  postCss: [require('autoprefixer'), require('cssnano')],
  clearConsole: false
});
mix.extract(); // See: https://laravel-mix.com/docs/4.0/extract
mix.autoload({
  jquery: ['$', 'window.$', 'window.jQuery', 'jQuery']
});
mix.browserSync({
  browser: browserToOpen,
  host: 'localhost',
  port: 3000,
  proxy: 'ui.additive.lcl',
  reloadOnRestart: false,
  ghostMode: false,
  notify: true,
  injectChanges: true
});
mix.setPublicPath(dist);
mix.webpackConfig({
  plugins: [new CleanWebpackPlugin([dist])],
  devtool: isDev ? 'source-map' : false
});
mix.sourceMaps(isDev);

// ===========================
// Copy fonts
mix.copyDirectory('node_modules/ionicons/dist/fonts', 'fonts/ionicons');

// ===========================
// JavaScript
mix
  .js('js/index.js', `${dist}/js`)
  .eslint({
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
      failOnWarning: false,
      failOnError: isDev,
      configFile: '../.eslintrc.json'
    }
  })
  .version();

// ===========================
// SCSS
mix
  .sass(
    'scss/main.scss',
    `${dist}/css`, // dest
    {
      outputStyle: 'expanded'
    }
  )
  .version();

// ===========================
// CSS Vendor
mix
  .combine(
    [
      'node_modules/ionicons/dist/css/ionicons.min.css'
    ],
    `${dist}/css/vendor.css`
  );

// ===========================
// Minify
mix
  .minify([
    `${dist}/js/index.js`,
    `${dist}/js/manifest.js`,
    `${dist}/js/vendor.js`,
    `${dist}/css/vendor.css`
  ]);
