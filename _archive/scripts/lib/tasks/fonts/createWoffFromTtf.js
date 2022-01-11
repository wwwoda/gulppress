"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWoffFromTtfTask = createWoffFromTtfTask;
exports.createWoffFromTtfStream = createWoffFromTtfStream;

var _fs = require("fs");

var _gulp = require("gulp");

var _gulpFilter = _interopRequireDefault(require("gulp-filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ttf2woff = require('gulp-ttf2woff');
/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param srcFolder source folder
 */


function createWoffFromTtfTask(srcGlobs) {
  return () => createWoffFromTtfStream(srcGlobs);
}

function createWoffFromTtfStream(srcGlobs) {
  return (0, _gulp.src)(srcGlobs, {
    allowEmpty: true,
    base: './'
  }).pipe((0, _gulpFilter.default)(fontFilter)).pipe(ttf2woff()).pipe((0, _gulp.dest)('./'), {
    overwrite: false
  });
}

function fontFilter(file) {
  if (!/ttf$/.test(file.path)) {
    return false;
  }

  return !(0, _fs.existsSync)(file.path.replace(/ttf$/, 'woff'));
}