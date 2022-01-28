"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProcessImagesTask = void 0;
const process_images_stream_1 = require("../stream/process-images-stream");
const createProcessImagesTask = (srcGlobs, destFolder, imageMinOptions, imageFactoryConfigs, imageFactoryOptions, displayName) => () => (0, process_images_stream_1.createProcessImagesStream)(srcGlobs, destFolder, imageMinOptions, imageFactoryConfigs, imageFactoryOptions, displayName);
exports.createProcessImagesTask = createProcessImagesTask;
