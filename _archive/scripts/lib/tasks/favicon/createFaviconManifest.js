"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFaviconManifestTask = createFaviconManifestTask;
exports.createFaviconManifestStream = createFaviconManifestStream;

var _gulp = require("gulp");

// https://stackoverflow.com/questions/51093666/conditional-gulp-task-inside-gulp-paralell-or-gulp-series
const file = require('gulp-file');
/**
 * Create manifest.json file
 * @param destFolder destination folder
 * @param favicon
 */


function createFaviconManifestTask(destFolder, favicon) {
  return () => createFaviconManifestStream(destFolder, favicon);
}

function createFaviconManifestStream(destFolder, favicon) {
  const manifest = favicon.getManifest();

  if (!manifest) {
    return (0, _gulp.src)('./', {
      allowEmpty: true
    });
  }

  return file('manifest.json', manifest, {
    src: true
  }).pipe((0, _gulp.dest)(destFolder));
}