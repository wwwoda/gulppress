"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFaviconImagesTask = createFaviconImagesTask;
exports.createFaviconImagesStream = createFaviconImagesStream;

var _gulp = require("gulp");

var _gulpCache = _interopRequireDefault(require("gulp-cache"));

var _gulpImagemin = _interopRequireDefault(require("gulp-imagemin"));

var _favicon = require("../../classes/favicon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const responsive = require('gulp-responsive');

const defaultFaviconSizes = [16, // Generic
32, // Generic
48, // Generic
96, // Generic
{
  size: 120,
  rename: 'apple-touch-icon.png'
}, // iPhone old
128, // Generic, MS Tile
{
  size: 152,
  rename: 'apple-touch-icon-152.png'
}, // iPad
{
  size: 167,
  rename: 'apple-touch-icon-167.png'
}, // iPad Retina
{
  size: 180,
  rename: 'apple-touch-icon-180.png'
}, // iPhone Retina
192, // Generic, Google Developer Web App Manifest Recommendation
270, // MS Tile
512 // Google Developer Web App Manifest Recommendation
];
/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 * @param sizes
 * @param favicon
 */

function createFaviconImagesTask(srcGlobs, destFolder, sizes = [], favicon, imageminConfig) {
  return () => createFaviconImagesStream(srcGlobs, destFolder, sizes, favicon, imageminConfig);
}

function createFaviconImagesStream(srcGlobs, destFolder, sizes = [], favicon, imageminConfig) {
  const faviconSizes = [...sizes, ...defaultFaviconSizes].filter(uniqueFontSizes);
  console.log(faviconSizes);
  return (0, _gulp.src)(srcGlobs, {
    allowEmpty: true
  }).pipe(favicon.processImage).pipe(responsive({
    'favicon.png': _favicon.Favicon.getReponsiveConfigs(faviconSizes)
  }, {
    errorOnUnusedConfig: false,
    errorOnUnusedImage: false,
    passThroughUnused: false,
    silent: true
  })).pipe((0, _gulpCache.default)((0, _gulpImagemin.default)([_gulpImagemin.default.optipng((imageminConfig === null || imageminConfig === void 0 ? void 0 : imageminConfig.optipng) || {
    optimizationLevel: 3
  })], (imageminConfig === null || imageminConfig === void 0 ? void 0 : imageminConfig.options) || {// silent: true,
  }), {
    name: 'favicon'
  })).pipe((0, _gulp.dest)(destFolder));
}

function uniqueFontSizes(size, index, arr) {
  return arr.findIndex(s => {
    if (typeof size === 'number') {
      return size === s;
    }

    if (typeof s === 'number') {
      return false;
    }

    return size.rename === s.rename && size.size === s.size;
  }) === index;
}