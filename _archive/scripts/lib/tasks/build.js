"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBuildTask = getBuildTask;
exports.getBuildTasks = getBuildTasks;
exports.getBuildDestFolders = getBuildDestFolders;

var _gulp = require("gulp");

var _utils = require("../utils");

var _assets = require("./assets");

var _clean = require("./clean");

var _dev = require("./dev");

function getBuildTask(config, webpackConfig) {
  const buildTasks = getBuildTasks(config, webpackConfig);

  if (buildTasks.length) {
    return (0, _gulp.series)((0, _clean.getCleanTask)(getBuildDestFolders(config)), (0, _gulp.parallel)(...buildTasks));
  }

  return (0, _utils.getEmptyTask)('Build task pipeline is empty');
}

function getBuildTasks(config, webpackConfig) {
  return [...(0, _dev.getDevTasks)(config, webpackConfig), ...(0, _assets.getAssetsTasks)(config)];
}

function getBuildDestFolders(config) {
  return [...(0, _dev.getDevDestFolders)(config), ...(0, _assets.getAssetsDestFolders)(config)].filter(_utils.notEmpty);
}