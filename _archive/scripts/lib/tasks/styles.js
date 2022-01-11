"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStylesTask = getStylesTask;
exports.subtasks = void 0;

var _gulp = require("gulp");

var _utils = require("../utils");

var _compileStyles = require("./styles/compileStyles");

var _bustCache = require("./utils/bustCache");

function getStylesTask(config, createSeparateMinFiles, notifications) {
  return config ? composeStylesTasks(config, createSeparateMinFiles, notifications) : (0, _utils.getEmptyTask)('Styles task is missing config.');
}

function composeStylesTasks(config, createSeparateMinFiles = false, notifications) {
  return (0, _gulp.series)(Object.assign((0, _compileStyles.compileStylesTask)(config.src, config.dest, config.sassOptions || {
    includePaths: ['node_modules'],
    outputStyle: 'expanded'
  }, config.postcssPlugins, createSeparateMinFiles, notifications), {
    displayName: 'styles:compile'
  }), Object.assign((0, _bustCache.bustCacheTask)(`${config.dest}/*.css`, config.dest), {
    displayName: 'styles:bust-cache'
  }));
}

const subtasks = {
  compileStylesTask: _compileStyles.compileStylesTask,
  compileStylesWithMinFileStream: _compileStyles.compileStylesWithMinFileStream,
  compileStylesWithoutMinFileStream: _compileStyles.compileStylesWithoutMinFileStream
};
exports.subtasks = subtasks;