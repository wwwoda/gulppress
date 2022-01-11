"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIconsTask = createIconsTask;
exports.createIconsStream = createIconsStream;

var _gulp = require("gulp");

var _gulpCache = _interopRequireDefault(require("gulp-cache"));

var _gulpChanged = _interopRequireDefault(require("gulp-changed"));

var _gulpIf = _interopRequireDefault(require("gulp-if"));

var _gulpImagemin = _interopRequireDefault(require("gulp-imagemin"));

var _gulpRename = _interopRequireDefault(require("gulp-rename"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Minif SVGs and turn them into PHP partials
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder for images
 * @param phpPartialsFolder destination folder for PHP partials created from SVGs
 */
function createIconsTask(srcGlobs, destFolder, phpPartialsFolder, imageminConfig) {
  return () => createIconsStream(srcGlobs, destFolder, phpPartialsFolder, imageminConfig);
}

function createIconsStream(srcGlobs, destFolder, phpPartialsFolder, imageminConfig) {
  return (0, _gulp.src)(srcGlobs, {
    allowEmpty: true
  }).pipe((0, _gulpCache.default)((0, _gulpImagemin.default)([_gulpImagemin.default.svgo((imageminConfig === null || imageminConfig === void 0 ? void 0 : imageminConfig.svgo) || {
    plugins: [{
      removeViewBox: false
    }, {
      cleanupIDs: false
    }]
  })], (imageminConfig === null || imageminConfig === void 0 ? void 0 : imageminConfig.options) || {// silent: true,
  }), {
    name: 'icons'
  })).pipe((0, _gulpChanged.default)(destFolder)).pipe((0, _gulp.dest)(destFolder)).pipe((0, _gulpIf.default)(!!phpPartialsFolder, (0, _gulpRename.default)({
    extname: '.php'
  }))).pipe((0, _gulpIf.default)(!!phpPartialsFolder, (0, _gulpChanged.default)(phpPartialsFolder || destFolder))).pipe((0, _gulpIf.default)(!!phpPartialsFolder, (0, _gulp.dest)(phpPartialsFolder || destFolder)));
}