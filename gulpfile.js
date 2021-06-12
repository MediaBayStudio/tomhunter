// npm i -D gulp gulp-cli gulp-sass gulp-clean-css gulp-autoprefixer gulp-include gulp-babel gulp-svgmin gulp-modify-file yargs gulp-if gulp-strip-comments gulp-rename gulp-tap

let {src, dest, watch, series, parallel, task} = require('gulp'),
  modifySvg = require('./scripts/modify-svg.js'),
  css = require('./scripts/build-css.js'),
  js = require('./scripts/build-js.js'),
  files = require('./scripts/move-files.js'),
  blocks = require('./scripts/blocks.js'),
  create = require('./scripts/create-files.js');

task('default', () => {
  watch('./src/scss/**/*.scss', css.buildCss);
  watch('./src/js/components/**/*.js', js.buildJavascript);
  watch('./src/**/*.+(html|php)', files.moveLayouts);
  watch('./src/fonts/*', files.moveFonts);
  watch('./src/img/**/*.+(jpg|jpeg|png|svg)', files.moveImages);
  watch([
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
    ], files.moveFavicons);
  watch('./src/**/*.json', files.moveJSON);
});

// таск изменения и минификации svg (src и dest указываются в build-config.js)
  // gulp modifysvf --min --w=100% --h=100%, подробности в modifysvg.js
task('modifysvg', (cb) => modifySvg(cb));

// минификация CSS и JS, перенос всех файлов в dist
  // перенос всех файлов
task('moveall', parallel(css.moveCss, js.moveJavascript, files.moveLayouts, files.moveFonts, files.moveImages, files.moveFavicons, files.moveJSON));

task('movejs', js.moveJavascript);
// gulp width --n 1720
// создает все файлы блоков и style с новой шириной экрана
// например gulp width --n 1720 создаст style.1720.scss и все остальные блоки
// добавляет все блоки в созданный style
// !папки и файлы блоков должны уже существовать
task('width', (cb) => blocks.addWidth(cb));
  
// gulp blocks
// создает все блоки из массива
// обновляет import во всех файлах style
task('blocks', series(blocks.createBlocks, blocks.insertImports));

// gulp block --name about
// создает новую папку about со всеми нужными файлами всех размеров
// обновляет import во всех файлах style
// ! Для обновления импорта нужно в build-config.js указать этот блок
task('block', series(blocks.createBlock, blocks.insertImports));

// gulp refresh
// обновляет import во всех файлах style
task('refresh', (cb) => blocks.insertImports(cb));

task('createlayouts', (cb) => create.createLayouts(cb));
task('createfiles', (cb) => create.createFiles(cb));
task('createcssfiles', (cb) => create.createCssFiles(cb));
