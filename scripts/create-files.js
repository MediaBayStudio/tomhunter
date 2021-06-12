let {src, dest} = require('gulp'),
  rename = require('gulp-rename'),
  modify = require('gulp-modify-file'),
  config = require('./build-config.js'),
  layouts = config.layouts,
  files = config.files,
  cssFiles = config.cssFiles;


function createLayouts(cb) {
  for (let i = 0; i < layouts.length; i++) {
    src('./src/index.+(html|php)')
    .pipe(rename(function(path, file) {
      path.basename = layouts[i] + path.basename.replace(/[a-zA-z]+/, '');
    }))
    .pipe(dest('./src/layouts/'));
  }

  cb();
}

function createFiles(cb) {
  for (let i = 0; i < files.length; i++) {
    src('./src/index.+(html|php)')
    .pipe(rename(function(path, file) {
      path.basename = files[i] + path.basename.replace(/[a-zA-z]+/, '');
    }))
    .pipe(dest('./src/'));
  }

  cb();
}

function createCssFiles(cb) {
  for (let i = 0; i < cssFiles.length; i++) {
    src('./src/scss/style.scss')
    .pipe(rename(function(path, file) {
      path.basename = cssFiles[i] + path.basename.replace(/[a-zA-z]+/, '');
    }))
    .pipe(dest('./src/scss/'));
  }
  cb();
}


module.exports = {createLayouts, createFiles, createCssFiles};