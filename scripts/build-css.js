let {src, dest} = require('gulp'),
  sass = require('gulp-sass'),
  cleanCSS = require('gulp-clean-css'),
  autoprefixer = require('gulp-autoprefixer'),
  config = require('./build-config.js');

// собираем css, префиксим и переносим в src
  // минифицируем и переносим в dist
function buildCss(cd) {
  // compile scss and autoprefix
  src('./src/scss/**/*.scss')
  .pipe(sass({
    errorLogToConsole: true,
    outputStyle: 'expanded'
  })).on('error', console.error.bind(console))
  .pipe(autoprefixer({
    cascade: false,
    grid: "no-autoplace"
  }))
  .pipe(dest('./src/css/'))
  .pipe(sass({
    errorLogToConsole: true,
    outputStyle: 'compressed'
  })).on('error', console.error.bind(console))
  .pipe(autoprefixer({
    cascade: false,
    grid: "no-autoplace"
  }))
  // .pipe(cleanCSS({
  //   compatibility: 'ie11',
  //   level: {
  //     2: {
  //       all: true
  //     }
  //   }
  // }))
  .pipe(dest(`${config.distFolder}css/`));

  cd();
}

function moveCss(cd) {
  // compile scss and autoprefix
  src('./src/css/**/*.css')
  // .pipe(sass({
  //   errorLogToConsole: true,
  //   outputStyle: 'expanded'
  // })).on('error', console.error.bind(console))
  // .pipe(autoprefixer({
  //   cascade: false,
  //   grid: "no-autoplace"
  // }))
  .pipe(dest(`${config.distFolder}css/`));

  cd();
}

module.exports = {buildCss, moveCss};