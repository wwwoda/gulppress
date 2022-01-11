"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCleanTask = getCleanTask;

var _utils = require("../utils");

var _deleteFilesDirs = require("./clean/deleteFilesDirs");

function getCleanTask(folders) {
  return folders ? composeCleanTasks(folders) : (0, _utils.getEmptyTask)('Clean task is missing config.');
}

function composeCleanTasks(folders) {
  return Object.assign((0, _deleteFilesDirs.cleanFoldersTask)(folders), {
    displayName: 'clean'
  });
}