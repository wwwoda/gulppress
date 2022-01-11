"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFaviconTask = getFaviconTask;
exports.subtasks = void 0;

var _gulp = require("gulp");

var _favicon = require("../classes/favicon");

var _utils = require("../utils");

var _createFaviconIcon = require("./favicon/createFaviconIcon");

var _createFaviconImages = require("./favicon/createFaviconImages");

var _createFaviconManifest = require("./favicon/createFaviconManifest");

var _creatFaviconHtml = require("./favicon/creatFaviconHtml");

var _setFaviconColor = require("./favicon/setFaviconColor");

function getFaviconTask(config) {
  return config ? composeFaviconTasks(config) : (0, _utils.getEmptyTask)('Favicon task is missing config.');
}
/**
 * Get composed favicon task
 * @param config
 */


function composeFaviconTasks(config) {
  const favicon = new _favicon.Favicon();
  return (0, _gulp.series)(Object.assign((0, _createFaviconImages.createFaviconImagesTask)(config.src, config.dest, config.sizes, favicon), {
    displayName: 'favicon::createImages'
  }), Object.assign((0, _setFaviconColor.setFaviconColorTask)(config.color, favicon), {
    displayName: 'favicon:setColor'
  }), (0, _gulp.parallel)(Object.assign((0, _createFaviconIcon.createFaviconIconTask)(config.src, config.dest, favicon), {
    displayName: 'favicon:createIcon'
  }), Object.assign((0, _creatFaviconHtml.createFaviconHtmlTask)(config.dest, favicon), {
    displayName: 'favicon:createHtml'
  }), Object.assign((0, _createFaviconManifest.createFaviconManifestTask)(config.dest, favicon), {
    displayName: 'favicon:createManifest'
  })));
}

const subtasks = {
  createFaviconHtmlStream: _creatFaviconHtml.createFaviconHtmlStream,
  createFaviconHtmlTask: _creatFaviconHtml.createFaviconHtmlTask,
  createFaviconIconStream: _createFaviconIcon.createFaviconIconStream,
  createFaviconIconTask: _createFaviconIcon.createFaviconIconTask,
  createFaviconImagesStream: _createFaviconImages.createFaviconImagesStream,
  createFaviconImagesTask: _createFaviconImages.createFaviconImagesTask,
  createFaviconManifestStream: _createFaviconManifest.createFaviconManifestStream,
  createFaviconManifestTask: _createFaviconManifest.createFaviconManifestTask,
  setFaviconColorStream: _setFaviconColor.setFaviconColorStream,
  setFaviconColorTask: _setFaviconColor.setFaviconColorTask
};
exports.subtasks = subtasks;