"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImagesTask = getImagesTask;
exports.subtasks = void 0;

var _utils = require("../utils");

var _createPhpPartialFromSvg = require("./images/createPhpPartialFromSvg");

var _minifyImages = require("./images/minifyImages");

function getImagesTask(config) {
  return config ? composeImagesTasks(config) : (0, _utils.getEmptyTask)('Images task is missing config.');
}
/**
 * Get composed images task
 * @param config
 */


function composeImagesTasks(config) {
  return Object.assign(done => {
    const minifyStream = (0, _minifyImages.minifyImagesStream)(config.src, config.dest, config.imagemin);

    if (config.destPhpPartials) {
      (0, _createPhpPartialFromSvg.createPhpPartialFromSvgStream)(minifyStream, config.destPhpPartials);
    }

    done();
  }, {
    displayName: config.destPhpPartials ? 'images:minify-and-create-partials' : 'images:minify'
  });
}

const subtasks = {
  createPhpPartialFromSvgTask: _createPhpPartialFromSvg.createPhpPartialFromSvgTask,
  createPhpPartialFromSvgStream: _createPhpPartialFromSvg.createPhpPartialFromSvgStream,
  minifyImagesTask: _minifyImages.minifyImagesTask,
  minifyImagesStream: _minifyImages.minifyImagesStream
};
exports.subtasks = subtasks;