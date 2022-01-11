"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFaviconIconTask = createFaviconIconTask;
exports.createFaviconIconStream = createFaviconIconStream;

var _gulp = require("gulp");

var _gulpFilter = _interopRequireDefault(require("gulp-filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ico = require('gulp-to-ico');

const pngFilter = (0, _gulpFilter.default)('**/*.png');
/**
 * Create favicon.ico file
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 * @param favicon
 */

function createFaviconIconTask(srcGlobs, destFolder, favicon) {
  return () => createFaviconIconStream(srcGlobs, destFolder, favicon);
}

function createFaviconIconStream(srcGlobs, destFolder, favicon) {
  if (favicon.size < 16) {
    return (0, _gulp.src)('./', {
      allowEmpty: true
    });
  }

  return (0, _gulp.src)(srcGlobs, {
    allowEmpty: true
  }).pipe(pngFilter).pipe(ico('favicon.ico', {
    resize: true,
    sizes: [16, 32, 48]
  })).pipe((0, _gulp.dest)(destFolder));
}