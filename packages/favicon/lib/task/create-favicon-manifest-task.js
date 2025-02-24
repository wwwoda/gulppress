"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaviconManifestTask = void 0;
const create_favicon_manifest_stream_1 = require("../stream/create-favicon-manifest-stream");
const createFaviconManifestTask = (destFolder, manifest, path) => () => (0, create_favicon_manifest_stream_1.createFaviconManifestStream)(destFolder, manifest, path);
exports.createFaviconManifestTask = createFaviconManifestTask;
