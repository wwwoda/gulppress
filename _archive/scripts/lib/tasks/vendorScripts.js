"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVendorScriptsTask = getVendorScriptsTask;
exports.subtasks = void 0;

var _gulp = require("gulp");

var _vendorPackages = require("../classes/vendorPackages");

var _utils = require("../utils");

var _bustCache = require("./utils/bustCache");

var _compileVendorScripts = require("./vendorScripts/compileVendorScripts");

var _mergeCacheBusterJson = require("./vendorScripts/mergeCacheBusterJson");

function getVendorScriptsTask(config, dirname) {
  return config ? composeVendorScriptsTasks(config, dirname) : (0, _utils.getEmptyTask)('Vendor scripts task is missing config.');
}

function composeVendorScriptsTasks(config, dirname) {
  const packages = new _vendorPackages.VendorPackages();
  const scripts = typeof config.src === 'string' ? [config.src] : config.src || [];
  return (0, _gulp.series)(Object.assign(() => {
    packages.init(config.packages);
    return (0, _compileVendorScripts.compileVendorScriptsStream)(dirname, () => [...scripts, ...packages.getSources()], config.dest);
  }, {
    displayName: 'compileVendorScripts'
  }), Object.assign(done => {
    const cacheBuster = (0, _bustCache.bustCacheStream)(`${config.dest}/*.js`, config.dest, '.assets.json');
    cacheBuster.on('finish', () => {
      (0, _mergeCacheBusterJson.mergeCacheBusterJsonStream)(config.dest, () => packages.getVersions());
      return done();
    });
  }, {
    displayName: 'bustCacheForVendorScripts'
  }));
}

const subtasks = {
  compileVendorScriptsStream: _compileVendorScripts.compileVendorScriptsStream,
  compileVendorScriptsTask: _compileVendorScripts.compileVendorScriptsTask,
  mergeCacheBusterJsonStream: _mergeCacheBusterJson.mergeCacheBusterJsonStream,
  mergeCacheBusterJsonTask: _mergeCacheBusterJson.mergeCacheBusterJsonTask
};
exports.subtasks = subtasks;