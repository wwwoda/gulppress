"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaviconImagesTask = void 0;
const create_favicon_images_stream_1 = require("../stream/create-favicon-images-stream");
const createFaviconImagesTask = (srcGlobs, destFolder, createAppleTouchIcon, createManifestIcons) => () => (0, create_favicon_images_stream_1.createFaviconImagesStream)(srcGlobs, destFolder, createAppleTouchIcon, createManifestIcons);
exports.createFaviconImagesTask = createFaviconImagesTask;
