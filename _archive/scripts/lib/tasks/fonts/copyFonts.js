"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copyFontsTask = copyFontsTask;
exports.copyFontsStream = copyFontsStream;

var _gulp = require("gulp");

var _gulpChanged = _interopRequireDefault(require("gulp-changed"));

var _gulpFilter = _interopRequireDefault(require("gulp-filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 */
function copyFontsTask(srcGlobs, destFolder) {
  return () => copyFontsStream(srcGlobs, destFolder);
}

function copyFontsStream(srcGlobs, destFolder) {
  return (0, _gulp.src)(srcGlobs, {
    allowEmpty: true
  }).pipe((0, _gulpFilter.default)(file => /(woff|woff2)$/.test(file.path))).pipe((0, _gulpChanged.default)(destFolder)).pipe((0, _gulp.dest)(destFolder));
}