// gulp modifysvg - не делает ничего без переменых
// gulp modifysvg --min - сжимает svg
// gulp modifysvg --width=100% или --w=100% установит атрибут тега svg
// также работает переменная --height или --h
// gulp modifysvg --min --w=100% --h=100% сожмет все svg и заменит атрибуты ширины и высоты на 100%

const gulp = require('gulp'),
  svgmin = require('gulp-svgmin'),
  modifyFile = require('gulp-modify-file'),
  argv = require('yargs').argv,
  gulpif = require('gulp-if'),
  config = require('./build-config');

function modifySvg(cb) {
  gulp.src(config.srcSvg)
      .pipe(gulpif(minify, svgmin()))
      .pipe(modifyFile((content) => {
        let cnt = content,
          width = argv.width || argv.w,
          height = argv.height || argv.h;

        if (width) {
          cnt = setDimensions(cnt, 'width', width);
        }
        if (height) {
          cnt = setDimensions(cnt, 'height', height);
        }
        return cnt;

      }))
      .pipe(gulp.dest(config.destSvg));

  cb();
}

function minify() {
  let min = argv.minify || argv.min;
  return (min) ? true : false;
}

// заменить width и height на проценты
function setDimensions(input, property, value) {
  let regExp = new RegExp(`${property}\\=\\"\\d+(?:\\%|px)?\\"`),
    output = input.replace(regExp, `${property}="${value}"`);

  return output;
}

module.exports = modifySvg;