"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFontsTask = getFontsTask;
exports.subtasks = void 0;

var _gulp = require("gulp");

var _utils = require("../utils");

var _copyFonts = require("./fonts/copyFonts");

var _createWoff2FromTtf = require("./fonts/createWoff2FromTtf");

var _createWoffFromTtf = require("./fonts/createWoffFromTtf");

function getFontsTask(config) {
  return config ? composeFontsTasks(config) : (0, _utils.getEmptyTask)('Fonts task is missing config.');
}
/**
 * Get composed fonts task
 * @param config
 */


function composeFontsTasks(config) {
  return (0, _gulp.series)((0, _gulp.parallel)(Object.assign((0, _createWoffFromTtf.createWoffFromTtfTask)(config.src), {
    displayName: 'fonts:createWoffFromTtf'
  }), Object.assign((0, _createWoff2FromTtf.createWoff2FromTtfTask)(config.src), {
    displayName: 'fonts:createWoff2FromTtf'
  })), Object.assign((0, _copyFonts.copyFontsTask)(config.src, config.dest), {
    displayName: 'fonts:copyFonts'
  }));
}

const subtasks = {
  copyFontsStream: _copyFonts.copyFontsStream,
  copyFontsTask: _copyFonts.copyFontsTask,
  createWoff2FromTtfStream: _createWoff2FromTtf.createWoff2FromTtfStream,
  createWoff2FromTtfTask: _createWoff2FromTtf.createWoff2FromTtfTask,
  createWoffFromTtfStream: _createWoffFromTtf.createWoffFromTtfStream,
  createWoffFromTtfTask: _createWoffFromTtf.createWoffFromTtfTask
};
exports.subtasks = subtasks;