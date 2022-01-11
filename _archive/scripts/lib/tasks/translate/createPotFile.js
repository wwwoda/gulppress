"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPotFileTask = createPotFileTask;
exports.createPotFileStream = createPotFileStream;

var _gulp = require("gulp");

const sort = require('gulp-sort');

const wpPot = require('gulp-wp-pot');

function createPotFileTask(srcGlobs, destFolder, wpPotOptions = {}) {
  return () => createPotFileStream(srcGlobs, destFolder, wpPotOptions);
}

function createPotFileStream(srcGlobs, destFolder, wpPotOptions = {}) {
  return (0, _gulp.src)(srcGlobs, {
    allowEmpty: true
  }).pipe(sort()).pipe(wpPot(wpPotOptions)).pipe((0, _gulp.dest)(`${destFolder}`));
}