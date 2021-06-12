const gulp = require('gulp'),
  argv = require('yargs').argv,
  rename = require('gulp-rename'),
  config = require('./build-config.js');

function addWidth(cb) {
  let arr = config.blocks;
  for (let i = 0; i <= arr.length; i++) {
    if (i !== arr.length) {
      gulp.src(`./src/scss/blocks/${arr[i]}/${arr[i]}.scss`)
        .pipe(rename(function(path, file) {
          file.contents = Buffer.from(clear(file.contents.toString()));
          path.basename = `${path.basename.replace(/[^a-zA-z]+/, '')}.${argv.n}`;
        }))
        .pipe(gulp.dest(`./src/scss/blocks/${arr[i]}/`));
    } else {
      gulp.src(`./src/scss/style.scss`)
        .pipe(rename(function(path, file) {
          file.contents = Buffer.from(clear(file.contents.toString(), true, argv.n));
          path.basename = `${path.basename.replace(/[^a-zA-z]+/, '')}.${argv.n}`;
        }))
        .pipe(gulp.dest(`./src/scss/`));
    }
  }
  cb();
}

module.exports = addWidth;