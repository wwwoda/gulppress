"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProcessImagesTask = void 0;
const process_images_stream_1 = require("../stream/process-images-stream");
const createProcessImagesTask = (srcGlobs, destFolder, imageminOptions, imageFactoryConfigs, imageFactoryOptions, disableCache, disableGulpChanged, disableImagemin, displayName) => () => (0, process_images_stream_1.createProcessImagesStream)(srcGlobs, destFolder, imageminOptions, imageFactoryConfigs, imageFactoryOptions, disableCache, disableGulpChanged, disableImagemin, displayName);
exports.createProcessImagesTask = createProcessImagesTask;
