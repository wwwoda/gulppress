"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minifyImagesTask = minifyImagesTask;
exports.minifyImagesStream = minifyImagesStream;

var _gulp = require("gulp");

var _gulpCache = _interopRequireDefault(require("gulp-cache"));

var _gulpChanged = _interopRequireDefault(require("gulp-changed"));

var _gulpImagemin = _interopRequireDefault(require("gulp-imagemin"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function minifyImagesTask(srcGlobs, destFolder, imageminConfig) {
  return () => minifyImagesStream(srcGlobs, destFolder, imageminConfig);
}

function minifyImagesStream(srcGlobs, destFolder, imageminConfig) {
  return (0, _utils.getStream)(srcGlobs, {
    allowEmpty: true
  }).pipe((0, _gulpCache.default)((0, _gulpImagemin.default)([_gulpImagemin.default.gifsicle((imageminConfig === null || imageminConfig === void 0 ? void 0 : imageminConfig.gifsicle) || {
    interlaced: true
  }), _gulpImagemin.default.mozjpeg((imageminConfig === null || imageminConfig === void 0 ? void 0 : imageminConfig.mozjpeg) || {
    progressive: true
  }), _gulpImagemin.default.optipng((imageminConfig === null || imageminConfig === void 0 ? void 0 : imageminConfig.optipng) || {
    optimizationLevel: 3
  }), _gulpImagemin.default.svgo((imageminConfig === null || imageminConfig === void 0 ? void 0 : imageminConfig.svgo) || {
    plugins: [{
      removeViewBox: false
    }, {
      cleanupIDs: false
    }]
  })], (imageminConfig === null || imageminConfig === void 0 ? void 0 : imageminConfig.options) || {
    silent: true
  }), {
    name: 'images'
  })).on('error', e => {
    console.log(e);
  }).pipe((0, _gulpChanged.default)(destFolder)).pipe((0, _gulp.dest)(destFolder));
}