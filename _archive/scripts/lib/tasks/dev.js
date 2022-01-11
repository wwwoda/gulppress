"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDevTask = getDevTask;
exports.getDevTasks = getDevTasks;
exports.getDevDestFolders = getDevDestFolders;

var _gulp = require("gulp");

var _utils = require("../utils");

var _browserSync = require("./browserSync");

var _clean = require("./clean");

var _scripts = require("./scripts");

var _watch = require("./watch");

// import { getStylesTask } from './styles';
function getDevTask(config, webpackConfig) {
  const devTasks = getDevTasks(config, webpackConfig);

  if (!devTasks.length) {
    return (0, _utils.getEmptyTask)('Dev task pipeline is empty');
  }

  const tasks = [(0, _gulp.parallel)(...devTasks)];

  if ((0, _utils.watch)()) {
    tasks.push((0, _watch.getWatchTask)(config));
  }

  if (config.browserSync) {
    tasks.push((0, _browserSync.getStartServerTask)(config.browserSync));
  }

  if (devTasks.length) {
    return (0, _gulp.series)((0, _clean.getCleanTask)(getDevDestFolders(config)), (0, _gulp.series)(...tasks));
  }

  return (0, _utils.getEmptyTask)('Dev task pipeline is empty');
}

function getDevTasks(config, webpackConfig) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const devTasks = [];

  if (config.scripts && webpackConfig) {
    devTasks.push((0, _scripts.getScriptsTask)(config.scripts, webpackConfig)); // devTasks.push(getScriptsTask(
    //   config.scripts,
    //   config.browserList,
    //   config.base.createSeparateMinFiles,
    // ));
  } // if (config.styles) {
  //   devTasks.push(getStylesTask(config.styles, config.base.createSeparateMinFiles));
  // }


  return devTasks;
}

function getDevDestFolders(config) {
  var _config$scripts, _config$styles;

  return [(_config$scripts = config.scripts) === null || _config$scripts === void 0 ? void 0 : _config$scripts.dest, (_config$styles = config.styles) === null || _config$styles === void 0 ? void 0 : _config$styles.dest].filter(_utils.notEmpty);
}