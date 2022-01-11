"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFaviconHtmlTask = createFaviconHtmlTask;
exports.createFaviconHtmlStream = createFaviconHtmlStream;

var _gulp = require("gulp");

const file = require('gulp-file');
/**
 * Create favicon.html file
 * @param destFolder destination folder
 * @param favicon
 */


function createFaviconHtmlTask(destFolder, favicon) {
  return () => createFaviconHtmlStream(destFolder, favicon);
}

function createFaviconHtmlStream(destFolder, favicon) {
  const html = favicon.getHtml();

  if (!html) {
    return (0, _gulp.src)('./', {
      allowEmpty: true
    });
  }

  return file('favicon.html', html, {
    src: true
  }).pipe((0, _gulp.dest)(destFolder));
}