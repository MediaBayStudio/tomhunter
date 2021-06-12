const gulp = require('gulp'),
  tap = require('gulp-tap'),
  argv = require('yargs').argv,
  rename = require('gulp-rename'),
  config = require('./build-config.js'),
  blocks = config.blocks,
  clearImports = function(input, newbie, width) {
    if (newbie) {
      let str = '//blocks import\n';
      for (let i = 0; i < blocks.length; i++) {
        str += `@import \'blocks/${blocks[i]}/${blocks[i]}.${width}\'\;\n`;
      }
      input = input.replace(/(?:[\s\S]*\@import \'assets\/grid\'\;\n)|(?:\@import \'assets\/animations\'\;)|\/\/[\s\S]*/gm, '')
      input += str;
    } else {
      input = '';
    }
    
    return input;
  },
  insertBlockImports = function(input, text) {
    if (input.search('blocks') !== -1) {
      input = input.replace(/\/\/\s?blocks[\s\S]*/gm, text);
    } else {
      input += text;
    }
    return input;
  };

  function createBlocks(cb) {
    for (let i = 0; i < blocks.length; i++) {
      gulp.src('./src/scss/style*.scss')
          .pipe(rename(function(path, file) {
            file.contents = Buffer.from(clearImports(file.contents.toString()));
            path.basename = '_' + blocks[i] + path.basename.replace(/[a-zA-z]+/, '');
          }))
          .pipe(gulp.dest(`./src/scss/blocks/${blocks[i]}`));
    }
    cb();
  }

  function insertImports(cb) {
    gulp.src('./src/scss/style*.scss')
        .pipe(tap(file => {     
          str  = '//blocks import\n'; 
          if (file.path.search(/[0-9]/) !== -1) {
            for (let i = 0; i < blocks.length; i++) {
              str += `@import \'blocks/${blocks[i]}/${blocks[i]}.${file.path.match(/[0-9]+/)[0]}\';\n`;
            }
          } else {
            for (let i = 0; i < blocks.length; i++) {
              str += `@import \'blocks/${blocks[i]}/${blocks[i]}\';\n`;
            }               
          }
          file.contents = Buffer.from(insertBlockImports(file.contents.toString(), str));
        }))
        .pipe(gulp.dest('./src/scss/'));
    cb();
  }

  function createBlock(cb) {
    gulp.src('./src/scss/style*.scss')
        .pipe(rename(function(path, file) {
          file.contents = Buffer.from(clearImports(file.contents.toString()));
          path.basename = "_" + argv.name + path.basename.replace(/[a-zA-z]+/, '');
        }))
        .pipe(gulp.dest(`./src/scss/blocks/${argv.name}`));
    cb();
  }

  function addWidth(cb) {
    for (let i = 0; i <= blocks.length; i++) {
      if (i !== blocks.length) {
        gulp.src(`./src/scss/blocks/${blocks[i]}/${blocks[i]}.scss`)
          .pipe(rename(function(path, file) {
            file.contents = Buffer.from(clearImports(file.contents.toString()));
            path.basename = `${path.basename.replace(/[^a-zA-z]+/, '')}.${argv.n}`;
          }))
          .pipe(gulp.dest(`./src/scss/blocks/${blocks[i]}/`));
      } else {
        gulp.src(`./src/scss/style.scss`)
          .pipe(rename(function(path, file) {
            file.contents = Buffer.from(clearImports(file.contents.toString(), true, argv.n));
            path.basename = `${path.basename.replace(/[^a-zA-z]+/, '')}.${argv.n}`;
          }))
          .pipe(gulp.dest(`./src/scss/`));
      }
    }
    cb();
  }

module.exports = {createBlocks, insertImports, createBlock, addWidth};