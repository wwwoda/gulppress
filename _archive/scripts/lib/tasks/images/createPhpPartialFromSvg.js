"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPhpPartialFromSvgTask = createPhpPartialFromSvgTask;
exports.createPhpPartialFromSvgStream = createPhpPartialFromSvgStream;

var _gulp = require("gulp");

var _gulpChanged = _interopRequireDefault(require("gulp-changed"));

var _gulpFilter = _interopRequireDefault(require("gulp-filter"));

var _gulpRename = _interopRequireDefault(require("gulp-rename"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create favicon PNGs
 * @param globs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder for images
 */
function createPhpPartialFromSvgTask(globs, destFolder) {
  return () => createPhpPartialFromSvgStream(globs, destFolder);
}
/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder for images
 */


function createPhpPartialFromSvgStream(srcGlobs, destFolder) {
  const svgFilter = (0, _gulpFilter.default)('**/*.svg');
  return (0, _utils.getStream)(srcGlobs, {
    allowEmpty: true
  }).pipe(svgFilter).pipe((0, _gulpRename.default)({
    extname: '.php'
  })).pipe((0, _gulpChanged.default)(destFolder)).pipe((0, _gulp.dest)(destFolder));
}