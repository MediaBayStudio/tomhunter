let {src, dest} = require('gulp'),
  include = require('gulp-include'),
  babel = require('gulp-babel'),
  config = require('./build-config.js');

// Собираем все компоненты в один файл, применяем транспиляцию
  // и вставляем в src dev вариант
// Потом минифицируем и вставляем в dist
function buildJavascript(cb) {
  src('./src/js/components/**/*.js', {dot: true, ignore: './src/js/components/**/_*.js'})
  .pipe(include()).on('error', console.log)
  // .pipe(babel({
  //   "plugins": [
  //     "@babel/plugin-transform-arrow-functions",
  //     "@babel/plugin-transform-destructuring",
  //     "@babel/plugin-transform-block-scoping",
  //     "@babel/plugin-transform-template-literals"
  //   ]
  // }))
  .pipe(dest('./src/js/'))
  // .pipe(babel({
  //   "presets": ["minify"],
  //   comments: false
  // }))
  .pipe(dest(`${config.distFolder}/js/`));

  cb();
}

// минифицируем и переносим файлы
let jsDest = `${config.distFolder}/js/`;

function moveJavascript(cb) {
  src('./src/js/**/*.js', {dot: true, ignore: ['./src/js/*.min.js', './src/js/**/_*.js', './src/js/components/**/*.js']})
  .pipe(babel({
    "plugins": [
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-destructuring",
      "@babel/plugin-transform-block-scoping",
      "@babel/plugin-transform-template-literals"
    ],
    "presets": ["minify"],
    comments: false
  }))
  .pipe(dest(jsDest));

  // переносим .min файлы
  src('./src/js/*.min.js')
  .pipe(dest(jsDest));

  cb();
}

module.exports = {buildJavascript, moveJavascript};