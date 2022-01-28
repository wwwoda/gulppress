"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaviconManifestStream = void 0;
const gulp_1 = require("gulp");
const file_1 = require("../file");
const manifest_1 = require("../manifest");
const createFaviconManifestStream = (destFolder, config) => (0, file_1.createStream)('manifest.json', (0, manifest_1.getManifestString)(config))
    .pipe((0, gulp_1.dest)(destFolder));
exports.createFaviconManifestStream = createFaviconManifestStream;
