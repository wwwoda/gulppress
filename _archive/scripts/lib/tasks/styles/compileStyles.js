"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileStylesTask = compileStylesTask;
exports.compileStylesWithoutMinFileStream = compileStylesWithoutMinFileStream;
exports.compileStylesWithMinFileStream = compileStylesWithMinFileStream;

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _chalk = _interopRequireDefault(require("chalk"));

var _fancyLog = _interopRequireDefault(require("fancy-log"));

var _gulp = require("gulp");

var _gulpCsso = _interopRequireDefault(require("gulp-csso"));

var _gulpFilter = _interopRequireDefault(require("gulp-filter"));

var _gulpIf = _interopRequireDefault(require("gulp-if"));

var _gulpPlumber = _interopRequireDefault(require("gulp-plumber"));

var _gulpPostcss = _interopRequireDefault(require("gulp-postcss"));

var _gulpRename = _interopRequireDefault(require("gulp-rename"));

var _gulpSass = _interopRequireDefault(require("gulp-sass"));

var _gulpSourcemaps = _interopRequireDefault(require("gulp-sourcemaps"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import notify from 'gulp-notify';
const {
  stream
} = _browserSync.default;

function compileStylesTask(globs, destFolder, sassOptions, postcssPlugins, createSeparateMinFiles = false, notifications = false) {
  return () => {
    if (createSeparateMinFiles === true) {
      return compileStylesWithMinFileStream(globs, destFolder, sassOptions, postcssPlugins, notifications);
    }

    return compileStylesWithoutMinFileStream(globs, destFolder, sassOptions, postcssPlugins, notifications);
  };
}

function compileStylesWithoutMinFileStream(srcGlobs, destFolder, sassOptions, postcssPlugins, _notifications = false) {
  return (0, _gulp.src)(srcGlobs, {
    allowEmpty: true
  }).pipe((0, _gulpPlumber.default)()).pipe((0, _gulpIf.default)(!(0, _utils.inProductionEnv)(), _gulpSourcemaps.default.init())).pipe((0, _gulpSass.default)(sassOptions).on('error', onSassError)).pipe((0, _gulpPostcss.default)(postcssPlugins)).on('error', onPostCSSError).pipe((0, _gulpIf.default)((0, _utils.inProductionEnv)(), (0, _gulpCsso.default)())).pipe((0, _gulpIf.default)(!(0, _utils.inProductionEnv)(), _gulpSourcemaps.default.write('.'))).pipe((0, _gulp.dest)(destFolder)).pipe((0, _gulpFilter.default)('**/*.css')).pipe(stream());
}

function compileStylesWithMinFileStream(srcGlobs, destFolder, sassOptions, postcssPlugins, _notifications = false) {
  return (0, _gulp.src)(srcGlobs, {
    allowEmpty: true
  }).pipe((0, _gulpPlumber.default)()).pipe((0, _gulpIf.default)(!(0, _utils.inProductionEnv)(), _gulpSourcemaps.default.init())).pipe((0, _gulpSass.default)(sassOptions).on('error', onSassError)).pipe((0, _gulpPostcss.default)(postcssPlugins)).on('error', onPostCSSError).pipe((0, _gulpIf.default)(!(0, _utils.inProductionEnv)(), _gulpSourcemaps.default.write({
    includeContent: false
  }))).pipe((0, _gulp.dest)(destFolder)).pipe((0, _gulpFilter.default)('**/*.css')).pipe(stream()).pipe((0, _gulpRename.default)({
    suffix: '.min'
  })).pipe((0, _gulpIf.default)(!(0, _utils.inProductionEnv)(), _gulpSourcemaps.default.init({
    loadMaps: true
  }))).pipe((0, _gulpCsso.default)()).pipe((0, _gulpIf.default)(!(0, _utils.inProductionEnv)(), _gulpSourcemaps.default.write('./'))).pipe((0, _gulp.dest)(destFolder)).pipe(stream());
}

function onSassError(error) {
  _gulpSass.default.logError.call(this, error);

  if ((0, _utils.inProductionEnv)()) {
    console.log('Aborting styles build task due to error SASS compilation error!');
    process.exit(1);
  }
}

function onPostCSSError(error) {
  console.log(error);

  _fancyLog.default.error(_chalk.default.red(`PostCSS compilation error: ${error.message}`));

  if ((0, _utils.inProductionEnv)()) {
    console.log('Aborting styles build task due to error PostCSS compilation error!');
    process.exit(1);
  }

  this.emit('end');
}