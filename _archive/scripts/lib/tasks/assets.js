"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssetsTask = getAssetsTask;
exports.getAssetsTasks = getAssetsTasks;
exports.getAssetsDestFolders = getAssetsDestFolders;

var _gulp = require("gulp");

var _utils = require("../utils");

var _clean = require("./clean");

var _favicon = require("./favicon");

var _fonts = require("./fonts");

var _icons = require("./icons");

var _images = require("./images");

var _translate = require("./translate");

var _vendorScripts = require("./vendorScripts");

function getAssetsTask(config) {
  const assetsTasks = getAssetsTasks(config);

  if (assetsTasks.length) {
    return (0, _gulp.series)((0, _clean.getCleanTask)(getAssetsDestFolders(config)), (0, _gulp.parallel)(...assetsTasks));
  }

  return (0, _utils.getEmptyTask)('Assets task pipeline is empty');
}

function getAssetsTasks(config) {
  const assetsTasks = [];

  if (config.favicon) {
    assetsTasks.push((0, _favicon.getFaviconTask)(config.favicon));
  }

  if (config.fonts) {
    assetsTasks.push((0, _fonts.getFontsTask)(config.fonts));
  }

  if (config.icons) {
    assetsTasks.push((0, _icons.getIconsTask)(config.icons));
  }

  if (config.images) {
    assetsTasks.push((0, _images.getImagesTask)(config.images));
  }

  if (config.translation) {
    assetsTasks.push((0, _translate.getTranslationTask)(config.translation));
  }

  if (config.vendorScripts) {
    assetsTasks.push((0, _vendorScripts.getVendorScriptsTask)(config.vendorScripts, config.base.dirname));
  }

  return assetsTasks;
}

function getAssetsDestFolders(config) {
  var _config$favicon, _config$fonts, _config$icons, _config$images, _config$translation, _config$vendorScripts;

  return [(_config$favicon = config.favicon) === null || _config$favicon === void 0 ? void 0 : _config$favicon.dest, (_config$fonts = config.fonts) === null || _config$fonts === void 0 ? void 0 : _config$fonts.dest, (_config$icons = config.icons) === null || _config$icons === void 0 ? void 0 : _config$icons.dest, (_config$images = config.images) === null || _config$images === void 0 ? void 0 : _config$images.dest, (_config$translation = config.translation) === null || _config$translation === void 0 ? void 0 : _config$translation.dest, (_config$vendorScripts = config.vendorScripts) === null || _config$vendorScripts === void 0 ? void 0 : _config$vendorScripts.dest].filter(_utils.notEmpty);
}