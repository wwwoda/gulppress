"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bustCacheTask = bustCacheTask;
exports.bustCacheStream = bustCacheStream;

var _gulp = require("gulp");

const gulpBuster = require('gulp-buster');

function bustCacheTask(srcGlobs, destFolder, fileName = '.assets.json') {
  return () => bustCacheStream(srcGlobs, destFolder, fileName);
}

function bustCacheStream(srcGlobs, destFolder, fileName = '.assets.json') {
  return (0, _gulp.src)(srcGlobs).pipe(gulpBuster({
    fileName,
    relativePath: destFolder
  })).pipe((0, _gulp.dest)(destFolder));
}