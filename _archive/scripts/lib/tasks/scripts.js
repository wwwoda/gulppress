"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScriptsTask = getScriptsTask;
exports.subtasks = void 0;

var _utils = require("../utils");

var _compileScripts = require("./scripts/compileScripts");

// import { WebpackConfig } from '../classes/webpackConfig';
// import { PresetTargets, ScriptConfig } from '../types';
function getScriptsTask(config, webpackConfig) {
  return config && webpackConfig ? composeScriptsTasks(config, webpackConfig) : (0, _utils.getEmptyTask)('Images task is missing config.'); // return config
  //   ? composeScriptsTasks(config, presetTargets, createSeparateMinFiles)
  //   : getEmptyTask('Images task is missing config.');
}

function composeScriptsTasks(config, webpackConfig) {
  // const webpackConfig = config.webpackConfig || ((): WebpackConfiguration => {
  //   WebpackConfig.init(
  //     config.features?.typescript,
  //     config.features?.typeChecks,
  //     presetTargets,
  //     createSeparateMinFiles,
  //   );
  //   return WebpackConfig.getWebpackConfig(config.src, config.dest);
  // })();
  // return Object.assign(
  //   compileScriptsTask(webpackConfig),
  //   { displayName: 'scripts:compile' },
  // );
  return Object.assign((0, _compileScripts.compileScriptsTask)(config.src, config.dest, webpackConfig), {
    displayName: 'scripts:compile'
  });
}

const subtasks = {
  compileScriptsTask: _compileScripts.compileScriptsTask,
  compileScriptsStream: _compileScripts.compileScriptsStream
};
exports.subtasks = subtasks;