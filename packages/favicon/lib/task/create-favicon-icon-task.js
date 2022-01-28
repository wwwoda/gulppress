"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaviconIconTask = void 0;
const create_favicon_icon_stream_1 = require("../stream/create-favicon-icon-stream");
const createFaviconIconTask = (srcGlobs, destFolder) => () => (0, create_favicon_icon_stream_1.createFaviconIconStream)(srcGlobs, destFolder);
exports.createFaviconIconTask = createFaviconIconTask;
