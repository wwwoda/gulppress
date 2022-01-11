"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWatchTask = getWatchTask;

var _gulp = require("gulp");

var _utils = require("../utils");

var _icons = require("./icons");

var _images = require("./images");

var _styles = require("./styles");

function getWatchTask(config) {
  return Object.assign(composeWatchTask(config), {
    displayName: 'watch'
  });
}

function composeWatchTask(config) {
  return done => {
    var _config$styles, _config$icons, _config$images;

    if ((0, _utils.watch)('styles') && (_config$styles = config.styles) !== null && _config$styles !== void 0 && _config$styles.watch) {
      (0, _gulp.watch)(config.styles.watch, (0, _styles.getStylesTask)(config.styles, config.base.createSeparateMinFiles));
    }

    if ((0, _utils.watch)('icons') && (_config$icons = config.icons) !== null && _config$icons !== void 0 && _config$icons.src) {
      (0, _gulp.watch)(config.icons.src, (0, _icons.getIconsTask)(config.icons));
    }

    if ((0, _utils.watch)('images') && (_config$images = config.images) !== null && _config$images !== void 0 && _config$images.src) {
      (0, _gulp.watch)(config.images.src, (0, _images.getImagesTask)(config.images));
    }

    return done();
  };
}