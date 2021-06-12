// let destFolder = '../../../../../OSPanel/domains/Tom-Hunter/wp-content/themes/T.Hunter/',
let path = require('path'),
  destFolder = path.relative('gulpfile.js', '/Applications/MAMP/htdocs/t.hunter/wp-content/themes/T.Hunter/') + '/',
// let destFolder = '../../../../../../Applications/MAMP/htdocs/t.hunter/wp-content/themes/T.Hunter/',
  imgFolder = './src/';

module.exports = {
  srcSvg: './src/img/**/*.svg',
  destSvg: './dist/img/',

  distFolder: destFolder,

  srcImg: [`${imgFolder}/**/*.png`, `${imgFolder}/**/*.jpg`, `${imgFolder}/**/*.gif`, `${imgFolder}/**/*.jpeg`],
  destImg: './dist/img/',

  blocks: [
    'btns',
    'popups',
    'mobile-menu',
    'form',
    'slick',
    'card',
    'activities',
    'index-services',
    'index-about',
    'index-facts',
    'index-news',
    'cybersecurity-sect',
    'index-clients',
    'header',
    'hero',
    'trust',
    'invite',
    'service',
    'stages',
    'contacts',
    'footer'
  ],
  
  files: [
    'header',
    'footer',
    'index',
    'about',
    'media',
    'consulting'
    // 'webapp-pentest.php',
    // 'intranet-pentest.php',
    // 'wifi-pentest.php',
    // 'osint-pentest.php',
    // 'social-pentest.php'
  ],

  cssFiles: [
    'index',
    'about',
    'media',
    'service',
    'webapp-pentest',
    'intranet-pentest',
    'wifi-pentest',
    'osint-pentest',
    'social-pentest'
  ],

  layouts: [
    '_hero',
    '_service',
    '_trust',
    '_invite',
    '_contacts'
  ]
};