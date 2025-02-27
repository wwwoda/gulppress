"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFaviconHtmlTask = void 0;
const create_favicon_html_stream_1 = require("../stream/create-favicon-html-stream");
const createFaviconHtmlTask = (destFolder, path) => () => (0, create_favicon_html_stream_1.createFaviconHtmlStream)(destFolder, path);
exports.createFaviconHtmlTask = createFaviconHtmlTask;
