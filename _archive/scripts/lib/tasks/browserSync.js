"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStartServerTask = getStartServerTask;

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStartServerTask(config) {
  return config ? composeStartServerTasks(config) : (0, _utils.getEmptyTask)('BrowserSync task is missing config.');
}

function composeStartServerTasks(config) {
  return Object.assign(done => {
    _browserSync.default.init(config);

    done();
  }, {
    displayName: 'browserSync:start'
  });
}