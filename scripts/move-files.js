let {src, dest} = require('gulp'),
  strip = require('gulp-strip-comments'),
  config = require('./build-config.js');

function moveLayouts(cb) {
  src('./src/*.+(html|php)')
  .pipe(strip())
  .pipe(dest(config.distFolder));

  src('./src/layouts/**/*.+(html|php)')
  .pipe(strip())
  .pipe(dest(`${config.distFolder}layouts/`));

  cb();
}

function moveFonts(cb) {
  src('./src/fonts/*')
  .pipe(dest(`${config.distFolder}fonts/`));
  cb();
}

function moveImages(cb) {
  src('./src/img/**/*.+(jpg|jpeg|png|svg)')
  .pipe(dest(`${config.distFolder}img/`));
  cb();
}

function moveFavicons(cb) {
  src([
    './src/android-chrome-192x192.png',
    './src/android-chrome-512x512.png',
    './src/apple-touch-icon.png',
    './src/browserconfig.xml',
    './src/favicon-16x16.png',
    './src/favicon-32x32.png',
    './src/favicon.ico',
    './src/mstile-150x150.png',
    './src/safari-pinned-tab.svg',
    './src/site.webmanifest'
    ])
   .pipe(dest(config.distFolder));
  cb();
}

function moveJSON(cb) {
  src(['./src/db/*.json', './src/*.json'])
  .pipe(dest(config.distFolder));
  cb();
}

module.exports = {moveLayouts, moveFonts, moveImages, moveFavicons, moveJSON};