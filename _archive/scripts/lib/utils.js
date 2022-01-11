"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnv = getEnv;
exports.watch = watch;
exports.inProductionEnv = inProductionEnv;
exports.reload = reload;
exports.getStream = getStream;
exports.getEmptyTask = getEmptyTask;
exports.notEmpty = notEmpty;
exports.globsToEntryPoints = globsToEntryPoints;
exports.globToEntryPoints = globToEntryPoints;

var _path = _interopRequireDefault(require("path"));

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _glob = require("glob");

var _gulp = require("gulp");

var yargs = _interopRequireWildcard(require("yargs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { WatchersStatus } from './types';
const {
  argv
} = yargs;

function getEnv() {
  return process.env.NODE_ENV || process.env.WP_ENV || 'production';
}

function watch(key) {
  if (typeof argv.watch === 'string' && key) {
    return argv.watch.split(',').includes(key);
  }

  return !!argv.watch;
}

function inProductionEnv() {
  return getEnv() === 'production';
}

function reload(done) {
  _browserSync.default.reload();

  done();
}

function getStream(globs, options) {
  if (!globs) {
    return (0, _gulp.src)('.', options);
  }

  if (typeof globs === 'string' || Array.isArray(globs)) {
    return (0, _gulp.src)(globs, options);
  }

  return globs;
}

function getEmptyTask(displayName) {
  return (0, _gulp.parallel)(Object.assign(done => {
    done();
  }, {
    displayName
  }));
}

function notEmpty(value) {
  return value !== undefined;
}

function globsToEntryPoints(globs, withMinVersion = false) {
  if (typeof globs === 'string') {
    return globToEntryPoints(globs, withMinVersion);
  }

  return globs.reduce((entries, glob) => Object.assign(entries, globToEntryPoints(glob, withMinVersion)), {});
}

function globToEntryPoints(glob, withMinVersion = false) {
  return (0, _glob.sync)(glob).reduce((entries, filenames) => {
    const extension = _path.default.extname(filenames);

    const basename = _path.default.basename(filenames, extension); // eslint-disable-next-line no-param-reassign


    entries[basename] = filenames;

    if (withMinVersion === true) {
      // eslint-disable-next-line no-param-reassign
      entries[`${basename}.min`] = filenames;
    }

    return entries;
  }, {});
}