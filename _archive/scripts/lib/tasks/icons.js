"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIconsTask = getIconsTask;
exports.subtasks = void 0;

var _utils = require("../utils");

var _createIcons = require("./icons/createIcons");

function getIconsTask(config) {
  return config ? composeIconsTasks(config) : (0, _utils.getEmptyTask)('Icons task is missing config.');
}
/**
 * Get composed icons task
 * @param config
 */


function composeIconsTasks(config) {
  return Object.assign((0, _createIcons.createIconsTask)(config.src, config.dest, config.destPhpPartials), {
    displayName: 'icons:create'
  });
}

const subtasks = {
  createIconsTask: _createIcons.createIconsTask,
  createIconsStream: _createIcons.createIconsStream
};
exports.subtasks = subtasks;