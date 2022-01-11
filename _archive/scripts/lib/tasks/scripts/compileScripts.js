"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileScriptsTask = compileScriptsTask;
exports.compileScriptsStream = compileScriptsStream;

var _browserSync = require("browser-sync");

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _gulp = require("gulp");

var _gulpPlumber = _interopRequireDefault(require("gulp-plumber"));

var _nodeNotifier = _interopRequireDefault(require("node-notifier"));

var _webpackStream = _interopRequireDefault(require("webpack-stream"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const named = require('vinyl-named');

const compiler = require('webpack');

function compileScriptsTask(srcGlobs, destFolder, webpackConfig) {
  return done => compileScriptsStream(srcGlobs, destFolder, webpackConfig, done);
}

function compileScriptsStream(srcGlobs, destFolder, webpackConfig, done) {
  return (0, _gulp.src)(srcGlobs, {
    allowEmpty: true
  }).pipe((0, _gulpPlumber.default)()).pipe(named()).pipe((0, _webpackStream.default)(webpackConfig, compiler, () => {
    if ((0, _utils.watch)('scripts')) {
      (0, _browserSync.reload)();
    }

    done();
  }).on('error', function (error) {
    onWebpackError(error);
    done();
  })).pipe((0, _gulp.dest)(destFolder));
}

function onWebpackError(error) {
  _nodeNotifier.default.notify({
    title: 'Webpack Error',
    message: error.message,
    wait: false
  });

  _fancyLog.default.error(error.message);

  if ((0, _utils.inProductionEnv)()) {
    _fancyLog.default.error('Aborting webpack due to error!');

    process.exit(1);
  }
}