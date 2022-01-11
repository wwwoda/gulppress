"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanFoldersTask = cleanFoldersTask;
exports.cleanFoldersPromise = cleanFoldersPromise;

var _del = _interopRequireDefault(require("del"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create favicon.ico file
 * @param srcGlobs Takes a glob string or an array of glob strings as the first argument
 * @param destFolder destination folder
 * @param favicon
 */
function cleanFoldersTask(folders) {
  return cleanFoldersPromise(folders);
}

function cleanFoldersPromise(folders) {
  return () => (0, _del.default)(folders, {
    force: true
  });
}