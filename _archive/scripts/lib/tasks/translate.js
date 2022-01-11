"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTranslationTask = getTranslationTask;
exports.subtasks = void 0;

var _utils = require("../utils");

var _createPotFile = require("./translate/createPotFile");

function getTranslationTask(config) {
  return config ? composeTranslationTasks(config) : (0, _utils.getEmptyTask)('Translation task is missing config.');
}

function composeTranslationTasks(config) {
  return Object.assign((0, _createPotFile.createPotFileTask)(config.src, config.dest, config.wpPotOptions), {
    displayName: 'translate'
  });
}

const subtasks = {
  createPotFileStream: _createPotFile.createPotFileStream,
  createPotFileTask: _createPotFile.createPotFileTask
};
exports.subtasks = subtasks;