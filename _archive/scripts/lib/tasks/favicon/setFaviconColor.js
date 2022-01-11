"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFaviconColorTask = setFaviconColorTask;
exports.setFaviconColorStream = setFaviconColorStream;

var _gulp = require("gulp");

/**
 * Cache configured color in Favicon
 * @param color HEX color string, for example "#ffffff"
 * @param favicon
 */
function setFaviconColorTask(color = '', favicon) {
  return () => setFaviconColorStream(color, favicon);
}

function setFaviconColorStream(color = '', favicon) {
  favicon.setColor(color);
  return (0, _gulp.src)('.', {
    allowEmpty: true
  });
}