"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compileVendorScriptsTask = compileVendorScriptsTask;
exports.compileVendorScriptsStream = compileVendorScriptsStream;

var _gulp = require("gulp");

var _gulpIf = _interopRequireDefault(require("gulp-if"));

var _gulpRename = _interopRequireDefault(require("gulp-rename"));

var _gulpUglify = _interopRequireDefault(require("gulp-uglify"));

var _readPkgUp = _interopRequireDefault(require("read-pkg-up"));

var _vendorPackages = require("../../classes/vendorPackages");

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveLicense = require('uglify-save-license');

function compileVendorScriptsTask(dirname, srcGlobs, destFolder) {
  return () => compileVendorScriptsStream(dirname, srcGlobs, destFolder);
}

function compileVendorScriptsStream(dirname, srcGlobs, destFolder) {
  if (typeof srcGlobs === 'function') {
    // eslint-disable-next-line no-param-reassign
    srcGlobs = srcGlobs();
  }

  if (!srcGlobs || srcGlobs.length < 1 || !destFolder) {
    return (0, _gulp.src)('./', {
      allowEmpty: true
    });
  }

  return (0, _gulp.src)(srcGlobs, {
    base: dirname
  }).pipe((0, _gulpIf.default)((0, _utils.inProductionEnv)(), (0, _gulpUglify.default)({
    output: {
      comments: saveLicense
    }
  }))).pipe((0, _gulpRename.default)(path => {
    var _path$dirname;

    const {
      basename,
      extname
    } = path;

    if (!((_path$dirname = path.dirname) !== null && _path$dirname !== void 0 && _path$dirname.includes('node_modules')) || basename !== 'index') {
      return {
        dirname: '',
        basename,
        extname
      };
    }

    const pkg = _readPkgUp.default.sync({
      cwd: path.dirname,
      normalize: false
    });

    if (!(pkg !== null && pkg !== void 0 && pkg.packageJson.name)) {
      return {
        dirname: '',
        basename,
        extname
      };
    }

    return {
      dirname: '',
      basename: _vendorPackages.VendorPackages.getBaseName(basename, pkg === null || pkg === void 0 ? void 0 : pkg.packageJson.name),
      extname
    };
  })).pipe((0, _gulp.dest)(destFolder));
}