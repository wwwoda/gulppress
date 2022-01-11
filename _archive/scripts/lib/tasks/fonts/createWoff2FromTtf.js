"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWoff2FromTtfTask = createWoff2FromTtfTask;
exports.createWoff2FromTtfStream = createWoff2FromTtfStream;

var _fs = require("fs");

var _gulp = require("gulp");

var _gulpFilter = _interopRequireDefault(require("gulp-filter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ttf2woff2 = require('gulp-ttf2woff2');
/**
 * Create favicon PNGs
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param srcFolder source folder
 */


function createWoff2FromTtfTask(srcGlobs) {
  return () => createWoff2FromTtfStream(srcGlobs);
}

function createWoff2FromTtfStream(srcGlobs) {
  return (0, _gulp.src)(srcGlobs, {
    allowEmpty: true,
    base: './'
  }).pipe((0, _gulpFilter.default)(fontFilter)).pipe(ttf2woff2()).pipe((0, _gulp.dest)('./'), {
    overwrite: false
  });
}

function fontFilter(file) {
  if (!/ttf$/.test(file.path)) {
    return false;
  }

  return !(0, _fs.existsSync)(file.path.replace(/ttf$/, 'woff2'));
}